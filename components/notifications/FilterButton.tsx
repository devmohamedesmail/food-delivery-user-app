import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function FilterButton({ title, value, count , filter, setFilter }: { title: string; value: typeof filter; count?: number; filter: string; setFilter: any }) {
    return (
        <TouchableOpacity
            onPress={() => setFilter(value)}
            className={`px-4 py-2.5 rounded-lg mr-3 border ${filter === value
                ? 'bg-primary border-primary shadow-sm'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
            activeOpacity={0.7}
        >
            <View className="flex-row items-center">
                <Text className={`font-medium text-sm ${filter === value
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                    }`}>
                    {title}
                </Text>
                {count && count > 0 && (
                    <View className="ml-2 bg-red-500 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
                        <Text className="text-white text-xs font-semibold">
                            {count > 99 ? '99+' : count}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}
