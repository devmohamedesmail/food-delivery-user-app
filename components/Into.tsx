import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient: string[];
}

export default function Intro() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slides: Slide[] = [
    {
      id: '1',
      title: t('onboarding.slide1Title'),
      description: t('onboarding.slide1Description'),
      icon: 'restaurant',
      color: '#3b82f6',
      gradient: ['#3b82f6', '#2563eb'],
    },
    {
      id: '2',
      title: t('onboarding.slide2Title'),
      description: t('onboarding.slide2Description'),
      icon: 'car-sport',
      color: '#8b5cf6',
      gradient: ['#8b5cf6', '#7c3aed'],
    },
    {
      id: '3',
      title: t('onboarding.slide3Title'),
      description: t('onboarding.slide3Description'),
      icon: 'location',
      color: '#10b981',
      gradient: ['#10b981', '#059669'],
    },
    {
      id: '4',
      title: t('onboarding.slide4Title'),
      description: t('onboarding.slide4Description'),
      icon: 'shield-checkmark',
      color: '#f59e0b',
      gradient: ['#f59e0b', '#d97706'],
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      router.replace('/auth/login');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item, index }: { item: Slide; index: number }) => (
    <View
      style={{ width }}
      className="flex-1 items-center justify-center px-8"
    >
      {/* Icon Container */}
      <View
        className="mb-12 items-center justify-center"
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: `${item.color}15`,
        }}
      >
        <View
          className="items-center justify-center"
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: `${item.color}30`,
          }}
        >
          <Ionicons name={item.icon} size={80} color={item.color} />
        </View>
      </View>

      {/* Content */}
      <View className="items-center">
        <Text
          className={`text-3xl font-bold text-gray-900 mb-4 ${
            i18n.language === 'ar' ? 'arabic-font text-right' : 'text-center'
          }`}
          style={{ maxWidth: width - 80 }}
        >
          {item.title}
        </Text>
        <Text
          className={`text-lg text-gray-600 leading-7 ${
            i18n.language === 'ar' ? 'arabic-font text-right' : 'text-center'
          }`}
          style={{ maxWidth: width - 100 }}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Skip Button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity
          onPress={handleSkip}
          className="absolute top-12 right-6 z-10 bg-gray-100 px-4 py-2 rounded-full"
          style={{ elevation: 2 }}
        >
          <Text className="text-gray-700 font-semibold">
            {t('onboarding.skip')}
          </Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {/* Bottom Section */}
      <View className="pb-12 px-8">
        {/* Pagination Dots */}
        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                className="h-2 rounded-full mx-1"
                style={{
                  width: dotWidth,
                  opacity,
                  backgroundColor: slides[currentIndex].color,
                }}
              />
            );
          })}
        </View>

        {/* Next/Get Started Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="rounded-2xl py-4 shadow-lg"
          style={{
            backgroundColor: slides[currentIndex].color,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white text-lg font-bold mr-2">
              {currentIndex === slides.length - 1
                ? t('onboarding.getStarted')
                : t('onboarding.next')}
            </Text>
            <Ionicons
              name={
                currentIndex === slides.length - 1
                  ? 'checkmark-circle'
                  : 'arrow-forward'
              }
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>

        {/* Progress Text */}
        <Text className="text-center text-gray-400 mt-4 text-sm">
          {currentIndex + 1} / {slides.length}
        </Text>
      </View>
    </View>
  );
}
