import { useAppStore } from '@/stores/appStore';
import { SplashScreen } from '@/components/screens/SplashScreen';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { AboutScreen } from '@/components/screens/AboutScreen';
import { RegisterScreen } from '@/components/screens/RegisterScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { ForgotPasswordScreen } from '@/components/screens/ForgotPasswordScreen';
import { CreateChildProfileScreen } from '@/components/screens/CreateChildProfileScreen';
import { SurveyScreen } from '@/components/screens/SurveyScreen';
import { LoadingPlanScreen } from '@/components/screens/LoadingPlanScreen';
import { PlanResultScreen } from '@/components/screens/PlanResultScreen';
import { ParentDashboard } from '@/components/screens/ParentDashboard';
import { GameSelectionScreen } from '@/components/screens/GameSelectionScreen';
import { GamePlayScreen } from '@/components/screens/GamePlayScreen';
import { GameResultScreen } from '@/components/screens/GameResultScreen';
import { ProgressScreen } from '@/components/screens/ProgressScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { ChildDashboard } from '@/components/screens/ChildDashboard';
import { ChildProfileScreen } from '@/components/screens/ChildProfileScreen';

const Index = () => {
  const { currentScreen } = useAppStore();

  const screens: Record<string, JSX.Element> = {
    'splash': <SplashScreen />,
    'welcome': <WelcomeScreen />,
    'about': <AboutScreen />,
    'register': <RegisterScreen />,
    'login': <LoginScreen />,
    'forgot-password': <ForgotPasswordScreen />,
    'create-child-profile': <CreateChildProfileScreen />,
    'survey': <SurveyScreen />,
    'loading-plan': <LoadingPlanScreen />,
    'plan-result': <PlanResultScreen />,
    'parent-dashboard': <ParentDashboard />,
    'game-selection': <GameSelectionScreen />,
    'game-play': <GamePlayScreen />,
    'game-result': <GameResultScreen />,
    'progress': <ProgressScreen />,
    'settings': <SettingsScreen />,
    'child-dashboard': <ChildDashboard />,
    'child-profile': <ChildProfileScreen />,
  };

  return screens[currentScreen] || <SplashScreen />;
};

export default Index;
