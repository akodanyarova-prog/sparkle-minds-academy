import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { X, Star, Check, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  prompt: string;
  options: { value: string; label: string; correct: boolean }[];
  hint: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    prompt: 'Какое животное говорит "Мяу"?',
    options: [
      { value: 'cat', label: '🐱 Кошка', correct: true },
      { value: 'dog', label: '🐕 Собака', correct: false },
      { value: 'bird', label: '🐦 Птица', correct: false },
    ],
    hint: 'Это пушистое домашнее животное',
  },
  {
    id: 2,
    prompt: 'Найди лишний предмет:',
    options: [
      { value: 'apple', label: '🍎 Яблоко', correct: false },
      { value: 'banana', label: '🍌 Банан', correct: false },
      { value: 'car', label: '🚗 Машина', correct: true },
    ],
    hint: 'Два из них можно кушать',
  },
  {
    id: 3,
    prompt: 'Какого цвета небо?',
    options: [
      { value: 'red', label: '🔴 Красный', correct: false },
      { value: 'blue', label: '🔵 Синий', correct: true },
      { value: 'green', label: '🟢 Зелёный', correct: false },
    ],
    hint: 'Посмотри в окно!',
  },
];

export const GamePlayScreen = () => {
  const { setScreen, addScreenTime, addGameSession, updateProgress, progressStats } = useAppStore();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [startTime] = useState(Date.now());
  const [streak, setStreak] = useState(0);

  const question = sampleQuestions[currentQuestion];
  const isCorrect = question.options.find(o => o.value === selectedAnswer)?.correct;

  useEffect(() => {
    // Track screen time
    const interval = setInterval(() => {
      addScreenTime(1);
    }, 60000);

    return () => clearInterval(interval);
  }, [addScreenTime]);

  const handleAnswer = (value: string) => {
    if (showResult) return;
    
    setSelectedAnswer(value);
    setShowResult(true);
    
    const correct = question.options.find(o => o.value === value)?.correct;
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      // Game finished
      const endTime = Date.now();
      const durationMinutes = Math.ceil((endTime - startTime) / 60000);
      
      addGameSession({
        id: crypto.randomUUID(),
        gameId: 'demo-game',
        childId: 'current-child',
        startedAt: new Date(startTime),
        endedAt: new Date(endTime),
        correctAnswers: score + (isCorrect ? 1 : 0),
        totalQuestions: sampleQuestions.length,
        difficultyLevel: 1,
      });

      addScreenTime(durationMinutes);

      const newTotal = progressStats.totalGamesPlayed + 1;
      const accuracy = ((score + (isCorrect ? 1 : 0)) / sampleQuestions.length) * 100;
      const newAvgAccuracy = (progressStats.averageAccuracy * progressStats.totalGamesPlayed + accuracy) / newTotal;

      updateProgress({
        totalGamesPlayed: newTotal,
        totalTimeMinutes: progressStats.totalTimeMinutes + durationMinutes,
        averageAccuracy: newAvgAccuracy,
      });

      setScreen('game-result');
    }
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setScreen('game-selection');
  };

  return (
    <div className="min-h-screen bg-game-bg flex flex-col">
      {/* Exit confirmation modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <h2 className="text-xl font-bold text-foreground mb-3">
                Выйти из игры?
              </h2>
              <p className="text-muted-foreground mb-6">
                Прогресс в этой игре не будет сохранён
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setShowExitConfirm(false)}
                >
                  Продолжить игру
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 rounded-xl"
                  onClick={confirmExit}
                >
                  Выйти
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button
          onClick={handleExit}
          className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex items-center gap-2">
          {[...Array(sampleQuestions.length)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < currentQuestion
                  ? 'bg-primary'
                  : i === currentQuestion
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 bg-card shadow-soft rounded-full px-3 py-1.5">
          <Star className="w-4 h-4 text-reward-gold" />
          <span className="font-bold text-foreground">{score}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            {/* Streak indicator */}
            {streak >= 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center mb-4"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reward-gold/20 text-reward-gold font-semibold">
                  🔥 {streak} подряд!
                </span>
              </motion.div>
            )}

            <h1 className="text-2xl font-bold text-foreground text-center mb-8">
              {question.prompt}
            </h1>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option.value;
                const showCorrect = showResult && option.correct;
                const showWrong = showResult && isSelected && !option.correct;

                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.value)}
                    disabled={showResult}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                      showCorrect
                        ? 'border-progress-logic bg-progress-logic/10'
                        : showWrong
                        ? 'border-destructive bg-destructive/10'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <span className="text-3xl">{option.label.split(' ')[0]}</span>
                    <span className="flex-1 text-lg font-medium text-foreground">
                      {option.label.split(' ').slice(1).join(' ')}
                    </span>
                    {showCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-progress-logic flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Hint button */}
            {!showResult && !showHint && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowHint(true)}
                className="w-full mt-6 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Нужна подсказка?</span>
              </motion.button>
            )}

            {/* Hint */}
            {showHint && !showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-calm/50 rounded-xl p-4 text-center"
              >
                <p className="text-calm-foreground">💡 {question.hint}</p>
              </motion.div>
            )}

            {/* Result feedback */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                {isCorrect ? (
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-6xl"
                    >
                      🎉
                    </motion.div>
                    <p className="text-xl font-bold text-progress-logic">
                      Отлично!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-6xl"
                    >
                      🤔
                    </motion.div>
                    <p className="text-xl font-bold text-foreground">
                      Попробуй ещё раз!
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  className="mt-6 h-14 px-8 text-lg font-semibold rounded-2xl shadow-button"
                >
                  {currentQuestion < sampleQuestions.length - 1 ? 'Далее' : 'Завершить'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
