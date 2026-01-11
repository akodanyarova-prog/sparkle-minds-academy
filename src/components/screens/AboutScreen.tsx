import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Heart, AlertCircle } from 'lucide-react';

export const AboutScreen = () => {
  const { setScreen } = useAppStore();

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

      <main className="px-6 py-8 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              О приложении
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              «Умные Искры» — это приложение для инклюзивного обучения детей с 
              особенностями развития. Мы помогаем развивать речь, внимание, 
              мышление и социальные навыки через короткие игровые уроки.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-calm/50 rounded-2xl p-5 border border-calm"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-calm-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Важный дисклеймер
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Это приложение <strong>не ставит диагнозы</strong> и не заменяет 
                  консультацию специалистов. Мы создаём индивидуальные планы 
                  обучения на основе ваших ответов, но это не является медицинским 
                  заключением.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">
              Наши принципы
            </h2>
            
            <div className="bg-card rounded-xl p-4 shadow-soft flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Минимум данных
                </h3>
                <p className="text-sm text-muted-foreground">
                  Мы собираем только необходимую информацию и бережно храним её
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-soft flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">
                  Позитивный подход
                </h3>
                <p className="text-sm text-muted-foreground">
                  Только поощрение и поддержка, никаких наказаний за ошибки
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Как это работает
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">1</span>
                <span>Вы отвечаете на простые вопросы о развитии ребёнка</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">2</span>
                <span>Мы создаём индивидуальный план обучения</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">3</span>
                <span>Ребёнок учится через короткие игры по 2-5 минут</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">4</span>
                <span>Сложность адаптируется под прогресс ребёнка</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};
