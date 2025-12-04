import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomInput from "@/components/ui/Input";
import CustomButton from "@/components/ui/Button";
import { AuthContext } from "@/context/auth_context";
import { Toast } from "toastify-react-native";
import GoogleButton from "@/components/ui/GoogleButton";
import Layout from "@/components/auth/Layout";

export default function Login() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { handle_login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email(t("auth.email_invalid"))
        .required(t("auth.email_required")),
      password: Yup.string()
        .required(t("password_required"))
        .min(6, t("password_min")),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await handle_login(values.identifier, values.password);

        if (result.data.success) {
          Toast.show({
            text1: t("auth.login_success"),
            text2: t("auth.login_success_description"),
            position: "top",
            type: "success",
          });

          setIsLoading(false);

          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          Toast.show({
            text1: t("auth.login_failed"),
            // text2: t("auth.login_failed_description"),
            position: "top",
            type: "error",
          });
        }

        setIsLoading(false);
        // router.replace("/");
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          text1: t("auth.login_failed"),
          text2: t("auth.login_failed_description"),
          position: "top",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Layout>
      <View className="flex-1 px-6 bg-gray-50 -mt-4 pt-8 rounded-t-3xl">
        <View className="space-y-4">
          {/* Email/Phone Input */}
          <CustomInput
            label={t("auth.phone")}
            placeholder={t("auth.phone")}
            value={formik.values.identifier}
            onChangeText={formik.handleChange("identifier")}
            type="text"
            keyboardType="default"
            error={
              formik.touched.identifier && formik.errors.identifier
                ? formik.errors.identifier
                : undefined
            }
          />

          {/* Password Input */}
          <CustomInput
            label={t("auth.password")}
            placeholder={t("auth.enterPassword")}
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            type="password"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />

          {/* Remember Me & Forgot Password */}
          <View
            className={`flex-row justify-between items-center mt-4 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
          >
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center"
            >
              <View
                className={`w-5 h-5 border-2 border-gray-300 rounded mr-2 items-center justify-center ${rememberMe ? "bg-secondary border-secondary" : ""}`}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={12} color="white" />
                )}
              </View>
              <Text
                className="text-gray-700"
                style={{ fontFamily: "Cairo_400Regular" }}
              >
                {t("auth.rememberMe")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Text className="text-primary font-medium">
                {t("auth.forgotPassword")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View className="mt-8">
            <CustomButton
              title={isLoading ? t("auth.signingIn") : t("auth.signIn")}
              onPress={formik.handleSubmit}
              disabled={
                isLoading ||
                !formik.isValid ||
                !formik.dirty ||
                !formik.values.identifier ||
                !formik.values.password
              }
            />
          </View>

          {/* <SocialLogin /> */}

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-8 mb-8">
            <Text className="text-gray-600">{t("auth.dontHaveAccount")}</Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text className="text-primary font-semibold ml-1">
                {t("auth.signUp")}
              </Text>
            </TouchableOpacity>
          </View>

          <GoogleButton />
        </View>
      </View>
    </Layout>
  );
}
