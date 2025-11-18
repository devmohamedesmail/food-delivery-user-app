import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContactOption {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  action: () => void;
}

interface HelpTopic {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  route?: string;
}

export default function support() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");

  const handleCall = () => {
    const phoneNumber = "+971501234567";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = () => {
    const email = "support@uberapp.com";
    const subject = "Support Request";
    Linking.openURL(`mailto:${email}?subject=${subject}`);
  };

  const handleChat = () => {
    Alert.alert(
      t("support.liveChat"),
      t("support.liveChatDesc"),
      [
        { text: t("support.cancel"), style: "cancel" },
        { text: t("support.chatNow"), onPress: () => console.log("Opening chat") },
      ]
    );
  };

  const handleHelpCenter = () => {
    Alert.alert(
      t("support.visitHelp"),
      t("support.visitHelpDesc"),
      [
        { text: t("support.cancel"), style: "cancel" },
        { text: t("support.browseArticles"), onPress: () => console.log("Opening help center") },
      ]
    );
  };

  const contactOptions: ContactOption[] = [
    {
      icon: "chatbubble-ellipses",
      title: t("support.liveChat"),
      description: t("support.liveChatDesc"),
      color: "#10b981",
      bgColor: "#d1fae5",
      action: handleChat,
    },
    {
      icon: "call",
      title: t("support.callUs"),
      description: t("support.callUsDesc"),
      color: "#3b82f6",
      bgColor: "#dbeafe",
      action: handleCall,
    },
    {
      icon: "mail",
      title: t("support.emailUs"),
      description: t("support.emailUsDesc"),
      color: "#f59e0b",
      bgColor: "#fef3c7",
      action: handleEmail,
    },
    {
      icon: "help-circle",
      title: t("support.visitHelp"),
      description: t("support.visitHelpDesc"),
      color: "#8b5cf6",
      bgColor: "#ede9fe",
      action: handleHelpCenter,
    },
  ];

  const helpTopics: HelpTopic[] = [
    {
      icon: "restaurant",
      title: t("support.orderIssue"),
      description: t("support.orderIssueDesc"),
      color: "#ef4444",
      bgColor: "#fee2e2",
    },
    {
      icon: "car",
      title: t("support.rideIssue"),
      description: t("support.rideIssueDesc"),
      color: "#06b6d4",
      bgColor: "#cffafe",
    },
    {
      icon: "card",
      title: t("support.paymentIssue"),
      description: t("support.paymentIssueDesc"),
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      icon: "person",
      title: t("support.accountIssue"),
      description: t("support.accountIssueDesc"),
      color: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    {
      icon: "bug",
      title: t("support.reportBug"),
      description: t("support.reportBugDesc"),
      color: "#ec4899",
      bgColor: "#fce7f3",
    },
    {
      icon: "star",
      title: t("support.giveFeedback"),
      description: t("support.giveFeedbackDesc"),
      color: "#10b981",
      bgColor: "#d1fae5",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      {/* Header */}
      <View
        className="bg-white pt-14 pb-6 px-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
            style={{ marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }}
          >
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-back"}
              size={28}
              color="#10b981"
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800">
              {t("support.title")}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {t("support.subtitle")}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder={t("support.searchPlaceholder")}
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              marginLeft: isRTL ? 0 : 12,
              marginRight: isRTL ? 12 : 0,
              textAlign: isRTL ? "right" : "left",
            }}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Actions */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            {t("support.quickActions")}
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {contactOptions.map((option, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <TouchableOpacity
                  onPress={option.action}
                  className="bg-white rounded-2xl p-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                  }}
                >
                  <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mb-3"
                    style={{ backgroundColor: option.bgColor }}
                  >
                    <Ionicons name={option.icon} size={28} color={option.color} />
                  </View>
                  <Text className="text-base font-semibold text-gray-800 mb-1">
                    {option.title}
                  </Text>
                  <Text className="text-xs text-gray-500" numberOfLines={2}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Common Issues */}
        <View className="px-5 mt-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            {t("support.commonIssues")}
          </Text>
          {helpTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-2xl p-4 mb-3 flex-row items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center mx-2 justify-center"
                style={{ backgroundColor: topic.bgColor }}
              >
                <Ionicons name={topic.icon} size={24} color={topic.color} />
              </View>
              <View
                className="flex-1 ml-4"
                style={{
                  marginLeft: isRTL ? 0 : 16,
                  marginRight: isRTL ? 16 : 0,
                }}
              >
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  {topic.title}
                </Text>
                <Text className="text-sm text-gray-500">{topic.description}</Text>
              </View>
              <Ionicons
                name={isRTL ? "chevron-forward" : "chevron-forward"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Info */}
        <View className="px-5 mt-6 mb-6">
          <View
            className="bg-white rounded-2xl p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="time" size={32} color="#10b981" />
              </View>
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {t("support.hours")}
              </Text>
              <Text className="text-sm text-gray-500">
                {t("support.hoursText")}
              </Text>
            </View>

            <View className="border-t border-gray-100 pt-4 items-center">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-3">
                <Ionicons name="speedometer" size={32} color="#3b82f6" />
              </View>
              <Text className="text-lg font-bold text-gray-800 mb-1">
                {t("support.responseTime")}
              </Text>
              <Text className="text-sm text-gray-500">
                {t("support.responseTimeText")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
