import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2, 
  BarChart3, 
  User, 
  Settings, 
  Sparkles, 
  Clock,
  Trophy,
  Play
} from 'lucide-react';

export const ParentDashboard = () => {
  const { setScreen, childProfile, progressStats, todayScreenTime, settings } = useAppStore();

  const menuItems = [
    { 
      icon: Gamepad2, 
      label: 'Игровые уроки', 
      sublabel: 'Выбрать игру для ребёнка',
      color: 'bg-primary',
      iconColor: 'text-primary-foreground',
      screen: 'game-selection' as const,
    },
    { 
      icon: BarChart3, 
      label: 'Прогресс', 
      sublabel: `${progressStats.totalGamesPlayed} игр сыграно`,
      color: 'bg-progress-attention',
      iconColor: 'text-primary-foreground',
      screen: 'progress' as const,
    },
    { 
      icon: User, 
      label: 'Профиль ребёнка', 
      sublabel: childProfile?.name || 'Настроить профиль',
      color: 'bg-progress-logic',
      iconColor: 'text-primary-foreground',
      screen: 'child-profile' as const,
    },
    { 
      icon: Settings, 
      label: 'Настройки', 
      sublabel: 'Экранное время и уведомления',
      color: 'bg-progress-emotion',
      iconColor: 'text-primary-foreground',
      screen: 'settings' as const,
    },
  ];

  const getChildAge = () => {
    if (!childProfile?.birthDate) return null;
    const today = new Date();
    const birth = new Date(childProfile.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = getChildAge();
  const remainingTime = settings.screenTime.maxMinutesPerDay - todayScreenTime;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/50 to-accent/30 px-6 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-muted-foreground text-sm">Добро пожаловать!</p>
            <h1 className="text-xl font-bold text-foreground">Панель родителя</h1>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Child card */}
        {childProfile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl">
                {childProfile.gender === 'male' ? '👦' : childProfile.gender === 'female' ? '👧' : '🙂'}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{childProfile.name}</h2>
                {age !== null && (
                  <p className="text-muted-foreground">{age} {age === 1 ? 'год' : age < 5 ? 'года' : 'лет'}</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setScreen('child-dashboard')}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Режим ребёнка
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{remainingTime > 0 ? remainingTime : 0}</p>
                <p className="text-xs text-muted-foreground">мин осталось</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <Gamepad2 className="w-5 h-5 text-progress-attention mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{progressStats.totalGamesPlayed}</p>
                <p className="text-xs text-muted-foreground">игр сегодня</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <Trophy className="w-5 h-5 text-reward-gold mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{Math.round(progressStats.averageAccuracy)}%</p>
                <p className="text-xs text-muted-foreground">точность</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Menu items */}
      <main className="px-6 py-6 max-w-lg mx-auto">
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setScreen(item.screen)}
              className="w-full bg-card rounded-2xl p-4 shadow-soft flex items-center gap-4 hover:shadow-card transition-shadow text-left"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className={`w-7 h-7 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground truncate">{item.sublabel}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};
