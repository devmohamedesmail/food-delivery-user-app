import React from 'react'
import { View, TouchableOpacity,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  distance?: string;
  duration?: string;
}

export default function Header() {
      const router = useRouter();
      const { t } = useTranslation();
    
    return (
     <SafeAreaView className="absolute top-0 left-0 right-0"
          edges={["bottom"]}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="pb-4"
          >
            <View className="px-4 pt-10">
              <View className="flex-row items-center justify-between">
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-12 h-12 bg-white rounded-2xl items-center justify-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                {/* Title */}
                <View className="flex-1 mx-4">
                  <Text className="text-xl font-bold text-gray-900 text-center arabic-font">
                    {t('rides.bookARide')}
                  </Text>
                  {/* {distance && (
                    <Text className="text-xs text-gray-600 text-center mt-1">
                      {distance} • {duration}
                    </Text>
                  )} */}
                </View>

                {/* Menu Button */}
                <TouchableOpacity
                  className="w-12 h-12 bg-white rounded-2xl items-center justify-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="menu" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>
  )
}
