# =========================
# IMPORTS
# =========================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import random

# =========================
# APP SETUP
# =========================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# CONFIG
# =========================
ESP32_IP = "http://192.168.137.33"   # 🔥 CHANGE THIS

# =========================
# MODELS
# =========================
class Command(BaseModel):
    command: str

# =========================
# COMMAND TRANSLATOR
# =========================
def translate_command(frontend_cmd: str):
    mapping = {
        # Movement
        "forward": "FORWARD",
        "backward": "BACKWARD",
        "turn_left": "LEFT",
        "turn_right": "RIGHT",
        "stop": "STOP",

        # Pumps
        "spray_left": "1PON",
        "stop_spray_left": "1POFF",
        "spray_right": "2PON",
        "stop_spray_right": "2POFF"
    }
    return mapping.get(frontend_cmd)

# =========================
# ESP32 SENDER (CORE 🔥)
# =========================
def send_to_esp32(command: str):
    try:
        url = f"{ESP32_IP}/{command}"
        response = requests.get(url, timeout=2)

        return {
            "status": "success",
            "url": url,
            "esp_status": response.status_code
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# =========================
# MANUAL CONTROL API
# =========================
@app.post("/control")
def control_robot(cmd: Command):
    print("Frontend Command:", cmd.command)

    esp_command = translate_command(cmd.command)

    if not esp_command:
        return {"status": "error", "message": "Invalid command"}

    result = send_to_esp32(esp_command)

    return {
        "frontend_command": cmd.command,
        "esp32_command": esp_command,
        "result": result
    }

# =========================
# SENSOR DATA (DUMMY)
# =========================
@app.get("/sensor-data")
def get_sensor_data():
    return {
        "temperature": 30,
        "humidity": 60,
        "soilMoisture": 45,
        "fertilizerLevel": 75,
        "pesticideLevel": 50,
        "robotOnline": True,
        "robotStatus": "working",
        "batteryLevel": 85
    }

# =========================
# AUTO MODE STATE
# =========================
auto_mode = {
    "running": False,
    "last_action": "idle"
}

# =========================
# AUTO MODE CONTROL
# =========================
@app.post("/auto-start")
def start_auto():
    auto_mode["running"] = True
    auto_mode["last_action"] = "starting"

    print("✅ Auto mode started")

    return {"status": "auto started"}

@app.post("/auto-stop")
def stop_auto():
    auto_mode["running"] = False
    auto_mode["last_action"] = "stopped"

    # Stop robot when auto stops
    send_to_esp32("STOP")

    print("🛑 Auto mode stopped")

    return {"status": "auto stopped"}

@app.get("/auto-status")
def get_auto_status():
    return auto_mode

# =========================
# AUTO ACTION (ML READY 🔥)
# =========================
@app.get("/auto-action")
def get_auto_action():
    if not auto_mode["running"]:
        return {"action": "idle"}

    # 🔥 Replace this with ML model later
    actions = [
        "forward",
        "turn_left",
        "turn_right",
        "spray_left",
        "stop"
    ]

    action = random.choice(actions)
    auto_mode["last_action"] = action

    print("🤖 Auto Action:", action)

    # Translate & send to ESP32
    esp_command = translate_command(action)

    if esp_command:
        send_to_esp32(esp_command)

    return {
        "frontend_action": action,
        "esp32_command": esp_command
    }