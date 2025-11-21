import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function EmptyNotification() {
  return (
    <View className="flex-1 items-center justify-center py-20">
                        <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
                            <Ionicons name="notifications-off-outline" size={40} color="#9CA3AF" />
                        </View>
                        <Text className="text-gray-900 dark:text-white text-lg font-semibold mb-2">
                            No notifications
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-center px-8 leading-5">
                            
                            You don't have any notifications yet
                            No  notifications available

                        </Text>
                    </View>
  )
}
