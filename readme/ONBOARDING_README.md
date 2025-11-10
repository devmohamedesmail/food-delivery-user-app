# Onboarding Feature Documentation

## Overview
A professional onboarding/intro screen with 4 slides that appears on the first launch of the application.

## Features

### ✨ Professional Design
- **4 Interactive Slides**: Each with custom icon, title, and description
- **Smooth Animations**: Animated pagination dots and slide transitions
- **Color Coded**: Each slide has its unique color scheme
- **Responsive Layout**: Adapts to different screen sizes

### 🎨 Slide Content

1. **Slide 1 - Food Delivery**
   - Icon: Restaurant
   - Color: Blue (#3b82f6)
   - Focus: Order from favorite restaurants

2. **Slide 2 - Ride Booking**
   - Icon: Car
   - Color: Purple (#8b5cf6)
   - Focus: Fast and reliable rides

3. **Slide 3 - Order Tracking**
   - Icon: Location
   - Color: Green (#10b981)
   - Focus: Real-time tracking

4. **Slide 4 - Security**
   - Icon: Shield
   - Color: Amber (#f59e0b)
   - Focus: Safe payments and 24/7 support

### 🎯 User Interactions

- **Skip Button**: Available on all slides except the last one
- **Next Button**: Advances to the next slide
- **Get Started Button**: Appears on the last slide to complete onboarding
- **Swipe Navigation**: Users can swipe left/right to navigate
- **Progress Indicator**: Shows current slide number (e.g., "1 / 4")
- **Animated Dots**: Visual pagination with smooth animations

## Technical Implementation

### Files Created/Modified

1. **`components/Into.tsx`**
   - Main onboarding component
   - Handles slide rendering and navigation
   - Manages AsyncStorage for first-time user detection

2. **`app/_layout.tsx`**
   - Modified to check onboarding status
   - Shows intro screen for first-time users
   - Redirects to login after completion

3. **`utilits/onboarding.ts`**
   - Helper functions for onboarding management
   - `resetOnboarding()`: Reset to show intro again (for testing)
   - `hasSeenOnboarding()`: Check if user has seen intro
   - `completeOnboarding()`: Mark intro as completed

4. **Translations**
   - `locales/en.json`: English translations
   - `locales/ar.json`: Arabic translations

## Usage

### For Development/Testing

To reset and see the onboarding screen again:

```typescript
import { resetOnboarding } from '@/utilits/onboarding';

// In your component or console
resetOnboarding();
// Then reload the app
```

### User Flow

1. **First Launch**:
   - App checks AsyncStorage for `hasSeenOnboarding`
   - If not found, shows intro screen
   - User navigates through 4 slides
   - Clicks "Get Started" on last slide
   - App saves `hasSeenOnboarding = true`
   - Redirects to login screen

2. **Subsequent Launches**:
   - App checks AsyncStorage
   - Finds `hasSeenOnboarding = true`
   - Skips intro, goes directly to main app

## Customization

### Adding/Removing Slides

Edit the `slides` array in `components/Into.tsx`:

```typescript
const slides: Slide[] = [
  {
    id: '1',
    title: t('onboarding.slide1Title'),
    description: t('onboarding.slide1Description'),
    icon: 'restaurant', // Any Ionicons name
    color: '#3b82f6', // Hex color
    gradient: ['#3b82f6', '#2563eb'], // Future use
  },
  // Add more slides...
];
```

### Changing Colors

Each slide has a `color` property that controls:
- Icon container background
- Progress dots color
- Next/Get Started button color

### Updating Content

Edit translations in:
- `locales/en.json` → `onboarding` section
- `locales/ar.json` → `onboarding` section

```json
{
  "onboarding": {
    "skip": "Skip",
    "next": "Next",
    "getStarted": "Get Started",
    "slide1Title": "Your Title Here",
    "slide1Description": "Your description here"
  }
}
```

## Dependencies

- `@react-native-async-storage/async-storage`: Store onboarding status
- `react-native-reanimated`: Smooth animations
- `@expo/vector-icons`: Icons for each slide
- `expo-router`: Navigation after onboarding
- `react-i18next`: Multilingual support

## Best Practices

1. **Keep Slides Concise**: 4 slides is optimal; don't overwhelm users
2. **Clear CTAs**: Make it easy to skip or continue
3. **Fast Loading**: All icons are vector-based, no image loading delays
4. **Accessibility**: High contrast colors, readable text sizes
5. **Bilingual**: Full RTL support for Arabic

## Troubleshooting

### Onboarding Not Showing
```typescript
// Check AsyncStorage value
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.getItem('hasSeenOnboarding').then(console.log);

// Reset it
import { resetOnboarding } from '@/utilits/onboarding';
resetOnboarding();
```

### Stuck on Onboarding
```typescript
// Manually mark as complete
import { completeOnboarding } from '@/utilits/onboarding';
completeOnboarding();
```

## Future Enhancements

- [ ] Video backgrounds for slides
- [ ] Interactive elements (tap to explore)
- [ ] Skip survey (why user skipped)
- [ ] A/B testing different slide orders
- [ ] Analytics tracking (which slide users drop off)
