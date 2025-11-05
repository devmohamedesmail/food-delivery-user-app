import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Reset onboarding status - useful for testing
 * Call this to show the intro again
 */
export const resetOnboarding = async () => {
  try {
    await AsyncStorage.removeItem('hasSeenOnboarding');
    console.log('Onboarding reset successfully');
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};

/**
 * Check if user has seen onboarding
 */
export const hasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem('hasSeenOnboarding');
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Mark onboarding as completed
 */
export const completeOnboarding = async () => {
  try {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    console.log('Onboarding marked as complete');
  } catch (error) {
    console.error('Error completing onboarding:', error);
  }
};
