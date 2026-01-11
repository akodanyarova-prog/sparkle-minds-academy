import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

export const RegisterScreen = () => {
  const { setScreen, setUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!agreed) {
      newErrors.agreed = 'Необходимо согласие';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Mock registration
      setUser({
        id: crypto.randomUUID(),
        email,
        createdAt: new Date(),
      });
      setScreen('create-child-profile');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreen('welcome')}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </Button>
      </header>

      <main className="px-6 py-8 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Создать аккаунт
            </h1>
            <p className="text-muted-foreground">
              Начните путешествие в мир обучения
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 rounded-xl ${errors.email ? 'border-destructive' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-12 rounded-xl pr-12 ${errors.password ? 'border-destructive' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Подтвердите пароль
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 rounded-xl ${errors.confirmPassword ? 'border-destructive' : ''}`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5"
              />
              <label htmlFor="agree" className="text-sm text-muted-foreground leading-snug">
                Я согласен с{' '}
                <button type="button" className="text-primary hover:underline">
                  политикой конфиденциальности
                </button>
              </label>
            </div>
            {errors.agreed && (
              <p className="text-sm text-destructive -mt-2">{errors.agreed}</p>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
            >
              Создать аккаунт
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Уже есть аккаунт?{' '}
            <button
              onClick={() => setScreen('login')}
              className="text-primary font-medium hover:underline"
            >
              Войти
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
};
