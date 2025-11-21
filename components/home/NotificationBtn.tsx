import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth_context';
import { io } from 'socket.io-client';
import useFetch from '@/hooks/useFetch';

export default function NotificationBtn() {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState(false);
    const { auth } = useAuth();
    const { data } = useFetch(`/notifications/?notifiable_id=${auth?.user?.id}&notifiable_type=user`)

    useEffect(() => {
        const socket = io('https://food-delivery-and-rides.onrender.com', {
            auth: {
                token: auth?.token
            }
        });

        socket.on('connect', () => {
            setIsOnline(true);
        });

        socket.on('disconnect', () => {
            setIsOnline(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <TouchableOpacity
            onPress={() => router.push({
                pathname: '/notifications',
                params: { notifications: JSON.stringify(data) }
            })}
            className="w-11 h-11 rounded-full bg-white/20 items-center justify-center mr-2 border border-white/30"
        >
            <FontAwesome name="bell" size={20} color="white" />
            <View className={`absolute -top-1 -right-1 w-5 h-5  rounded-full items-center justify-center border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
                <Text className="text-[10px] text-white font-bold">{data?.length}</Text>
            </View>
        </TouchableOpacity>
    )
}
