import type { Game } from '@/types/app';

export const games: Game[] = [
  // Speech games
  {
    id: 'speech-1',
    title: 'Звуковая азбука',
    description: 'Учимся произносить звуки и слоги',
    category: 'speech',
    ageRange: { min: 3, max: 7 },
    durationMinutes: 3,
    difficulty: 'beginner',
    icon: '🔤',
  },
  {
    id: 'speech-2',
    title: 'Назови картинку',
    description: 'Называем предметы на картинках',
    category: 'speech',
    ageRange: { min: 3, max: 8 },
    durationMinutes: 4,
    difficulty: 'beginner',
    icon: '🖼️',
  },
  {
    id: 'speech-3',
    title: 'Расскажи историю',
    description: 'Составляем короткие рассказы',
    category: 'speech',
    ageRange: { min: 5, max: 10 },
    durationMinutes: 5,
    difficulty: 'intermediate',
    icon: '📖',
  },
  
  // Attention games
  {
    id: 'attention-1',
    title: 'Найди пару',
    description: 'Ищем одинаковые картинки',
    category: 'attention',
    ageRange: { min: 3, max: 8 },
    durationMinutes: 3,
    difficulty: 'beginner',
    icon: '🎴',
  },
  {
    id: 'attention-2',
    title: 'Что изменилось?',
    description: 'Замечаем изменения на картинке',
    category: 'attention',
    ageRange: { min: 4, max: 9 },
    durationMinutes: 4,
    difficulty: 'intermediate',
    icon: '🔍',
  },
  {
    id: 'attention-3',
    title: 'Следи за шариком',
    description: 'Следим глазами за движущимся объектом',
    category: 'attention',
    ageRange: { min: 3, max: 7 },
    durationMinutes: 2,
    difficulty: 'beginner',
    icon: '⚽',
  },
  
  // Logic games
  {
    id: 'logic-1',
    title: 'Собери пазл',
    description: 'Собираем простые пазлы',
    category: 'logic',
    ageRange: { min: 3, max: 8 },
    durationMinutes: 4,
    difficulty: 'beginner',
    icon: '🧩',
  },
  {
    id: 'logic-2',
    title: 'Продолжи ряд',
    description: 'Находим закономерности в последовательностях',
    category: 'logic',
    ageRange: { min: 4, max: 10 },
    durationMinutes: 3,
    difficulty: 'intermediate',
    icon: '🔢',
  },
  {
    id: 'logic-3',
    title: 'Лишний предмет',
    description: 'Находим предмет, который не подходит',
    category: 'logic',
    ageRange: { min: 4, max: 9 },
    durationMinutes: 3,
    difficulty: 'beginner',
    icon: '🎯',
  },
  
  // Emotion games
  {
    id: 'emotion-1',
    title: 'Угадай эмоцию',
    description: 'Распознаём эмоции на лицах',
    category: 'emotion',
    ageRange: { min: 3, max: 10 },
    durationMinutes: 3,
    difficulty: 'beginner',
    icon: '😊',
  },
  {
    id: 'emotion-2',
    title: 'Как себя чувствует?',
    description: 'Понимаем чувства персонажей в ситуациях',
    category: 'emotion',
    ageRange: { min: 4, max: 10 },
    durationMinutes: 4,
    difficulty: 'intermediate',
    icon: '💭',
  },
  {
    id: 'emotion-3',
    title: 'Дружба',
    description: 'Учимся дружить и помогать',
    category: 'emotion',
    ageRange: { min: 4, max: 9 },
    durationMinutes: 5,
    difficulty: 'intermediate',
    icon: '🤝',
  },
];

export const getCategoryLabel = (category: Game['category']): string => {
  const labels: Record<Game['category'], string> = {
    speech: 'Речь',
    attention: 'Внимание',
    logic: 'Логика',
    emotion: 'Эмоции',
  };
  return labels[category];
};

export const getCategoryColor = (category: Game['category']): string => {
  const colors: Record<Game['category'], string> = {
    speech: 'bg-progress-speech',
    attention: 'bg-progress-attention',
    logic: 'bg-progress-logic',
    emotion: 'bg-progress-emotion',
  };
  return colors[category];
};

export const getDifficultyLabel = (difficulty: Game['difficulty']): string => {
  const labels: Record<Game['difficulty'], string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };
  return labels[difficulty];
};
