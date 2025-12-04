import React from 'react'
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import NoAreaFound from '@/components/order/NoAreaFound';

export default function CustomerInfo({formik, modalVisible, setModalVisible, searchQuery, setSearchQuery, filteredAreas, setSelectedArea}:any) {
    const { t } = useTranslation();
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text
            className={`text-xl arabic-font text-black font-extrabold text-center mb-4 `}
          >
            {t("order.deliveryInfo")}
          </Text>

          <Input
            label={t("order.phoneNumber")}
            placeholder={t("order.enterPhoneNumber")}
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            error={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : undefined
            }
          />


          <Button
            title={t("order.selectyourArea")}
            onPress={() => {
              setModalVisible(true);
            }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              className="bg-white shadow-sm h-96 rounded-t-2xl  w-full border-t-2 border-t-primary"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}
            >
              <View className="flex flex-row justify-end">
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <AntDesign name="close" size={14} color="white" />
                </TouchableOpacity>
              </View>

              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t("order.searchArea")}
                className="border border-primary rounded-full px-3 py-4 bg-white mt-4"
              />

              <ScrollView className="mt-4 mb-4">
                {filteredAreas && filteredAreas.length > 0 ? (
                  filteredAreas.map((area: any) => (
                    <TouchableOpacity
                      onPress={() => {
                        formik.setFieldValue("address", area.name);
                        setSelectedArea(area);
                        setModalVisible(false);
                      }}
                      key={area.id}
                      className="py-3 border-b border-b-gray-300"
                    >
                      <Text>{area.name}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <NoAreaFound />
                )}
              </ScrollView>
            </View>
          </Modal>
        </View>
  )
}
