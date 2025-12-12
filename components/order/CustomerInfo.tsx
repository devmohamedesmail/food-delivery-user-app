import React from 'react'
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import NoAreaFound from '@/components/order/NoAreaFound';
import Colors from '@/constants/Colors';

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


          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            className="bg-primary rounded-xl p-4 mt-2 flex-row items-center justify-between shadow-lg active:opacity-80"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center flex-1">
              <AntDesign name="environment" size={20} color="white" />
              <Text className="text-white font-semibold text-base ml-3">
                {formik.values.address || t("order.selectyourArea")}
              </Text>
            </View>
            <AntDesign name="down" size={16} color="white" />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View 
              className="flex-1 bg-black/50 justify-end"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <TouchableOpacity 
                className="flex-1"
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              />
              
              <View
                className="bg-white rounded-t-3xl w-full"
                style={{
                  maxHeight: '75%',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: -4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 8,
                }}
              >
                {/* Modal Header */}
                <View className="border-b border-gray-100 px-6 pt-5 pb-4">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-xl font-bold text-gray-800">
                      {t("order.selectyourArea")}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className="bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center active:bg-gray-200"
                    >
                      <AntDesign name="close" size={16} color="#374151" />
                    </TouchableOpacity>
                  </View>
                  <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-1" />
                </View>

                {/* Search Input */}
                <View className="px-6 pt-4">
                  <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                    <AntDesign name="search" size={18} color={Colors.light.tabIconSelected} />
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder={t("order.searchArea")}
                      placeholderTextColor="#9CA3AF"
                      className="flex-1 ml-3 text-base text-gray-800"
                    />
                    {searchQuery ? (
                      <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <AntDesign name="check-circle" size={16} color="#9CA3AF" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>

                {/* Areas List */}
                <ScrollView 
                  className="px-6 py-2"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {filteredAreas && filteredAreas.length > 0 ? (
                    filteredAreas.map((area: any, index: number) => (
                      <TouchableOpacity
                        onPress={() => {
                          formik.setFieldValue("address", area.name);
                          setSelectedArea(area);
                          setModalVisible(false);
                        }}
                        key={area.id}
                        className={`py-4 px-4 flex-row items-center justify-between rounded-xl active:bg-gray-50 ${
                          index !== filteredAreas.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                        style={{
                          backgroundColor: formik.values.address === area.name ? '#F3F4F6' : 'transparent',
                        }}
                      >
                        <View className="flex-row items-center flex-1">
                          <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                            <AntDesign name="environment" size={18} color="#6B7280" />
                          </View>
                          <View className='flex flex-row justify-between flex-1'>
                            <Text className={`text-base ${
                            formik.values.address === area.name 
                              ? 'font-semibold text-primary' 
                              : 'font-medium text-gray-700'
                          }`}>
                            {area.name} 
                          </Text>
                          <Text className='mx-2'>{area.price}</Text>
                          </View>
                        </View>
                        {formik.values.address === area.name && (
                          <AntDesign name="check-circle" size={20} color="#10B981" />
                        )}
                      </TouchableOpacity>
                    ))
                  ) : (
                    <NoAreaFound />
                  )}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
  )
}
