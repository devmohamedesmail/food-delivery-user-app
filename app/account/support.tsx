import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import Layout from "@/components/ui/Layout";
import Colors from "@/constants/Colors";
import Header from "@/components/support/Header";
import ContactItem from "@/components/support/ContactItem";

interface ContactOption {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  action: () => void;
}



export default function Support() {
  const { t, i18n } = useTranslation();


  const handleCall = () => {
    const phoneNumber = "0102283709";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // const handleEmail = () => {
  //   const email = "support@uberapp.com";
  //   const subject = "Support Request";
  //   Linking.openURL(`mailto:${email}?subject=${subject}`);
  // };

 
const handleChat = () =>{
    Linking.openURL(`https://wa.me/+971589107126`);
}


  const contactOptions: ContactOption[] = [
    {
      icon: "call",
      title: t("support.callUs"),
      description: t("support.callUsDesc"),
      color: "white",
      bgColor: Colors.light.tabIconSelected,
      action: handleCall,
    },
    {
      icon: "logo-whatsapp",
      title: t("support.chatwhatsApp"),
      description: t("support.chatWithUsDesc"),
      color: "white",
     bgColor: Colors.light.tabIconSelected,
      action: handleChat,
    },
    // {
    //   icon: "mail",
    //   title: t("support.emailUs"),
    //   description: t("support.emailUsDesc"),
    //   color: "#f59e0b",
    //   bgColor: "#fef3c7",
    //   action: handleEmail,
    // },

  ];

  

  return (
    <Layout>
       {/* Header */}
     <Header />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Actions */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-black text-center mb-4">
            {t("support.quickActions")}
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            {contactOptions.map((option, index) => (
              <ContactItem key={index} option={option} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
