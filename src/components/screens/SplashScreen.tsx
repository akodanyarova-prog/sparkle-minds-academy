import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { Sparkles } from 'lucide-react';

export const SplashScreen = () => {
  const { setScreen, user } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setScreen('parent-dashboard');
      } else {
        setScreen('welcome');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [setScreen, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="inline-block mb-6"
        >
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-button flex items-center justify-center">
            <Sparkles className="w-14 h-14 text-primary-foreground" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Умные Искры
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-muted-foreground"
        >
          Учимся играя
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 flex justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
