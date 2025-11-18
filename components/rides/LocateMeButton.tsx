import React from 'react'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function LocateMeButton({ centerMapToMyLocation, loading }: { centerMapToMyLocation: () => void, loading: boolean }) {
    return (
        <SafeAreaView className="absolute right-4" style={{ top: height * 0.4 }}>
            <TouchableOpacity
                onPress={centerMapToMyLocation}
                className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    elevation: 5,
                }}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fd4a12" />
                ) : (
                    <Ionicons name="navigate" size={24} color="#fd4a12" />
                )}
            </TouchableOpacity>

            {/* Map Type Toggle */}
            <TouchableOpacity
                className="w-12 h-12 bg-white rounded-full items-center justify-center"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    elevation: 5,
                }}
            >
                <Ionicons name="layers-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
