import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { searchPlaces } from '@/services/google';
import SearchPlaceInput from './SearchPlaceInput';
import { getMyLocation } from '@/services/location';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



interface PlaceResult {
    description: string;
    place_id: string;
}

export default function DestinationInput({ destinationInput, setDestinationInput, loading, getPlaceDetails }: any) {
    const { t, i18n } = useTranslation();
    const [placesSuggestion, setPlacesSuggestion] = useState<PlaceResult[]>([]);
    const [showPlacesSuggestions, setShowPlacesSuggestions] = useState(false);

    const handleSearchPlaces = async (text: string) => {
        setDestinationInput(text);
        const results = await searchPlaces(text);
        setPlacesSuggestion(Array.isArray(results) ? results : []);
        setShowPlacesSuggestions(true);
    }

    return (
        <View className="mb-4">
            {/* <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
                <View className="bg-red-500 w-3 h-3 rounded-full mr-3" />
                <View className="flex-1">
                    <Text className={`text-black text-xs mb-1 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                        {t('rides.destination')}
                    </Text>
                    <TextInput
                        value={destinationInput}
                        onChangeText={(text) => {
                            setDestinationInput(text);
                            searchPlaces(text, false);
                            setShowDestinationSuggestions(true);
                        }}
                        placeholder={t('rides.enterDestination')}
                        className="text-gray-900 font-medium"
                    />
                </View>
                <TouchableOpacity className="p-2">
                    <Ionicons name="bookmark-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
            </View> */}

            <SearchPlaceInput
                value={destinationInput}
                onChangeText={(text: string) => {
                    setDestinationInput(text);
                    handleSearchPlaces(text);
                    setShowPlacesSuggestions(true);
                }}
                onPress={getMyLocation}
                loading={loading}
                label={t('rides.pickupLocation')}
                placeholder={t('rides.enterPickupLocation')}
                icon={<MaterialIcons name="transfer-within-a-station" size={24} color="black" />}

            />
            {/* Destination Suggestions */}
            {showPlacesSuggestions && placesSuggestion.length > 0 && (
                <View className="bg-white mt-2 rounded-xl border border-gray-200 max-h-48">
                    <ScrollView>
                        {placesSuggestion.map((suggestion, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    getPlaceDetails(suggestion.place_id, false)
                                    setShowPlacesSuggestions(false);
                                }}
                                className="p-3 py-4 border-b border-gray-200"
                            >
                                <View className="flex-row items-center ">
                                    <Ionicons name="location-outline" size={20} color="red" />
                                    <Text className="text-black ml-3 flex-1" numberOfLines={1}>
                                        {suggestion.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}
