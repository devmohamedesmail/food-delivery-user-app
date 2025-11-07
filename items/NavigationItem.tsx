import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'

interface NavigationItemProps {
    icon: React.ReactElement;
    label: string;
    onPress: () => void;
    isActive?: boolean;
}

export default function NavigationItem({ icon, label, onPress, isActive = false }: NavigationItemProps) {
    const iconColor = isActive ? 'red' : '#6b7280';
    
    // Animation values
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const iconScale = useRef(new Animated.Value(1)).current;
    
    useEffect(() => {
        if (isActive) {
            // Animate when active
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1.1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: -4,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(iconScale, {
                    toValue: 1.15,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            // Reset animation
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: 0,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(iconScale, {
                    toValue: 1,
                    friction: 3,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [isActive]);

    const handlePress = () => {
        // Haptic-like animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: isActive ? 1.1 : 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
        
        onPress();
    };
    
    return (
        <TouchableOpacity 
            onPress={handlePress}
            activeOpacity={0.7}
            className='flex-1'
        >
            <Animated.View 
                className='flex items-center px-2 py-1'
                style={{
                    transform: [
                        { scale: scaleAnim },
                        { translateY: translateY }
                    ]
                }}
            >
                <Animated.View 
                    className={`mb-1 ${isActive ? 'bg-green-50' : ''} rounded-full p-2`}
                    style={{
                        transform: [{ scale: iconScale }]
                    }}
                >
                    {React.cloneElement(icon, { 
                        color: iconColor
                    } as any)}
                </Animated.View>
                <Text 
                    className={`text-xs font-medium arabic-font ${
                        isActive ? 'text-primary' : 'text-gray-500'
                    }`}
                    numberOfLines={1}
                >
                    {label}
                </Text>
                {isActive && (
                    <Animated.View 
                        className='w-1.5 h-1.5 bg-green-600 rounded-full mt-1'
                        style={{
                            opacity: scaleAnim
                        }}
                    />
                )}
            </Animated.View>
        </TouchableOpacity>
    )
}
