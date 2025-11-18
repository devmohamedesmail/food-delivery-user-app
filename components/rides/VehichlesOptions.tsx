import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { config } from '@/constants/config';

interface Vehicle {
    id: string | number;
    name: string;
    type: string;
    capacity: number;
    image: string;
    price_per_km: number | string;
}

interface Props {
    vehiclesData: Vehicle[];
    distanceValue: number;
    selectedVehicle: Vehicle | null;
    onSelectVehicle: (vehicle: Vehicle) => void;
    calculatePrice: (vehicle: Vehicle) => string;
}

export default function VehichlesOptions({ vehiclesData, distanceValue, selectedVehicle, onSelectVehicle, calculatePrice }: Props) {
    const { t } = useTranslation();

    if (!vehiclesData || vehiclesData.length === 0 || distanceValue <= 0) return null;
    return (
        <View className="mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-3">
                {t('rides.selectVehicle')}
            </Text>

            {vehiclesData.map((vehicle) => {
                const price = calculatePrice(vehicle);
                const isSelected = selectedVehicle?.id === vehicle.id;

                return (
                    <TouchableOpacity
                        key={vehicle.id}
                        onPress={() => onSelectVehicle(vehicle)}
                        className={`mb-3 rounded-2xl p-4 ${isSelected
                            ? 'bg-orange-50 border-2 border-orange-500'
                            : 'bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <View className="flex-row items-center mb-1">
                                    {/* <Ionicons
                                        name="car-sport"
                                        size={24}
                                        color={isSelected ? '#fd4a12' : '#6B7280'}
                                    />  */}
                                    <Image
                                        source={{uri: vehicle.image}}
                                        style={{ width: 80, height: 50 }}
                                    />
                                    <Text className={`ml-2 text-lg font-bold ${isSelected ? 'text-orange-900' : 'text-gray-900'}`}>
                                        {vehicle.name}
                                    </Text>
                                </View>
                                {/* <Text
                                    className={`text-sm ${isSelected ? 'text-orange-600' : 'text-gray-500'}`}
                                >
                                    {vehicle.type} • {vehicle.capacity} {t('rides.seats')}
                                </Text> */}


                                {/* <Text
                                    className={`text-xs mt-1 ${isSelected ? 'text-orange-500' : 'text-gray-400'}`}
                                >
                                    {config.CurrencySymbol} {vehicle.price_per_km}/km
                                </Text> */}
                            </View>

                            <View className="items-end">
                                <Text
                                    className={`text-2xl font-bold ${isSelected ? 'text-orange-600' : 'text-gray-900'
                                        }`}
                                >
                                    {config.CurrencySymbol} {price}
                                </Text>
                                <Text
                                    className={`text-xs ${isSelected ? 'text-orange-500' : 'text-gray-500'}`}
                                >
                                    {t('rides.estimated')}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}
