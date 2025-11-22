import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '@/components/common/BottomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'i18next';
import { useLocalSearchParams, useRouter } from 'expo-router';
import EmptyNotification from '@/components/notifications/EmptyNotification';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';




export default function Notifications() {
    const { notifications } = useLocalSearchParams();
    const parsedNotifications = notifications ? JSON.parse(notifications as string) : [];
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black"
            edges={['bottom']}
        >
            {/* Header */}
            <LinearGradient
                colors={['#fd4a12', '#FF6A3D', '#FFC24A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-6 py-6 pt-14 pb-8 rounded-b-[32px]"
                style={{
                    shadowColor: '#fd4a12',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                }}
            >

                <View className=' pb-5 px-5 flex flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => router.back()} className='bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center'>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    <Text className='text-white font-extrabold text-xl'>{t('notifications.title')}</Text>
                </View>


            </LinearGradient>





            {/* Notifications List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
            >
                {parsedNotifications.length === 0 ? <EmptyNotification /> : (
                    <>
                        {parsedNotifications.map((item: any) => (
                            <TouchableOpacity key={item.id} className=' border-b-gray-200 border-b mb-2 p-3 rounded-md py-5'>
                                <View className='flex flex-row justify-end items-center'>
                                    <View className='flex-1 items-end mr-4'>
                                        <Text>{item.title}</Text>
                                        <Text>{item.message}</Text>
                                    </View>
                                    <View className='bg-gray-300 rounded-full p-3'>
                                        <MaterialCommunityIcons name="bell" size={15} color={item.is_read ? "green" : "gray"} />
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
