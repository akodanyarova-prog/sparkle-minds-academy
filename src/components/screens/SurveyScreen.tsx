import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { SurveyAnswers } from '@/types/app';

interface Question {
  key: keyof SurveyAnswers;
  title: string;
  subtitle: string;
  options: { value: string; label: string; emoji: string }[];
  multiSelect?: boolean;
}

const questions: Question[] = [
  {
    key: 'speechFrequency',
    title: 'Развитие речи',
    subtitle: 'Как часто ваш ребёнок использует слова для общения?',
    options: [
      { value: 'rarely', label: 'Редко', emoji: '🤫' },
      { value: 'sometimes', label: 'Иногда', emoji: '💬' },
      { value: 'often', label: 'Часто', emoji: '🗣️' },
      { value: 'very_often', label: 'Очень часто', emoji: '🎤' },
    ],
  },
  {
    key: 'understandsInstructions',
    title: 'Понимание речи',
    subtitle: 'Понимает ли ребёнок простые инструкции?',
    options: [
      { value: 'no', label: 'Нет', emoji: '😕' },
      { value: 'partially', label: 'Частично', emoji: '🤔' },
      { value: 'yes', label: 'Да', emoji: '👍' },
      { value: 'fully', label: 'Полностью', emoji: '🌟' },
    ],
  },
  {
    key: 'concentrationTime',
    title: 'Концентрация внимания',
    subtitle: 'Как долго ребёнок может сосредоточиться на одном занятии?',
    options: [
      { value: 'less_1min', label: 'Менее 1 мин', emoji: '⚡' },
      { value: '1_3min', label: '1-3 минуты', emoji: '⏱️' },
      { value: '3_5min', label: '3-5 минут', emoji: '⏰' },
      { value: 'more_5min', label: 'Более 5 мин', emoji: '🎯' },
    ],
  },
  {
    key: 'distractibility',
    title: 'Отвлекаемость',
    subtitle: 'Отвлекается ли ребёнок на посторонние звуки или движения?',
    options: [
      { value: 'very_often', label: 'Очень часто', emoji: '🦋' },
      { value: 'often', label: 'Часто', emoji: '👀' },
      { value: 'sometimes', label: 'Иногда', emoji: '🙂' },
      { value: 'rarely', label: 'Редко', emoji: '🧘' },
    ],
  },
  {
    key: 'newSituationReaction',
    title: 'Реакция на новое',
    subtitle: 'Как ребёнок реагирует на новые ситуации?',
    options: [
      { value: 'very_anxious', label: 'Очень тревожно', emoji: '😰' },
      { value: 'cautious', label: 'Осторожно', emoji: '🤨' },
      { value: 'neutral', label: 'Нейтрально', emoji: '😐' },
      { value: 'interested', label: 'С интересом', emoji: '🤩' },
    ],
  },
  {
    key: 'preferredActivities',
    title: 'Любимые занятия',
    subtitle: 'Какие виды деятельности нравятся ребёнку больше всего?',
    options: [
      { value: 'music', label: 'Музыка', emoji: '🎵' },
      { value: 'drawing', label: 'Рисование', emoji: '🎨' },
      { value: 'movement', label: 'Движение', emoji: '🏃' },
      { value: 'logic', label: 'Логические игры', emoji: '🧩' },
    ],
    multiSelect: true,
  },
  {
    key: 'primaryGoal',
    title: 'Цели обучения',
    subtitle: 'На что вы хотели бы сосредоточиться в первую очередь?',
    options: [
      { value: 'speech', label: 'Развитие речи', emoji: '🗣️' },
      { value: 'attention', label: 'Улучшение внимания', emoji: '🎯' },
      { value: 'social', label: 'Социальные навыки', emoji: '🤝' },
      { value: 'logic', label: 'Логическое мышление', emoji: '🧠' },
      { value: 'all', label: 'Все вместе', emoji: '✨' },
    ],
  },
];

export const SurveyScreen = () => {
  const { setScreen, surveyAnswers, setSurveyAnswers, currentSurveyStep, setSurveyStep } = useAppStore();
  
  const currentQuestion = questions[currentSurveyStep];
  const progress = ((currentSurveyStep + 1) / questions.length) * 100;
  
  const currentAnswer = surveyAnswers[currentQuestion.key];
  
  const handleSelect = (value: string) => {
    if (currentQuestion.multiSelect) {
      const current = (currentAnswer as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setSurveyAnswers({ [currentQuestion.key]: updated });
    } else {
      setSurveyAnswers({ [currentQuestion.key]: value });
    }
  };

  const isSelected = (value: string): boolean => {
    if (currentQuestion.multiSelect) {
      return ((currentAnswer as string[]) || []).includes(value);
    }
    return currentAnswer === value;
  };

  const canProceed = (): boolean => {
    if (currentQuestion.multiSelect) {
      return ((currentAnswer as string[]) || []).length > 0;
    }
    return !!currentAnswer;
  };

  const handleNext = () => {
    if (currentSurveyStep < questions.length - 1) {
      setSurveyStep(currentSurveyStep + 1);
    } else {
      setScreen('loading-plan');
    }
  };

  const handleBack = () => {
    if (currentSurveyStep > 0) {
      setSurveyStep(currentSurveyStep - 1);
    } else {
      setScreen('create-child-profile');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentSurveyStep + 1} из {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSurveyStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                {currentQuestion.title}
              </span>
              <h1 className="text-xl font-bold text-foreground leading-snug">
                {currentQuestion.subtitle}
              </h1>
              {currentQuestion.multiSelect && (
                <p className="text-sm text-muted-foreground mt-2">
                  Можно выбрать несколько вариантов
                </p>
              )}
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isSelected(option.value)
                      ? 'border-primary bg-primary/10 shadow-soft'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="flex-1 text-left font-medium text-foreground">
                    {option.label}
                  </span>
                  {isSelected(option.value) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border p-4">
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button"
        >
          {currentSurveyStep < questions.length - 1 ? (
            <>
              Далее
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Готово
              <Check className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </footer>
    </div>
  );
};
