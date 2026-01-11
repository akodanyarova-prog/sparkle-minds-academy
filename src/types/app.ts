// Types for the inclusive learning app

export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'prefer_not_to_say';
  avatarUrl?: string;
}

export interface SurveyAnswers {
  speechFrequency: 'rarely' | 'sometimes' | 'often' | 'very_often';
  understandsInstructions: 'no' | 'partially' | 'yes' | 'fully';
  concentrationTime: 'less_1min' | '1_3min' | '3_5min' | 'more_5min';
  distractibility: 'very_often' | 'often' | 'sometimes' | 'rarely';
  newSituationReaction: 'very_anxious' | 'cautious' | 'neutral' | 'interested';
  preferredActivities: ('music' | 'drawing' | 'movement' | 'logic' | 'other')[];
  primaryGoal: 'speech' | 'attention' | 'social' | 'logic' | 'all';
}

export interface LearningPlan {
  recommendedGames: Game[];
  sessionDuration: { min: number; max: number };
  sessionsPerWeek: { min: number; max: number };
  goals: string[];
  createdAt: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: 'speech' | 'attention' | 'logic' | 'emotion';
  ageRange: { min: number; max: number };
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

export interface GameSession {
  id: string;
  gameId: string;
  childId: string;
  startedAt: Date;
  endedAt?: Date;
  correctAnswers: number;
  totalQuestions: number;
  difficultyLevel: number;
}

export interface ProgressStats {
  totalGamesPlayed: number;
  totalTimeMinutes: number;
  averageAccuracy: number;
  skillProgress: {
    speech: number;
    attention: number;
    logic: number;
    emotion: number;
  };
  weeklyGames: { day: string; count: number }[];
}

export interface ScreenTimeSettings {
  enabled: boolean;
  maxMinutesPerDay: number;
  allowedStartTime?: string;
  allowedEndTime?: string;
}

export interface AppSettings {
  screenTime: ScreenTimeSettings;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  progressNotifications: boolean;
  weeklyReport: boolean;
}

export type AppScreen = 
  | 'splash'
  | 'welcome'
  | 'about'
  | 'register'
  | 'login'
  | 'forgot-password'
  | 'create-child-profile'
  | 'survey'
  | 'loading-plan'
  | 'plan-result'
  | 'parent-dashboard'
  | 'game-selection'
  | 'game-play'
  | 'game-result'
  | 'progress'
  | 'child-profile'
  | 'settings'
  | 'child-dashboard'
  | 'child-games'
  | 'child-progress';
