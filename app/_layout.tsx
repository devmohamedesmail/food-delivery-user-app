import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useFonts as useGoogleFonts, Cairo_400Regular, Cairo_600SemiBold, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import { ReduxProvider } from '../store/ReduxProvider';
import '../global.css';
import '../i18n'; // Initialize i18n
import ToastManager from 'toastify-react-native'
import AuthProvider from '@/context/auth_context';
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


  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
 useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (allFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [allFontsLoaded]);

  if (!allFontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
       <ReduxProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              {/* Main App Screens */}
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="auth/login" options={{ headerShown: false }} />
              <Stack.Screen name="account/account" options={{ headerShown: false }} />
              <Stack.Screen name="rides/rides" options={{ headerShown: false }} />
              <Stack.Screen name="notifications/notifications" options={{ headerShown: false }} />
              <Stack.Screen name="cart/cart" options={{ headerShown: false }} />
              <Stack.Screen name="wishlist/wishlist" options={{ headerShown: false }} />
              <Stack.Screen name="order/order" options={{ headerShown: false }} />

              {/* Restaurant Screens */}
              <Stack.Screen name="restaurants/restaurants" options={{ headerShown: false }} />
              <Stack.Screen name="restaurants/menu" options={{ headerShown: false }} />
              
              {/* Fallback */}
              <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            </Stack>
            <ToastManager />
          </ThemeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ReduxProvider>
    </AuthProvider>
   
  );
}
