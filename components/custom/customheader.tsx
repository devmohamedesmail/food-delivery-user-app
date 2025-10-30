import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  backgroundColor?: string;
  textColor?: string;
  rightComponent?: React.ReactNode;
  subtitle?: string;
  gradient?: boolean;
  gradientColors?: [string, string, ...string[]];
}

export default function CustomHeader({
  title,
  onBackPress,
  showBackButton = true,
  backgroundColor = '#ffffff',
  textColor = '#1F2937',
  rightComponent,
  subtitle,
  gradient = false,
  gradientColors = ['#3B82F6', '#1D4ED8', '#7C3AED'] as [string, string, ...string[]]
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      console.warn('CustomHeader: No onBackPress function provided. Please provide onBackPress prop when using showBackButton=true');
    }
  };

  const HeaderContent = () => (
    <Animated.View
      className="flex-row items-center justify-between px-4 pb-4"
      style={{
        paddingTop: insets.top + 12,
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: scaleAnim }
        ],
      }}
    >
      {/* Left Section - Back Button */}
      <View className="flex-row items-center flex-1">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            className="mr-4 p-2 rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={gradient ? '#ffffff' : textColor} 
            />
          </TouchableOpacity>
        )}

        {/* Title Section */}
        <View className="flex-1">
          <Animated.Text
            className="text-xl arabic-font"
            style={{
              color: gradient ? '#ffffff' : textColor,
              fontFamily: 'Cairo_700Bold',
            }}
            numberOfLines={1}
          >
            {title}
          </Animated.Text>
          
          {subtitle && (
            <Animated.Text
              className="text-sm opacity-80 mt-1"
              style={{
                color: gradient ? '#ffffff' : textColor,
                fontFamily: 'Cairo_400Regular',
                opacity: 0.7,
              }}
              numberOfLines={1}
            >
              {subtitle}
            </Animated.Text>
          )}
        </View>
      </View>

      {/* Right Section - Custom Component */}
      {rightComponent && (
        <View className="ml-4">
          {rightComponent}
        </View>
      )}
    </Animated.View>
  );

  return (
    <>
      {/* Status Bar */}
      <StatusBar 
        barStyle={gradient ? "light-content" : "dark-content"} 
        backgroundColor={gradient ? gradientColors[0] : backgroundColor}
        translucent={Platform.OS === 'android'}
      />

      {/* Header Container */}
      {gradient ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Decorative Elements */}
          <View className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
          <View className="absolute top-8 left-0 w-20 h-20 rounded-full bg-white/5 -translate-x-10" />
          
          <HeaderContent />
        </LinearGradient>
      ) : (
        <View
          style={{
            backgroundColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <HeaderContent />
        </View>
      )}

      {/* Bottom Border Line */}
      {!gradient && (
        <View className="h-px bg-gray-200" />
      )}
    </>
  );
}
