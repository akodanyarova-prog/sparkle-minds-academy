import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export const ForgotPasswordScreen = () => {
  const { setScreen } = useAppStore();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-progress-logic" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Письмо отправлено!
          </h1>
          <p className="text-muted-foreground mb-6">
            Проверьте вашу почту {email} и следуйте инструкциям для восстановления пароля
          </p>
          <Button
            onClick={() => setScreen('login')}
            variant="outline"
            className="w-full h-12 rounded-xl"
          >
            Вернуться к входу
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreen('login')}
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
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Восстановление пароля
            </h1>
            <p className="text-muted-foreground">
              Введите email, и мы отправим ссылку для восстановления
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
                className="h-12 rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
            >
              Отправить ссылку
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};
