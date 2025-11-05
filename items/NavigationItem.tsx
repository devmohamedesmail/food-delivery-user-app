import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface NavigationItemProps {
    icon: React.ReactElement;
    label: string;
    onPress: () => void;
    isActive?: boolean;
}

export default function NavigationItem({ icon, label, onPress, isActive = false }: NavigationItemProps) {
    const iconColor = isActive ? '#3b82f6' : '#6b7280';
    
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7}
            className='flex-1'
        >
            <View className='flex items-center px-2 py-1'>
                <View className={`mb-1 ${isActive ? 'bg-blue-50' : ''} rounded-full p-2`}>
                    {React.cloneElement(icon, { 
                        color: iconColor
                    } as any)}
                </View>
                <Text 
                    className={`text-xs font-medium arabic-font ${
                        isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}
                    numberOfLines={1}
                >
                    {label}
                </Text>
                {isActive && (
                    <View className='w-1 h-1 bg-blue-600 rounded-full mt-1' />
                )}
            </View>
        </TouchableOpacity>
    )
}
