import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  ChildProfile, 
  SurveyAnswers, 
  LearningPlan, 
  AppSettings, 
  ProgressStats,
  GameSession,
  AppScreen 
} from '@/types/app';

interface AppState {
  // Navigation
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Child profile
  childProfile: ChildProfile | null;
  setChildProfile: (profile: ChildProfile | null) => void;
  
  // Survey
  surveyAnswers: Partial<SurveyAnswers>;
  setSurveyAnswers: (answers: Partial<SurveyAnswers>) => void;
  currentSurveyStep: number;
  setSurveyStep: (step: number) => void;
  
  // Learning plan
  learningPlan: LearningPlan | null;
  setLearningPlan: (plan: LearningPlan | null) => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // Progress
  progressStats: ProgressStats;
  updateProgress: (stats: Partial<ProgressStats>) => void;
  
  // Game sessions
  gameSessions: GameSession[];
  addGameSession: (session: GameSession) => void;
  
  // Screen time tracking
  todayScreenTime: number;
  addScreenTime: (minutes: number) => void;
  resetDailyScreenTime: () => void;
  
  // Mode
  isChildMode: boolean;
  setChildMode: (isChild: boolean) => void;
  
  // Reset
  resetApp: () => void;
}

const defaultSettings: AppSettings = {
  screenTime: {
    enabled: true,
    maxMinutesPerDay: 20,
  },
  soundEnabled: false,
  vibrationEnabled: true,
  progressNotifications: true,
  weeklyReport: true,
};

const defaultProgress: ProgressStats = {
  totalGamesPlayed: 0,
  totalTimeMinutes: 0,
  averageAccuracy: 0,
  skillProgress: {
    speech: 0,
    attention: 0,
    logic: 0,
    emotion: 0,
  },
  weeklyGames: [
    { day: 'Пн', count: 0 },
    { day: 'Вт', count: 0 },
    { day: 'Ср', count: 0 },
    { day: 'Чт', count: 0 },
    { day: 'Пт', count: 0 },
    { day: 'Сб', count: 0 },
    { day: 'Вс', count: 0 },
  ],
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentScreen: 'splash',
      setScreen: (screen) => set({ currentScreen: screen }),
      
      user: null,
      setUser: (user) => set({ user }),
      
      childProfile: null,
      setChildProfile: (childProfile) => set({ childProfile }),
      
      surveyAnswers: {},
      setSurveyAnswers: (answers) => set((state) => ({ 
        surveyAnswers: { ...state.surveyAnswers, ...answers } 
      })),
      currentSurveyStep: 0,
      setSurveyStep: (step) => set({ currentSurveyStep: step }),
      
      learningPlan: null,
      setLearningPlan: (learningPlan) => set({ learningPlan }),
      
      settings: defaultSettings,
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      
      progressStats: defaultProgress,
      updateProgress: (stats) => set((state) => ({
        progressStats: { ...state.progressStats, ...stats }
      })),
      
      gameSessions: [],
      addGameSession: (session) => set((state) => ({
        gameSessions: [...state.gameSessions, session]
      })),
      
      todayScreenTime: 0,
      addScreenTime: (minutes) => set((state) => ({
        todayScreenTime: state.todayScreenTime + minutes
      })),
      resetDailyScreenTime: () => set({ todayScreenTime: 0 }),
      
      isChildMode: false,
      setChildMode: (isChildMode) => set({ isChildMode }),
      
      resetApp: () => set({
        currentScreen: 'splash',
        user: null,
        childProfile: null,
        surveyAnswers: {},
        currentSurveyStep: 0,
        learningPlan: null,
        settings: defaultSettings,
        progressStats: defaultProgress,
        gameSessions: [],
        todayScreenTime: 0,
        isChildMode: false,
      }),
    }),
    {
      name: 'inclusive-learning-app',
      partialize: (state) => ({
        user: state.user,
        childProfile: state.childProfile,
        surveyAnswers: state.surveyAnswers,
        learningPlan: state.learningPlan,
        settings: state.settings,
        progressStats: state.progressStats,
        gameSessions: state.gameSessions,
      }),
    }
  )
);
