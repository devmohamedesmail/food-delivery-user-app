import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const availableDrivers = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    rating: 4.9,
    car: 'Toyota Camry',
    carType: 'Economy',
    licensePlate: 'ABC-123',
    price: 12.50,
    estimatedTime: '3 min',
    distance: '0.5 km',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    rating: 4.8,
    car: 'Honda Accord',
    carType: 'Comfort',
    licensePlate: 'XYZ-789',
    price: 15.75,
    estimatedTime: '5 min',
    distance: '1.2 km',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b412c2a0?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Michael Brown',
    rating: 5.0,
    car: 'BMW 3 Series',
    carType: 'Premium',
    licensePlate: 'PRE-456',
    price: 22.00,
    estimatedTime: '4 min',
    distance: '0.8 km',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'Lisa Davis',
    rating: 4.7,
    car: 'Tesla Model 3',
    carType: 'Electric',
    licensePlate: 'ELE-321',
    price: 18.25,
    estimatedTime: '6 min',
    distance: '1.5 km',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
];

const rideTypes = [
  { id: '1', name: 'Economy', icon: 'car-outline', price: 'From $8', description: 'Affordable rides' },
  { id: '2', name: 'Comfort', icon: 'car', price: 'From $12', description: 'More space & comfort' },
  { id: '3', name: 'Premium', icon: 'car-sport', price: 'From $18', description: 'Luxury vehicles' },
  { id: '4', name: 'Electric', icon: 'leaf', price: 'From $15', description: 'Eco-friendly rides' },
];

function Transport() {
  const [pickupLocation, setPickupLocation] = useState('123 Main Street');
  const [destination, setDestination] = useState('');
  const [selectedRideType, setSelectedRideType] = useState('1');
  const [showDrivers, setShowDrivers] = useState(false);

  const handleBookRide = () => {
    if (destination.trim()) {
      setShowDrivers(true);
    }
  };

  const renderDriver = (driver: typeof availableDrivers[0]) => (
    <TouchableOpacity
      key={driver.id}
      className="bg-white mx-4 mb-3 p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: driver.photo }}
          className="w-16 h-16 rounded-full mr-4"
        />
        
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-lg font-bold text-gray-800">{driver.name}</Text>
            <View className="bg-green-100 px-2 py-1 rounded-full flex-row items-center">
              <Ionicons name="star" size={14} color="#10b981" />
              <Text className="text-green-700 text-sm font-semibold ml-1">{driver.rating}</Text>
            </View>
          </View>
          
          <Text className="text-gray-600 mb-1">{driver.car} • {driver.carType}</Text>
          <Text className="text-gray-500 text-sm mb-2">{driver.licensePlate}</Text>
          
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className="text-gray-600 text-sm ml-1">{driver.estimatedTime} away</Text>
              <Text className="text-gray-400 mx-2">•</Text>
              <Text className="text-gray-600 text-sm">{driver.distance}</Text>
            </View>
            <Text className="text-xl font-bold text-blue-600">${driver.price}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity className="bg-blue-500 mt-4 py-3 rounded-lg">
        <Text className="text-white font-bold text-center">Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRideType = (type: typeof rideTypes[0]) => (
    <TouchableOpacity
      key={type.id}
      onPress={() => setSelectedRideType(type.id)}
      className={`mr-3 p-4 rounded-xl border-2 ${
        selectedRideType === type.id
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <View className="items-center">
        <View className={`p-3 rounded-full mb-2 ${
          selectedRideType === type.id ? 'bg-blue-500' : 'bg-gray-100'
        }`}>
          <Ionicons 
            name={type.icon as any} 
            size={24} 
            color={selectedRideType === type.id ? 'white' : '#374151'} 
          />
        </View>
        <Text className={`font-bold mb-1 ${
          selectedRideType === type.id ? 'text-blue-600' : 'text-gray-800'
        }`}>
          {type.name}
        </Text>
        <Text className="text-green-600 font-semibold text-sm mb-1">{type.price}</Text>
        <Text className="text-gray-500 text-xs text-center">{type.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-6 px-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800">Book a Ride</Text>
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Location Inputs */}
        <View className="space-y-3">
          <View className="bg-gray-50 p-4 rounded-xl flex-row items-center">
            <View className="bg-green-500 w-3 h-3 rounded-full mr-3" />
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">From</Text>
              <TextInput
                value={pickupLocation}
                onChangeText={setPickupLocation}
                className="text-gray-800 font-medium text-base"
                placeholder="Enter pickup location"
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="locate" size={20} color="#10b981" />
            </TouchableOpacity>
          </View>

          <View className="bg-gray-50 p-4 rounded-xl flex-row items-center">
            <View className="bg-red-500 w-3 h-3 rounded-full mr-3" />
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">To</Text>
              <TextInput
                value={destination}
                onChangeText={setDestination}
                className="text-gray-800 font-medium text-base"
                placeholder="Enter destination"
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {!showDrivers ? (
          <>
            {/* Ride Types */}
            <View className="py-6">
              <Text className="text-xl font-bold text-gray-800 mx-4 mb-4">Choose Ride Type</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-4"
              >
                {rideTypes.map(renderRideType)}
              </ScrollView>
            </View>

            {/* Quick Actions */}
            <View className="mx-4 mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">Quick Options</Text>
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 p-3 rounded-full mr-3">
                      <Ionicons name="time-outline" size={20} color="#3b82f6" />
                    </View>
                    <Text className="text-gray-800 font-medium">Schedule for later</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center justify-between py-3">
                  <View className="flex-row items-center">
                    <View className="bg-purple-100 p-3 rounded-full mr-3">
                      <Ionicons name="people-outline" size={20} color="#8b5cf6" />
                    </View>
                    <Text className="text-gray-800 font-medium">Share ride</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Book Ride Button */}
            <View className="mx-4 mb-8">
              <TouchableOpacity
                onPress={handleBookRide}
                className={`p-4 rounded-xl ${
                  destination.trim() ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                disabled={!destination.trim()}
              >
                <Text className="text-white font-bold text-center text-lg">
                  Find Available Drivers
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Available Drivers */}
            <View className="py-6">
              <View className="flex-row justify-between items-center mx-4 mb-4">
                <Text className="text-xl font-bold text-gray-800">Available Drivers</Text>
                <TouchableOpacity
                  onPress={() => setShowDrivers(false)}
                  className="bg-gray-100 px-3 py-1 rounded-full"
                >
                  <Text className="text-gray-600 font-medium">Back</Text>
                </TouchableOpacity>
              </View>
              
              <View className="bg-blue-50 mx-4 p-4 rounded-xl mb-4">
                <Text className="text-blue-800 font-medium text-center">
                  {availableDrivers.length} drivers found nearby
                </Text>
              </View>

              {availableDrivers.map(renderDriver)}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default Transport;