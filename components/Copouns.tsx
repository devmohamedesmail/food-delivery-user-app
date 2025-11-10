import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Copouns() {
    const { t , i18n } = useTranslation();

  const coupons = [
    {
      id: 1,
      code: 'FIRST50',
      discount: '50% OFF',
      description: t('home.firstOrderCoupon') || 'First order discount',
      color: '#fd4a12',
      icon: '🎫',
    },
    {
      id: 2,
      code: 'FREE20',
      discount: 'FREE DELIVERY',
      description: t('home.ordersAbove20') || 'On orders above $20',
      color: '#4ECDC4',
      icon: '🚚',
    },
    {
      id: 3,
      code: 'WEEKEND30',
      discount: '30% OFF',
      description: t('home.weekendSpecial') || 'Weekend special offer',
      color: '#FFB347',
      icon: '🎉',
    },
  ];

  return (
     <View className='px-5 mb-6'>
          
            <Text className={`text-xl font-bold mb-2 text-right text-black ${i18n.language === 'ar' ? 'text-right' : ''}`}>
              {t('home.availableCoupons') }
            </Text>
         

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {coupons.map((coupon, index) => (
              <TouchableOpacity
                key={coupon.id}
                activeOpacity={0.8}
                className='mr-4'
                style={{ width: 280 }}
              >
                <LinearGradient
                  colors={[coupon.color, coupon.color + 'CC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className='rounded-2xl p-5 relative overflow-hidden'
                  style={{
                    shadowColor: coupon.color,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}
                >
                  {/* Background Pattern */}
                  <View className='absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-10' />
                  <View className='absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10' />
                  
                  <View className='flex-row items-center justify-between mb-3'>
                    <View className='flex-row items-center'>
                      <View className='w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3 border border-white/30'>
                        <Text className='text-2xl'>{coupon.icon}</Text>
                      </View>
                      <View>
                        <Text className='text-white/80 text-xs mb-1 arabic-font'>
                          {t('home.couponCode')}
                        </Text>
                        <Text className='text-white text-lg font-bold arabic-font-bold'>
                          {coupon.code}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className='border-t border-white/30 border-dashed pt-3 mb-3'>
                    <Text className='text-white text-2xl font-bold mb-1'>
                      {coupon.discount}
                    </Text>
                    <Text className='text-white/90 text-sm arabic-font'>
                      {coupon.description}
                    </Text>
                  </View>

                  <TouchableOpacity className='bg-white rounded-full py-2.5 items-center'>
                    <Text className='font-bold text-sm arabic-font' style={{ color: coupon.color }}>
                      {t('home.copyCode') || 'Copy Code'}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
  )
}
