import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Clock, Volume2, Bell, Shield, LogOut } from 'lucide-react';

export const SettingsScreen = () => {
  const { setScreen, settings, updateSettings, resetApp } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setScreen('parent-dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">Настройки</h1>
        </div>
      </header>

      <main className="px-6 py-6 max-w-lg mx-auto space-y-6">
        {/* Screen time */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Экранное время</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Ограничение включено</span>
              <Switch checked={settings.screenTime.enabled} onCheckedChange={(checked) => updateSettings({ screenTime: { ...settings.screenTime, enabled: checked } })} />
            </div>
            {settings.screenTime.enabled && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Максимум минут в день</span>
                  <span className="font-medium text-foreground">{settings.screenTime.maxMinutesPerDay}</span>
                </div>
                <Slider value={[settings.screenTime.maxMinutesPerDay]} onValueChange={([value]) => updateSettings({ screenTime: { ...settings.screenTime, maxMinutesPerDay: value } })} min={5} max={60} step={5} />
              </div>
            )}
          </div>
        </motion.section>

        {/* Sound */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-5 h-5 text-progress-attention" />
            <h2 className="font-semibold text-foreground">Звук и вибрация</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Звуки (выключены для спокойствия)</span>
              <Switch checked={settings.soundEnabled} onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Вибрация</span>
              <Switch checked={settings.vibrationEnabled} onCheckedChange={(checked) => updateSettings({ vibrationEnabled: checked })} />
            </div>
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-progress-logic" />
            <h2 className="font-semibold text-foreground">Уведомления</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Уведомления о прогрессе</span>
              <Switch checked={settings.progressNotifications} onCheckedChange={(checked) => updateSettings({ progressNotifications: checked })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Еженедельный отчёт</span>
              <Switch checked={settings.weeklyReport} onCheckedChange={(checked) => updateSettings({ weeklyReport: checked })} />
            </div>
          </div>
        </motion.section>

        {/* Privacy */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-calm/30 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-calm-foreground" />
            <h2 className="font-semibold text-foreground">Конфиденциальность</h2>
          </div>
          <p className="text-sm text-muted-foreground">Мы собираем минимум данных и храним их безопасно.</p>
        </motion.section>

        {/* Logout */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button variant="outline" onClick={() => { resetApp(); setScreen('welcome'); }} className="w-full h-12 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="w-5 h-5 mr-2" />
            Выйти из аккаунта
          </Button>
        </motion.div>
      </main>
    </div>
  );
};
