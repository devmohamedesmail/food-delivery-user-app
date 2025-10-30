import React from 'react'
import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function AccountItem({ onPress, icon , type , title }:any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white mx-4 mb-2 p-4 rounded-xl flex-row items-center justify-between shadow-sm"
        >
            <View className="flex-row items-center flex-1">
                <View className="bg-gray-100 p-3 rounded-full mr-4">
                    <Ionicons name={icon} size={20} color="#374151" />
                    
                </View>
                <Text className="text-gray-800 font-medium arabic-font text-base">{title}</Text>
            </View>

            {type === 'toggle' ? (
                <Switch
                    
                    trackColor={{ false: '#d1d5db', true: '#10b981' }}
                    thumbColor="#ffffff"
                />
            ) : (
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            )}
        </TouchableOpacity>
    )
}
