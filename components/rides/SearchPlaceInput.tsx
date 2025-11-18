import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import Colors from '@/constants/Colors';

export default function SearchPlaceInput({ value, onChangeText, onPress, loading, label,placeholder , icon }: any) {
    const { t, i18n } = useTranslation();
    const [onFocus, setOnFocus] = useState(false);

    return (
        <View className={`bg-gray-50 rounded-2xl p-4 flex-row items-center ${onFocus ? 'border border-primary' : ''}`}>

            <View className="flex-1">
                <Text className={`text-black text-xs mb-1 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                    {label}
                </Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    className="text-black text-right font-medium"
                    cursorColor={Colors.light.tabIconSelected}
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                />
            </View>
            <TouchableOpacity
                onPress={onPress}
                className="bg-green-100 p-2 rounded-full ml-2"
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#10B981" />
                ) : (icon)}
            </TouchableOpacity>
        </View>
    )
}
