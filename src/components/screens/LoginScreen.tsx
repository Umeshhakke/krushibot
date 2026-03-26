import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/krishi-bot-logo.png';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { t, language, setLanguage } = useLanguage();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ userId?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { userId?: string; password?: string } = {};
    
    if (!userId.trim()) {
      newErrors.userId = t('userIdRequired');
    }
    
    if (!password.trim()) {
      newErrors.password = t('passwordRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const result = await login(userId.trim(), password);
      
      if (result.success) {
        toast({
          title: t('welcomeMessage'),
          description: t('loginSuccess'),
        });
        onLoginSuccess();
      } else {
        toast({
          title: t('loginFailed'),
          description: t('invalidCredentials'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('error'),
        description: t('tryAgain'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: t('forgotPassword'),
      description: t('contactSupport'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex gap-2">
        {(['en', 'mr', 'hi'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              language === lang
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            {lang === 'en' ? 'EN' : lang === 'mr' ? 'मरा' : 'हिं'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl scale-150" />
            <div className="relative w-28 h-28 bg-white rounded-3xl shadow-xl p-4 mx-auto">
              <img 
                src={logo} 
                alt="KrishiBot AI" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-foreground">
            KrishiBot AI
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            {t('smartFarming')}
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {t('userIdLabel')}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    if (errors.userId) setErrors({ ...errors, userId: undefined });
                  }}
                  placeholder={t('userIdPlaceholder')}
                  className={`pl-12 h-14 text-lg rounded-2xl border-2 ${
                    errors.userId ? 'border-destructive' : 'border-input'
                  }`}
                />
              </div>
              {errors.userId && (
                <p className="text-sm text-destructive">{errors.userId}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                {t('passwordLabel')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  placeholder={t('passwordPlaceholder')}
                  className={`pl-12 pr-12 h-14 text-lg rounded-2xl border-2 ${
                    errors.password ? 'border-destructive' : 'border-input'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t('forgotPassword')}
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('loggingIn')}
                </>
              ) : (
                t('loginButton')
              )}
            </Button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-8 p-4 bg-muted/50 rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-medium text-foreground">{t('demoHint')}</span>
              <br />
              {t('userId')}: <span className="font-mono text-primary">farmer123</span>
              <br />
              {t('password')}: <span className="font-mono text-primary">krishi2024</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-muted-foreground">
        © 2024 KrishiBot AI • {t('madeForFarmers')}
      </div>
    </div>
  );
};

export default LoginScreen;
