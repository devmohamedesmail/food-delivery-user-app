import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth_context';
import { useAppSelector, selectCartTotalItems } from '@/store/hooks';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getCurrentLocation } from '@/services/google';

export default function Header() {
    const { t } = useTranslation();
    const router = useRouter();
    const { auth } = useAuth();
    const totalItems = useAppSelector(selectCartTotalItems);
    const [location, setLocation] = React.useState<string>('');
    const [loadingLocation, setLoadingLocation] = React.useState(false);



     useEffect(() => {
        fetchLocation();
      }, []);
    
    
      const fetchLocation = async () => {
        setLoadingLocation(true);
        const locationName = await getCurrentLocation();
        setLocation(locationName);
        setLoadingLocation(false);
      };
      
  return (
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
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1">
            <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3 border-2 border-white/30">
              <Text className="text-2xl">👋</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white/80 text-sm arabic-font mb-1">
                {t('home.welcome')}
              </Text>
              <Text className="text-white text-lg font-bold arabic-font-bold">
                {auth?.user?.name || auth?.name || t('home.guest')}
              </Text>
            </View>
          </View>


          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.push('/notifications')}
              className="w-11 h-11 rounded-full bg-white/20 items-center justify-center mr-2 border border-white/30"
            >
              <FontAwesome name="bell" size={20} color="white" />
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                <Text className="text-[10px] text-white font-bold">3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/cart/cart')}
              className="w-11 h-11 rounded-full bg-white/20 items-center justify-center border border-white/30"
            >
              <Ionicons name="bag" size={22} color="white" />
              {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                  <Text className="text-[10px] text-white font-bold">{totalItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={getCurrentLocation}
          className="bg-white/20 rounded-full px-4 py-2 w-28 flex-row items-center border border-white/30"
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={16} color="white" />
          {loadingLocation ? (
            <ActivityIndicator size="small" color="white" className="ml-2" />
          ) : (
            <Text className="text-white text-sm font-medium ml-2 arabic-font" numberOfLines={1}>
              {location || t('home.fetching_location')}
            </Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
  )
}
