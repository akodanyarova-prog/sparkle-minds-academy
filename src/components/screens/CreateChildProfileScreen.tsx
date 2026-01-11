import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Calendar, Sparkles } from 'lucide-react';

export const CreateChildProfileScreen = () => {
  const { setScreen, setChildProfile } = useAppStore();
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'prefer_not_to_say' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Введите имя ребёнка';
    }
    
    if (!birthYear || !birthMonth) {
      newErrors.birth = 'Укажите дату рождения';
    }
    
    if (!gender) {
      newErrors.gender = 'Выберите пол';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth), 1);
      setChildProfile({
        id: crypto.randomUUID(),
        name: name.trim(),
        birthDate,
        gender: gender as 'male' | 'female' | 'prefer_not_to_say',
      });
      setScreen('survey');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setScreen('register')}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </Button>
      </header>

      <main className="px-6 py-8 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Профиль ребёнка
            </h1>
            <p className="text-muted-foreground">
              Расскажите немного о вашем ребёнке
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Имя ребёнка
              </label>
              <Input
                type="text"
                placeholder="Как зовут вашего ребёнка?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`h-12 rounded-xl ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Дата рождения
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Select value={birthMonth} onValueChange={setBirthMonth}>
                  <SelectTrigger className={`h-12 rounded-xl ${errors.birth ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Месяц" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={month} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={birthYear} onValueChange={setBirthYear}>
                  <SelectTrigger className={`h-12 rounded-xl ${errors.birth ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Год" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.birth && (
                <p className="text-sm text-destructive mt-1">{errors.birth}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пол
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'male', label: 'Мальчик', icon: '👦' },
                  { value: 'female', label: 'Девочка', icon: '👧' },
                  { value: 'prefer_not_to_say', label: 'Не указывать', icon: '🙂' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGender(option.value as typeof gender)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      gender === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    } ${errors.gender ? 'border-destructive' : ''}`}
                  >
                    <span className="text-2xl block mb-1">{option.icon}</span>
                    <span className="text-xs font-medium text-foreground">{option.label}</span>
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-sm text-destructive mt-1">{errors.gender}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold rounded-2xl shadow-button mt-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Далее
            </Button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};
