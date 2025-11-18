import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { searchPlaces } from '@/services/google';
import { config } from '@/constants/config';
import Colors from '@/constants/Colors';
import SearchPlaceInput from './SearchPlaceInput';

interface PlaceResult {
    description: string;
    place_id: string;
}

export default function OriginInput({
    originInput,
    setOriginInput,
    getMyLocation,
    loading,
    getPlaceDetails,
}: any) {

    const { t, i18n } = useTranslation();
    const [placesSuggestion, setPlacesSuggestion] = useState<PlaceResult[]>([]);
    const [showPlacesSuggestions, setShowPlacesSuggestions] = useState(false);

    const handleSearchPlaces = async (text: string) => {
        setOriginInput(text);
        const results = await searchPlaces(text);
        // setPlacesSuggestion(results);
        setPlacesSuggestion(Array.isArray(results) ? results : []);
        setShowPlacesSuggestions(true);
    }

    return (
        <View className="mb-4">
            <SearchPlaceInput
                value={originInput}
                onChangeText={(text:string) => {
                    setOriginInput(text);
                    handleSearchPlaces(text);
                    setShowPlacesSuggestions(true);
                }}
                onPress={getMyLocation}
                loading={loading}
                label={t('rides.pickupLocation')}
                placeholder={t('rides.enterPickupLocation')}
                icon={<FontAwesome6 name="location-dot" size={24} color="red" />}

            />
            {/* <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
                <View className="bg-green-500 w-3 h-3 rounded-full mr-3" />
                <View className="flex-1">
                    <Text className={`text-black text-xs mb-1 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                        {t('rides.pickupLocation')}
                    </Text>
                    <TextInput
                        value={originInput}
                        onChangeText={(text) => {
                            setOriginInput(text);
                            handleSearchPlaces(text);
                            setShowPlacesSuggestions(true);
                        }}
                        placeholder={t('rides.enterPickupLocation')}
                        className="text-black text-right font-medium"
                        cursorColor={Colors.light.tabIconSelected}
                    />
                </View>
                <TouchableOpacity
                    onPress={getMyLocation}
                    className="bg-green-100 p-2 rounded-full ml-2"
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#10B981" />
                    ) : (
                        <FontAwesome6 name="location-dot" size={24} color="red" />
                    )}
                </TouchableOpacity>
            </View> */}

            {/* Origin Suggestions */}
            {showPlacesSuggestions && placesSuggestion.length > 0 && (
                <View className="bg-white mt-2 rounded-xl border border-gray-200 max-h-48">
                    <ScrollView>
                        {placesSuggestion.map((suggestion, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    getPlaceDetails(suggestion.place_id, true)
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
