import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const isRTL = i18n.language === 'ar'

  const sections = [
    {
      icon: 'information-circle-outline',
      title: t('privacy.introduction'),
      content: t('privacy.introText'),
      color: '#3b82f6'
    },
    {
      icon: 'document-text-outline',
      title: t('privacy.infoCollect'),
      content: t('privacy.infoCollectText'),
      color: '#8b5cf6'
    },
    {
      icon: 'settings-outline',
      title: t('privacy.howWeUse'),
      content: t('privacy.howWeUseText'),
      color: '#10b981'
    },
    {
      icon: 'share-social-outline',
      title: t('privacy.dataSharing'),
      content: t('privacy.dataSharingText'),
      color: '#f59e0b'
    },
    {
      icon: 'shield-checkmark-outline',
      title: t('privacy.dataSecurity'),
      content: t('privacy.dataSecurityText'),
      color: '#ef4444'
    },
    {
      icon: 'person-outline',
      title: t('privacy.yourRights'),
      content: t('privacy.yourRightsText'),
      color: '#06b6d4'
    },
    {
      icon: 'analytics-outline',
      title: t('privacy.cookies'),
      content: t('privacy.cookiesText'),
      color: '#ec4899'
    },
    {
      icon: 'shield-outline',
      title: t('privacy.childrenPrivacy'),
      content: t('privacy.childrenPrivacyText'),
      color: '#6366f1'
    },
    {
      icon: 'refresh-outline',
      title: t('privacy.changes'),
      content: t('privacy.changesText'),
      color: '#14b8a6'
    },
    {
      icon: 'mail-outline',
      title: t('privacy.contact'),
      content: t('privacy.contactText'),
      color: '#f97316'
    }
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      {/* Header */}
      <View className="bg-white pt-16 pb-6 px-6 shadow-sm">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4 p-2 bg-gray-100 rounded-full"
          >
            <Ionicons 
              name={isRTL ? "arrow-back" : "arrow-back"} 
              size={24} 
              color="#111827" 
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text 
              className={`text-2xl font-bold text-gray-900 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              {t('privacy.title')}
            </Text>
            <Text 
              className={`text-sm text-gray-500 mt-1 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              {t('privacy.lastUpdated')}
            </Text>
          </View>
        </View>

        {/* Privacy Icon Banner */}
        <View className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl flex-row items-center">
          <View className="bg-green-100 p-3 rounded-full mr-4">
            <Ionicons name="shield-checkmark" size={32} color="#10b981" />
          </View>
          <Text 
            className={`flex-1 text-gray-700 ${isRTL ? 'arabic-font text-right' : ''}`}
          >
            Your privacy and data security are our top priorities
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {sections.map((section, index) => (
          <View 
            key={index}
            className="bg-white mx-4 mt-4 rounded-2xl p-5 shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}
          >
            {/* Section Header */}
            <View className="flex-row items-center mb-3">
              <View 
                className="p-3 rounded-full mr-3"
                style={{ backgroundColor: `${section.color}15` }}
              >
                <Ionicons 
                  name={section.icon as any} 
                  size={24} 
                  color={section.color} 
                />
              </View>
              <Text 
                className={`text-lg font-bold text-gray-900 flex-1 ${isRTL ? 'arabic-font text-right' : ''}`}
              >
                {section.title}
              </Text>
            </View>

            {/* Section Content */}
            <Text 
              className={`text-gray-600 leading-6 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              {section.content}
            </Text>

            {/* Contact Details for Contact Section */}
            {section.title === t('privacy.contact') && (
              <View className="mt-4 space-y-3">
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="mail" size={20} color="#6b7280" />
                  <Text 
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.email')}
                  </Text>
                </View>
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="call" size={20} color="#6b7280" />
                  <Text 
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.phone')}
                  </Text>
                </View>
                <View className="flex-row items-center bg-gray-50 p-3 rounded-xl">
                  <Ionicons name="location" size={20} color="#6b7280" />
                  <Text 
                    className={`text-gray-700 ml-3 ${isRTL ? 'arabic-font' : ''}`}
                  >
                    {t('privacy.address')}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Bottom Notice */}
        <View className="mx-4 mt-6 mb-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={24} color="#3b82f6" />
            <Text 
              className={`flex-1 text-blue-800 ml-3 ${isRTL ? 'arabic-font text-right' : ''}`}
            >
              By using our app, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons (Optional) */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex-row space-x-3">
        <TouchableOpacity 
          className="flex-1 bg-gray-100 py-4 rounded-xl mr-2"
          onPress={() => router.back()}
        >
          <Text className="text-gray-700 font-bold text-center">
            {t('privacy.decline')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 bg-green-600 py-4 rounded-xl"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-center">
            {t('privacy.accept')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
