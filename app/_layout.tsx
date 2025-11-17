import 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useFonts as useGoogleFonts, Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/components/useColorScheme';
import { ReduxProvider } from '../store/ReduxProvider';
import '../global.css';
import '../lib/i18n'
import ToastManager from 'toastify-react-native';
import AuthProvider from '@/context/auth_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from '@/components/common/Into';
import { View, ActivityIndicator } from 'react-native';
import { SocketProvider } from '@/context/SocketContext';
import OrderStatusListener from '@/components/common/OrderStatusListener';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [expoFontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [googleFontsLoaded] = useGoogleFonts({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  const allFontsLoaded = expoFontsLoaded && googleFontsLoaded;
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (allFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [allFontsLoaded]);

  // Check if user has seen onboarding
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasSeenOnboarding(false);
    }
  };

  if (!allFontsLoaded || hasSeenOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Show intro if user hasn't seen it
  if (!hasSeenOnboarding) {
    return <Intro />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SocketProvider storeId={5}>
        <ReduxProvider>
          <SafeAreaProvider>
            <OrderStatusListener />
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                 <Stack.Screen name="index" options={{ headerShown: false }} />
                 <Stack.Screen name="+not-found" options={{ headerShown: false }} />
              </Stack>
              <ToastManager />
            </ThemeProvider>
          </SafeAreaProvider>
        </ReduxProvider>
        </SocketProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
