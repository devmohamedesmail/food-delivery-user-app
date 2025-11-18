import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const fakeDrivers = [
  { id: '1', name: 'John Doe', carType: 'Sedan', carNumber: 'ABC123', distance: '2.5 km', carImage: 'https://cdn.pixabay.com/photo/2017/01/06/19/15/car-1957037_1280.jpg' },
  { id: '2', name: 'Jane Smith', carType: 'SUV', carNumber: 'XYZ789', distance: '3.1 km', carImage: 'https://cdn.pixabay.com/photo/2013/07/12/15/55/car-150780_1280.png' },
  { id: '3', name: 'Mike Johnson', carType: 'Hatchback', carNumber: 'LMN456', distance: '1.8 km', carImage: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/automobile-1866521_1280.jpg' },
];

export default function Book() {
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-600 p-4">
        <Text className="text-2xl font-bold text-white text-center">Nearby Drivers</Text>
      </View>

      {/* Driver List */}
      <FlatList
        data={fakeDrivers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-white rounded-lg shadow-md flex-row items-center">
            <Image source={{ uri: item.carImage }} className="w-20 h-20 rounded-lg mr-4" />
            <View>
              <Text className="text-lg font-semibold text-gray-900 mb-1">{item.name}</Text>
              <Text className="text-gray-600">Car Type: {item.carType}</Text>
              <Text className="text-gray-600">Car Number: {item.carNumber}</Text>
              <Text className="text-gray-600">Distance: {item.distance}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
