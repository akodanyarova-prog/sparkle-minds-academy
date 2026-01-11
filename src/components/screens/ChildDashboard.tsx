import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Gamepad2, Star, LogOut, Sparkles } from 'lucide-react';

export const ChildDashboard = () => {
  const { setScreen, childProfile, progressStats } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/30 flex flex-col">
      <header className="px-6 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Привет!</p>
              <h1 className="text-xl font-bold text-foreground">{childProfile?.name || 'Друг'}</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setScreen('parent-dashboard')} className="text-muted-foreground">
            <LogOut className="w-5 h-5" />
          </Button>
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="w-full max-w-sm space-y-6">
          <motion.button onClick={() => setScreen('game-selection')} className="w-full bg-card rounded-3xl p-8 shadow-card text-center hover:shadow-glow transition-shadow" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="w-24 h-24 rounded-2xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <Gamepad2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Играть!</h2>
            <p className="text-muted-foreground mt-2">Выбери игру</p>
          </motion.button>

          <motion.button onClick={() => setScreen('progress')} className="w-full bg-card rounded-2xl p-6 shadow-soft text-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="flex items-center justify-center gap-4">
              <Star className="w-8 h-8 text-reward-gold" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Мои звёзды</p>
                <p className="text-sm text-muted-foreground">{progressStats.totalGamesPlayed} игр сыграно</p>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};
