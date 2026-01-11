import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { games, getCategoryLabel, getCategoryColor, getDifficultyLabel } from '@/data/games';
import { ArrowLeft, Clock, Star, Play, Filter } from 'lucide-react';
import type { Game } from '@/types/app';

type CategoryFilter = 'all' | Game['category'];

export const GameSelectionScreen = () => {
  const { setScreen, childProfile, learningPlan } = useAppStore();
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const getChildAge = () => {
    if (!childProfile?.birthDate) return 5;
    const today = new Date();
    const birth = new Date(childProfile.birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  const age = getChildAge();

  // Filter games by age and category
  const filteredGames = games.filter(game => {
    const ageMatch = age >= game.ageRange.min && age <= game.ageRange.max;
    const categoryMatch = filter === 'all' || game.category === filter;
    return ageMatch && categoryMatch;
  });

  // Get recommended game IDs
  const recommendedIds = new Set(learningPlan?.recommendedGames.map(g => g.id) || []);

  // Sort: recommended first
  const sortedGames = [...filteredGames].sort((a, b) => {
    const aRec = recommendedIds.has(a.id) ? 0 : 1;
    const bRec = recommendedIds.has(b.id) ? 0 : 1;
    return aRec - bRec;
  });

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'speech', label: 'Речь' },
    { value: 'attention', label: 'Внимание' },
    { value: 'logic', label: 'Логика' },
    { value: 'emotion', label: 'Эмоции' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScreen('parent-dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Игровые уроки</h1>
            <p className="text-sm text-muted-foreground">
              Выберите игру для {childProfile?.name || 'ребёнка'}
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Recommended section */}
        {filter === 'all' && recommendedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-reward-gold" />
              Рекомендованные
            </h2>
          </motion.div>
        )}

        {/* Games grid */}
        <div className="grid gap-4">
          {sortedGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-soft ${
                recommendedIds.has(game.id) ? 'ring-2 ring-primary/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-3xl flex-shrink-0">
                  {game.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{game.title}</h3>
                    {recommendedIds.has(game.id) && (
                      <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-reward-gold/20 text-reward-gold text-xs font-medium">
                        ★ Рекомендуется
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{game.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full ${getCategoryColor(game.category)} text-primary-foreground`}>
                      {getCategoryLabel(game.category)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {game.durationMinutes} мин
                    </span>
                    <span>{getDifficultyLabel(game.difficulty)}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setScreen('game-play')}
                className="w-full mt-4 rounded-xl"
              >
                <Play className="w-4 h-4 mr-2" />
                Запустить игру
              </Button>
            </motion.div>
          ))}
        </div>

        {sortedGames.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Нет игр для выбранной категории и возраста
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
