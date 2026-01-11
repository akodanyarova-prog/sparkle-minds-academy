import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Brain, MessageCircle, Info } from 'lucide-react';

export const WelcomeScreen = () => {
  const { setScreen } = useAppStore();

  const features = [
    { icon: MessageCircle, label: 'Развитие речи', color: 'text-progress-speech' },
    { icon: Brain, label: 'Логика и внимание', color: 'text-progress-logic' },
    { icon: Heart, label: 'Социальные навыки', color: 'text-progress-emotion' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/30 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center mb-6 mx-auto">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground text-center mb-3">
            Добро пожаловать в<br />Умные Искры
          </h1>
          
          <p className="text-muted-foreground text-center max-w-sm">
            Приложение помогает развивать речь, внимание и социальные навыки через весёлые игры
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-sm mb-8"
        >
          <div className="bg-card rounded-2xl shadow-soft p-6 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <span className="font-medium text-foreground">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button
            onClick={() => setScreen('register')}
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
          >
            Начать
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => setScreen('about')}
            className="w-full h-12 text-muted-foreground"
          >
            <Info className="w-5 h-5 mr-2" />
            Узнать больше
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pb-8 px-6"
      >
        <p className="text-sm text-muted-foreground text-center">
          Уже есть аккаунт?{' '}
          <button
            onClick={() => setScreen('login')}
            className="text-primary font-medium hover:underline"
          >
            Войти
          </button>
        </p>
      </motion.div>
    </div>
  );
};
