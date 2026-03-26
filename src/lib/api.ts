const API_URL = "http://localhost:8000";

export const sendMessageToBackend = async (message: string) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
};