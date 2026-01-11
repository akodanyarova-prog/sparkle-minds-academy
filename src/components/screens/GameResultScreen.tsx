import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Clock, RotateCcw, ArrowRight } from 'lucide-react';

export const GameResultScreen = () => {
  const { setScreen, gameSessions, childProfile } = useAppStore();

  const lastSession = gameSessions[gameSessions.length - 1];
  const accuracy = lastSession 
    ? Math.round((lastSession.correctAnswers / lastSession.totalQuestions) * 100) 
    : 0;
  
  const duration = lastSession
    ? Math.ceil((new Date(lastSession.endedAt || new Date()).getTime() - new Date(lastSession.startedAt).getTime()) / 60000)
    : 0;

  const getStars = () => {
    if (accuracy >= 90) return 3;
    if (accuracy >= 60) return 2;
    return 1;
  };

  const stars = getStars();

  const getMessage = () => {
    if (accuracy >= 90) return 'Превосходно!';
    if (accuracy >= 70) return 'Отлично!';
    if (accuracy >= 50) return 'Хорошо!';
    return 'Продолжай стараться!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/30 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm text-center"
      >
        {/* Trophy/celebration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-reward-gold to-reward-bronze shadow-button flex items-center justify-center mx-auto">
            <Trophy className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          {getMessage()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-6"
        >
          {childProfile?.name || 'Ты'} справился!
        </motion.p>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: i <= stars ? 1 : 0.7, 
                rotate: 0,
                opacity: i <= stars ? 1 : 0.3,
              }}
              transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
            >
              <Star
                className={`w-12 h-12 ${
                  i <= stars 
                    ? 'text-reward-gold fill-reward-gold' 
                    : 'text-muted fill-muted'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-2xl shadow-card p-6 mb-8"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-sm text-muted-foreground">Точность</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-progress-attention" />
              </div>
              <p className="text-2xl font-bold text-foreground">{duration}</p>
              <p className="text-sm text-muted-foreground">Минут</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Правильных ответов: {lastSession?.correctAnswers || 0} из {lastSession?.totalQuestions || 0}
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={() => setScreen('game-play')}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Ещё раз
          </Button>
          
          <Button
            onClick={() => setScreen('game-selection')}
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
          >
            Выбрать другую игру
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
