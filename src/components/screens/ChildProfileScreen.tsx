import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, RefreshCw, Trash2 } from 'lucide-react';

export const ChildProfileScreen = () => {
  const { setScreen, childProfile, learningPlan, setSurveyStep, resetApp } = useAppStore();

  const getAge = () => {
    if (!childProfile?.birthDate) return null;
    const today = new Date();
    const birth = new Date(childProfile.birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setScreen('parent-dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Профиль ребёнка</h1>
        </div>
      </header>

      <main className="px-6 py-6 max-w-lg mx-auto space-y-6">
        {childProfile && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-soft text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-5xl mx-auto mb-4">
              {childProfile.gender === 'male' ? '👦' : childProfile.gender === 'female' ? '👧' : '🙂'}
            </div>
            <h2 className="text-2xl font-bold text-foreground">{childProfile.name}</h2>
            <p className="text-muted-foreground">{getAge()} лет</p>
          </motion.div>
        )}

        {learningPlan && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-secondary/50 rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-3">Цели обучения</h3>
            <ul className="space-y-2">
              {learningPlan.goals.map((goal, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
          <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => { setSurveyStep(0); setScreen('survey'); }}>
            <RefreshCw className="w-5 h-5 mr-2" />
            Переоценить профиль
          </Button>
          <Button variant="outline" className="w-full h-12 rounded-xl text-destructive border-destructive/30" onClick={() => { resetApp(); setScreen('welcome'); }}>
            <Trash2 className="w-5 h-5 mr-2" />
            Удалить профиль
          </Button>
        </motion.div>
      </main>
    </div>
  );
};
