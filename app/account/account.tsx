import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AccountItem from '@/items/AccountItem';
import { Toast } from 'toastify-react-native';
import CustomHeader from '@/components/custom/customheader';
import BottomNavigation from '@/components/BottomNavigation';



const statsData = [
  { label: 'Total Orders', value: '47', icon: 'bag-outline' },
  { label: 'Total Rides', value: '23', icon: 'car-outline' },
  { label: 'Savings', value: '$89', icon: 'wallet-outline' },
];

const Account = () => {
  const { t , i18n } = useTranslation();


  const renderStat = (stat: typeof statsData[0], index: number) => (
    <View key={index} className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm">
      <View className="bg-blue-100 p-3 rounded-full w-12 h-12 items-center justify-center mb-3">
        <Ionicons name={stat.icon as any} size={20} color="#3b82f6" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</Text>
      <Text className="text-gray-600 text-sm">{stat.label}</Text>
    </View>
  );







  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'person-outline',
      type: 'navigation',
    },
    {
      id: '2',
      title: 'Payment Methods',
      icon: 'card-outline',
      type: 'navigation',
    },
    {
      id: '3',
      title: 'Order History',
      icon: 'time-outline',
      type: 'navigation',
    },
    {
      id: '4',
      title: 'Addresses',
      icon: 'location-outline',
      type: 'navigation',
    },
    {
      id: '5',
      title: 'Notifications',
      icon: 'notifications-outline',
      type: 'toggle',
      enabled: true,
    },
    {
      id: '6',
      title: 'Dark Mode',
      icon: 'moon-outline',
      type: 'toggle',
      enabled: false,
    },
    {
      id: '7',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      type: 'navigation',
    },
    {
      id: '8',
      title: 'Privacy Policy',
      icon: 'shield-outline',
      type: 'navigation',
    },
    {
      id: '9',
      title: 'Terms of Service',
      icon: 'document-text-outline',
      type: 'navigation',
    },
    {
      id: '10',
      title: t('account.switchLanguage'),
      icon: 'language-outline',
      type: 'navigation',
    },
  ];




const handle_switchLanguage = () => {
  // Logic to switch language
  try {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    Toast.show({
      type: 'success',
      text1: t('account.language_switched'),
      position: 'top',
      visibilityTime: 2000,
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: t('account.language_switch_failed'),
      position: 'top',
      visibilityTime: 2000,
    })
    
  }
}






  return (
  <View className='flex-1'>
      <CustomHeader title={t('account.myAccount')} />
      <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
    
      <View className="bg-gradient-to-r from-blue-500 to-purple-600 pt-12 pb-8 px-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-2xl font-bold">My Account</Text>
          <TouchableOpacity className="bg-white/20 p-2 rounded-full">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View className="flex-row items-center">
          <View className="relative">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white items-center justify-center">
              <View className="w-2 h-2 bg-white rounded-full" />
            </View>
          </View>

          <View className="ml-4 flex-1">
            <Text className="text-white text-xl font-bold">John Doe</Text>
            <Text className="text-white/80 text-base mb-1">john.doe@email.com</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="text-white/90 text-sm ml-1">4.9 rating</Text>
            </View>
          </View>

          <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-full">
            <Text className="text-white font-medium">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View className="px-4 -mt-6 mb-6">
        <View className="flex-row">
          {statsData.map(renderStat)}
        </View>
      </View>

      {/* Membership Card */}
      <View className="mx-4 mb-6">
        <View className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg font-bold mb-1">Gold Member</Text>
              <Text className="text-white/90 text-sm">Save 15% on all orders</Text>
            </View>
            <View className="bg-white/20 p-3 rounded-full">
              <Ionicons name="diamond-outline" size={24} color="white" />
            </View>
          </View>

          <View className="mt-4 pt-4 border-t border-white/20 flex-row justify-between">
            <Text className="text-white/80 text-sm">Points Balance</Text>
            <Text className="text-white font-bold">2,450 pts</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="mb-8">
        <Text className="text-gray-800 text-lg arabic-font mx-4 mb-4">{t('account.settings')}</Text>
        {/* {menuItems.map(AccountItem)} */}
        {/* {menuItems.map((item)=>(
          <AccountItem key={item.id} item={item} />
        ))} */}
        <AccountItem
          title={t("account.editProfile")}
          icon="person-outline"
          type="navigation"
        />
         <AccountItem
          title={t('account.switchLanguage')}
          icon="language"
          type="navigation"
          onPress={handle_switchLanguage}
        />
      </View>

      {/* Sign Out Button */}
      <View className="mx-4 mb-8">
        <TouchableOpacity className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white font-bold text-base ml-2">{t('account.logout')}</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View className="items-center mb-6">
        <Text className="text-gray-500 text-sm">App Version 1.0.0</Text>
      </View>
     
    </ScrollView>
     <BottomNavigation />
  </View>
  );
};

export default Account;