import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { getCategoryLabel, getCategoryColor } from '@/data/games';
import { Sparkles, Clock, Target, AlertCircle, Play } from 'lucide-react';

export const PlanResultScreen = () => {
  const { setScreen, learningPlan, childProfile } = useAppStore();

  if (!learningPlan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/50 to-accent/30 px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            План для {childProfile?.name || 'ребёнка'} готов!
          </h1>
          <p className="text-muted-foreground">
            Индивидуальная программа обучения
          </p>
        </motion.div>
      </div>

      <main className="px-6 py-6 max-w-lg mx-auto space-y-6">
        {/* Recommended games */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            Рекомендуемые игры
          </h2>
          <div className="space-y-3">
            {learningPlan.recommendedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4"
              >
                <span className="text-3xl">{game.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{game.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{game.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(game.category)} text-primary-foreground`}>
                  {getCategoryLabel(game.category)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Session duration */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-secondary/50 rounded-2xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-progress-attention" />
            Рекомендуемое время
          </h2>
          <p className="text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">
              {learningPlan.sessionDuration.min}-{learningPlan.sessionDuration.max}
            </span>{' '}
            минут в день, {learningPlan.sessionsPerWeek.min}-{learningPlan.sessionsPerWeek.max} раза в неделю
          </p>
        </motion.section>

        {/* Goals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-progress-logic" />
            Основные цели
          </h2>
          <div className="space-y-2">
            {learningPlan.goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-soft"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">{goal}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-calm/50 rounded-xl p-4 flex gap-3"
        >
          <AlertCircle className="w-5 h-5 text-calm-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Этот план создан на основе ваших ответов и <strong>не является медицинским диагнозом</strong>. 
            Для профессиональной оценки обратитесь к специалистам.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            onClick={() => setScreen('parent-dashboard')}
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
          >
            Начать обучение
          </Button>
        </motion.div>
      </main>
    </div>
  );
};
