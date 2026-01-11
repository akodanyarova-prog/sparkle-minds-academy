import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Calendar, Clock, Target } from 'lucide-react';

export const ProgressScreen = () => {
  const { setScreen, progressStats, childProfile, gameSessions } = useAppStore();

  const skills = [
    { key: 'speech', label: 'Речь', value: progressStats.skillProgress.speech, color: 'bg-progress-speech' },
    { key: 'attention', label: 'Внимание', value: progressStats.skillProgress.attention, color: 'bg-progress-attention' },
    { key: 'logic', label: 'Логика', value: progressStats.skillProgress.logic, color: 'bg-progress-logic' },
    { key: 'emotion', label: 'Эмоции', value: progressStats.skillProgress.emotion, color: 'bg-progress-emotion' },
  ];

  // Calculate this week's games
  const weekGames = progressStats.weeklyGames;
  const maxGames = Math.max(...weekGames.map(d => d.count), 1);

  // Get recent sessions
  const recentSessions = gameSessions.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScreen('parent-dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Прогресс</h1>
            <p className="text-sm text-muted-foreground">{childProfile?.name}</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-6 max-w-lg mx-auto space-y-6">
        {/* Quick stats */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-card rounded-xl p-4 shadow-soft text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{progressStats.totalGamesPlayed}</p>
            <p className="text-xs text-muted-foreground">Всего игр</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft text-center">
            <Clock className="w-6 h-6 text-progress-attention mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{progressStats.totalTimeMinutes}</p>
            <p className="text-xs text-muted-foreground">Минут</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft text-center">
            <TrendingUp className="w-6 h-6 text-progress-logic mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{Math.round(progressStats.averageAccuracy)}%</p>
            <p className="text-xs text-muted-foreground">Точность</p>
          </div>
        </motion.section>

        {/* Weekly chart */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-soft"
        >
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            Активность за неделю
          </h2>
          <div className="flex items-end justify-between h-24 gap-2">
            {weekGames.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((day.count / maxGames) * 100, 10)}%` }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex-1 flex flex-col items-center"
              >
                <div 
                  className={`w-full rounded-t-lg ${day.count > 0 ? 'bg-primary' : 'bg-muted'}`}
                  style={{ height: '100%', minHeight: '8px' }}
                />
                <span className="text-xs text-muted-foreground mt-2">{day.day}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skill progress */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-soft"
        >
          <h2 className="font-semibold text-foreground mb-4">
            Развитие навыков
          </h2>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{skill.label}</span>
                  <span className="text-sm text-muted-foreground">{skill.value}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent sessions */}
        {recentSessions.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-semibold text-foreground mb-4">
              Последние игры
            </h2>
            <div className="space-y-3">
              {recentSessions.map((session, index) => {
                const accuracy = Math.round((session.correctAnswers / session.totalQuestions) * 100);
                const date = new Date(session.startedAt);
                
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="bg-card rounded-xl p-4 shadow-soft flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                      🎮
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Игра #{session.id.slice(-4)}</p>
                      <p className="text-sm text-muted-foreground">
                        {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      accuracy >= 70 
                        ? 'bg-progress-logic/20 text-progress-logic' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {accuracy}%
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {recentSessions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Пока нет сыгранных игр.<br />Начните обучение прямо сейчас!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
