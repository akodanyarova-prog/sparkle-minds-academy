import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { games } from '@/data/games';
import { Brain, Sparkles, Target, Clock } from 'lucide-react';

export const LoadingPlanScreen = () => {
  const { setScreen, surveyAnswers, childProfile, setLearningPlan } = useAppStore();

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      // Generate learning plan based on survey answers
      const primaryGoal = surveyAnswers.primaryGoal || 'all';
      
      // Filter and sort games based on answers
      let recommendedGames = games.filter(game => {
        if (childProfile?.birthDate) {
          const age = new Date().getFullYear() - childProfile.birthDate.getFullYear();
          return age >= game.ageRange.min && age <= game.ageRange.max;
        }
        return true;
      });

      // Prioritize based on primary goal
      if (primaryGoal !== 'all') {
        const goalToCategory: Record<string, string> = {
          speech: 'speech',
          attention: 'attention',
          social: 'emotion',
          logic: 'logic',
        };
        const targetCategory = goalToCategory[primaryGoal];
        recommendedGames = [
          ...recommendedGames.filter(g => g.category === targetCategory),
          ...recommendedGames.filter(g => g.category !== targetCategory),
        ];
      }

      // Take top 5 games
      recommendedGames = recommendedGames.slice(0, 5);

      // Determine session duration based on concentration time
      const concentrationTime = surveyAnswers.concentrationTime || '3_5min';
      const sessionDuration = {
        less_1min: { min: 10, max: 15 },
        '1_3min': { min: 15, max: 20 },
        '3_5min': { min: 15, max: 25 },
        more_5min: { min: 20, max: 30 },
      }[concentrationTime] || { min: 15, max: 20 };

      // Determine sessions per week
      const sessionsPerWeek = {
        less_1min: { min: 2, max: 3 },
        '1_3min': { min: 3, max: 4 },
        '3_5min': { min: 3, max: 5 },
        more_5min: { min: 4, max: 5 },
      }[concentrationTime] || { min: 3, max: 4 };

      // Generate goals
      const goals = [];
      if (primaryGoal === 'speech' || primaryGoal === 'all') {
        goals.push('Развитие словарного запаса');
      }
      if (primaryGoal === 'attention' || primaryGoal === 'all') {
        goals.push('Улучшение концентрации внимания');
      }
      if (primaryGoal === 'social' || primaryGoal === 'all') {
        goals.push('Понимание эмоций и социальных ситуаций');
      }
      if (primaryGoal === 'logic' || primaryGoal === 'all') {
        goals.push('Развитие логического мышления');
      }

      setLearningPlan({
        recommendedGames,
        sessionDuration,
        sessionsPerWeek,
        goals,
        createdAt: new Date(),
      });

      setScreen('plan-result');
    }, 3000);

    return () => clearTimeout(timer);
  }, [setScreen, surveyAnswers, childProfile, setLearningPlan]);

  const steps = [
    { icon: Brain, label: 'Анализируем ответы...', delay: 0 },
    { icon: Target, label: 'Подбираем игры...', delay: 1 },
    { icon: Clock, label: 'Создаём расписание...', delay: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/30 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-sm"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center mx-auto mb-8"
        >
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          Создаём индивидуальный план
        </h1>
        <p className="text-muted-foreground mb-8">
          Это займёт несколько секунд...
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-soft"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  delay: step.delay + 0.5,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center"
              >
                <step.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="font-medium text-foreground">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
