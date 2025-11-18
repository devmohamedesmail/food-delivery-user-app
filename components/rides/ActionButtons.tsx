import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { config } from '@/constants/config';
import { useRouter } from 'expo-router';

interface Props {
    origin: any;
    destination: any;
    loading: boolean;
    getDirections: () => void;
    selectedVehicle: any;
    distanceValue: number;
    calculatePrice: (vehicle: any) => string;
    distance: string | null;
}

export default function ActionButtons({
    origin,
    destination,
    loading,
    getDirections,
    selectedVehicle,
    distanceValue,
    calculatePrice,
    distance,
}: Props) {
    const { t } = useTranslation();
    const router = useRouter()

    return (

        <>


            <TouchableOpacity
                onPress={getDirections}
                disabled={(!origin || !destination || loading)}
                className={`rounded-2xl py-4 mb-4 flex-row items-center justify-center ${origin && destination && !loading ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons name="car-sport" size={24} color="white" />
                        <Text className="text-white font-bold text-lg ml-2">
                            {distance ? t('rides.updateRoute') : t('rides.findRoute')}
                        </Text>
                    </>
                )}
            </TouchableOpacity>


            {selectedVehicle && distanceValue > 0 && (
                <TouchableOpacity
                    onPress={()=>router.push('/rides/book')}
                    className="rounded-2xl py-4 mb-6 flex-row items-center justify-center"
                    style={{
                        backgroundColor: '#fd4a12',
                        shadowColor: '#fd4a12',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                    <Text className="text-white font-bold text-lg ml-2">
                        {t('rides.confirmBooking')} - {config.CurrencySymbol} {calculatePrice(selectedVehicle)}
                    </Text>
                </TouchableOpacity>
            )}
        </>
    )
}
