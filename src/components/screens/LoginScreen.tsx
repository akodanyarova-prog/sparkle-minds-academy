import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';

export const LoginScreen = () => {
  const { setScreen, setUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }
    
    // Mock login - in real app would validate credentials
    setUser({
      id: crypto.randomUUID(),
      email,
      createdAt: new Date(),
    });
    setScreen('parent-dashboard');
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
              С возвращением!
            </h1>
            <p className="text-muted-foreground">
              Войдите в свой аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пароль
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ваш пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setScreen('forgot-password')}
                className="text-sm text-primary hover:underline"
              >
                Забыли пароль?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
            >
              Войти
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Нет аккаунта?{' '}
            <button
              onClick={() => setScreen('register')}
              className="text-primary font-medium hover:underline"
            >
              Зарегистрироваться
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
};
