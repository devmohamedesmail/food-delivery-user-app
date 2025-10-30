import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


export default function NavigationItem({ icon, label, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className='flex items-center'>
                {icon}
                <Text className='text-sm arabic-font'>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}
