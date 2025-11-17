import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { View, Text } from '../Themed';
import { useAuth } from '@/context/auth_context';

export default function Online() {
    const [isOnline, setIsOnline] = useState(false);
    const { auth } = useAuth();



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
        <View>
            <Text>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
    );
}
