import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { Toast } from 'toastify-react-native';
import useFetch from '@/hooks/useFetch';
import { config } from '@/constants/config';

export default function Copouns() {
    const { t , i18n } = useTranslation();
    const {data , loading, error} = useFetch('/coupons')
    const [copiedId, setCopiedId] = useState<number | null>(null);

  const getCouponColor = (index: number) => {
    const colors = ['#fd4a12', '#4ECDC4', '#FFB347', '#FF6B9D', '#95E1D3'];
    return colors[index % colors.length];
  };

  const getCouponIcon = (type: string) => {
    if (type === 'percentage') return '🎫';
    if (type === 'fixed') return '💰';
    return '�';
  };

  const formatDiscount = (coupon: any) => {
    if (coupon.discount_type === 'percentage') {
      return `${coupon.discount_value}% OFF`;
    }
    return ` ${config.CurrencySymbol} ${coupon.discount_value} OFF`;
  };

  const handleCopyCoupon = async (code: string, id: number) => {
    await Clipboard.setStringAsync(code);
    setCopiedId(id);
    
    Toast.success(`🎉 Coupon "${code}" copied!`);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (loading || !data || data.length === 0) return null;

  return (
     <View className='px-5 mb-6'>
          
            <Text className={`text-xl font-bold mb-2 text-right text-black ${i18n.language === 'ar' ? 'text-right' : ''}`}>
              {t('home.availableCoupons') }
            </Text>
         

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((coupon: any, index: number) => {
              const color = getCouponColor(index);
              const isCopied = copiedId === coupon.id;
              
              return (
                <TouchableOpacity
                  key={coupon.id}
                  activeOpacity={0.8}
                  className='mr-4'
                  style={{ width: 280 }}
                >
                  <LinearGradient
                    colors={[color, color + 'CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className='rounded-2xl p-5 relative overflow-hidden'
                    style={{
                      shadowColor: color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 5,
                    }}
                  >
                    {/* Background Pattern */}
                    <View className='absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-10' />
                    <View className='absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10' />
                    
                    {/* Celebration effect when copied */}
                    {isCopied && (
                      <View className='absolute inset-0 items-center justify-center'>
                        <Text className='text-6xl'>🎉</Text>
                      </View>
                    )}
                    
                    <View className='flex-row items-center justify-between mb-3'>
                      <View className='flex-row items-center'>
                        <View className='w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3 border border-white/30'>
                          <Text className='text-2xl'>{getCouponIcon(coupon.discount_type)}</Text>
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
                        {formatDiscount(coupon)}
                      </Text>
                      <Text className='text-white/90 text-sm arabic-font' numberOfLines={2}>
                        {coupon.description}
                      </Text>
                      {coupon.min_order_amount && parseFloat(coupon.min_order_amount) > 0 && (
                        <Text className='text-white/70 text-xs mt-1 arabic-font'>
                          {t('home.minOrder')} {config.CurrencySymbol} {coupon.min_order_amount}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity 
                      className='bg-white rounded-full py-2.5 items-center'
                      onPress={() => handleCopyCoupon(coupon.code, coupon.id)}
                    >
                      <Text className='font-bold text-sm arabic-font' style={{ color: color }}>
                        {isCopied ? '✓ Copied!' : t('home.copyCode') || 'Copy Code'}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
  )
}
