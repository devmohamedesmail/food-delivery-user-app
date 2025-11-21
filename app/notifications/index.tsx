import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '@/components/common/BottomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EmptyNotification from '@/components/notifications/EmptyNotification';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';




export default function Notifications() {
    const { notifications } = useLocalSearchParams();
    const parsedNotifications = notifications ? JSON.parse(notifications) : [];
  const router = useRouter();


    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black"
            edges={['bottom']}
        >
            {/* Header */}
            <View className='bg-black/90 pt-16 pb-5 px-5'>
                <TouchableOpacity onPress={()=>router.back()} className='bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center'>
                    <Ionicons name="arrow-back" size={24} color="black" /> 
                </TouchableOpacity>
            </View>




            {/* Notifications List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
            >
                {parsedNotifications.length === 0 ? <EmptyNotification /> : (
                    <>
                        {parsedNotifications.map((item: any) => (
                            <TouchableOpacity key={item.id} className='shadow-sm border-b-gray-300 mb-2 p-3 rounded-md py-5'>
                                <View className='flex flex-row justify-end items-center'>
                                    <View className='flex-1 items-end mr-4'>
                                    <Text>{item.title}</Text>
                                    <Text>{item.message}</Text>
                                </View>
                                <View className='bg-gray-300 rounded-full p-3'>
                                    <MaterialCommunityIcons name="bell" size={24} color="green" />
                                </View>
                                </View>
                            </TouchableOpacity>
                        ))}


                    </>
                )}
            </ScrollView>
            <BottomNavigation />
        </SafeAreaView>
    );
}
