import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Dimensions, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import BottomNavigation from '@/components/BottomNavigation';
import { useTranslation } from 'react-i18next';
import useFetch from '@/hooks/useFetch';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { config } from '@/constants/config';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const GOOGLE_API_KEY = "AIzaSyCWrI-BwVYZE6D7wzFCVeEuaKr6VR-6FGI";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface PlaceResult {
  description: string;
  place_id: string;
}

export default function Rides() {
  const { t } = useTranslation();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  // Location states
  const [origin, setOrigin] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<LocationCoords | null>(null);
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  
  // Search states
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [originSuggestions, setOriginSuggestions] = useState<PlaceResult[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<PlaceResult[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  
  // Route states
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [distanceValue, setDistanceValue] = useState(0); // in meters
  const [routeCoordinates, setRouteCoordinates] = useState<LocationCoords[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  const {data: vehiclesData, loading: vehiclesLoading, error: vehiclesError} = useFetch('/vehicles');

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // Get user's current location
  const getMyLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions');
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      setOrigin({ latitude, longitude });
      setCurrentLocation({ latitude, longitude });
      
      // Reverse geocode to get address
      const addressResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      
      if (addressResponse.data.results[0]) {
        const address = addressResponse.data.results[0].formatted_address;
        setOriginAddress(address);
        setOriginInput(address);
      }
      
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location');
    } finally {
      setLoading(false);
    }
  };

  // Center map to current location
  const centerMapToMyLocation = () => {
    if (currentLocation) {
      mapRef.current?.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    } else {
      getMyLocation();
    }
  };

  // Search places using Google Places Autocomplete
  const searchPlaces = async (input: string, isOrigin: boolean) => {
    if (input.length < 3) {
      isOrigin ? setOriginSuggestions([]) : setDestinationSuggestions([]);
      return;
    }
    
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`
      );
      
      if (response.data.predictions) {
        const suggestions = response.data.predictions.map((pred: any) => ({
          description: pred.description,
          place_id: pred.place_id,
        }));
        
        isOrigin ? setOriginSuggestions(suggestions) : setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Places search error:', error);
    }
  };

  // Get place details and coordinates
  const getPlaceDetails = async (placeId: string, isOrigin: boolean) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      
      const location = response.data.result.geometry.location;
      const address = response.data.result.formatted_address;
      
      if (isOrigin) {
        setOrigin({ latitude: location.lat, longitude: location.lng });
        setOriginAddress(address);
        setOriginInput(address);
        setShowOriginSuggestions(false);
        setOriginSuggestions([]);
      } else {
        setDestination({ latitude: location.lat, longitude: location.lng });
        setDestinationAddress(address);
        setDestinationInput(address);
        setShowDestinationSuggestions(false);
        setDestinationSuggestions([]);
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
  };

  // Get directions and calculate distance
  const getDirections = async () => {
    if (!origin || !destination) {
      Alert.alert('Missing Location', 'Please select both origin and destination');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`
      );
      
      if (response.data.routes.length > 0) {
        const route = response.data.routes[0];
        const leg = route.legs[0];
        
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
        setDistanceValue(leg.distance.value); // Distance in meters
        
        // Decode polyline
        const points = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(points);
        
        // Fit map to show entire route
        if (mapRef.current) {
          mapRef.current.fitToCoordinates([origin, destination], {
            edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get directions');
      console.error('Directions error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate price based on distance and vehicle
  const calculatePrice = (vehicle: any) => {
    if (!distanceValue) return 0;
    const distanceInKm = distanceValue / 1000;
    const pricePerKm = parseFloat(vehicle.price_per_km || vehicle.price || 0);
    return (distanceInKm * pricePerKm).toFixed(2);
  };

  // Decode Google polyline
  const decodePolyline = (encoded: string): LocationCoords[] => {
    const poly: LocationCoords[] = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return poly;
  };

  // Auto-fetch directions when both locations are set
  useEffect(() => {
    if (origin && destination) {
      getDirections();
    }
  }, [origin, destination]);

  // Get user location on mount
  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        {/* Map with Street View */}
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ width, height }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          mapType="standard"
        >
          {origin && (
            <Marker
              coordinate={origin}
              title="Pickup Location"
              pinColor="green"
            >
              <View className="bg-green-500 p-3 rounded-full shadow-lg">
                <Ionicons name="location" size={24} color="white" />
              </View>
            </Marker>
          )}
          
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination"
              pinColor="red"
            >
              <View className="bg-red-500 p-3 rounded-full shadow-lg">
                <Ionicons name="flag" size={24} color="white" />
              </View>
            </Marker>
          )}
          
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={5}
              strokeColor="#fd4a12"
            />
          )}
        </MapView>

        {/* Professional Header */}
        <SafeAreaView className="absolute top-0 left-0 right-0">
          <LinearGradient
            colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="pb-4"
          >
            <View className="px-4 pt-10">
              <View className="flex-row items-center justify-between">
                {/* Back Button */}
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-12 h-12 bg-white rounded-2xl items-center justify-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                {/* Title */}
                <View className="flex-1 mx-4">
                  <Text className="text-xl font-bold text-gray-900 text-center arabic-font">
                    {t('rides.bookARide')}
                  </Text>
                  {distance && (
                    <Text className="text-xs text-gray-600 text-center mt-1">
                      {distance} • {duration}
                    </Text>
                  )}
                </View>

                {/* Menu Button */}
                <TouchableOpacity
                  className="w-12 h-12 bg-white rounded-2xl items-center justify-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="menu" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>

        {/* Locate Me Button */}
        <SafeAreaView className="absolute right-4" style={{ top: height * 0.4 }}>
          <TouchableOpacity
            onPress={centerMapToMyLocation}
            className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fd4a12" />
            ) : (
              <Ionicons name="navigate" size={24} color="#fd4a12" />
            )}
          </TouchableOpacity>

          {/* Map Type Toggle */}
          <TouchableOpacity
            className="w-12 h-12 bg-white rounded-full items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <Ionicons name="layers-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: '#ffffff' }}
          handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}
        >
          <BottomSheetScrollView className="flex-1 px-4">
            <Text className="text-2xl arabic-font text-center text-gray-900 mb-6">
              {t('rides.bookARide')}
            </Text>

            {/* Origin Input */}
            <View className="mb-4">
              <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
                <View className="bg-green-500 w-3 h-3 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs mb-1">
                    {t('rides.pickupLocation')}
                   
                    </Text>
                  <TextInput
                    value={originInput}
                    onChangeText={(text) => {
                      setOriginInput(text);
                      searchPlaces(text, true);
                      setShowOriginSuggestions(true);
                    }}
                    placeholder={t('rides.enterPickupLocation')}
                    className="text-gray-900 font-medium"
                  />
                </View>
                <TouchableOpacity
                  onPress={getMyLocation}
                  className="bg-green-100 p-2 rounded-full ml-2"
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#10B981" />
                  ) : (
                    <Ionicons name="locate" size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              </View>
              
              {/* Origin Suggestions */}
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <View className="bg-white mt-2 rounded-xl border border-gray-200 max-h-48">
                  <ScrollView>
                    {originSuggestions.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => getPlaceDetails(suggestion.place_id, true)}
                        className="p-3 border-b border-gray-100"
                      >
                        <View className="flex-row items-center">
                          <Ionicons name="location-outline" size={20} color="#6B7280" />
                          <Text className="text-gray-900 ml-3 flex-1" numberOfLines={1}>
                            {suggestion.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Destination Input */}
            <View className="mb-4">
              <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
                <View className="bg-red-500 w-3 h-3 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="text-gray-500 text-xs mb-1">
                    {t('rides.destination')}
                  </Text>
                  <TextInput
                    value={destinationInput}
                    onChangeText={(text) => {
                      setDestinationInput(text);
                      searchPlaces(text, false);
                      setShowDestinationSuggestions(true);
                    }}
                    placeholder={t('rides.enterDestination')}
                    className="text-gray-900 font-medium"
                  />
                </View>
                <TouchableOpacity className="p-2">
                  <Ionicons name="bookmark-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
              
              {/* Destination Suggestions */}
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <View className="bg-white mt-2 rounded-xl border border-gray-200 max-h-48">
                  <ScrollView>
                    {destinationSuggestions.map((suggestion, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => getPlaceDetails(suggestion.place_id, false)}
                        className="p-3 border-b border-gray-100"
                      >
                        <View className="flex-row items-center">
                          <Ionicons name="location-outline" size={20} color="#6B7280" />
                          <Text className="text-gray-900 ml-3 flex-1" numberOfLines={1}>
                            {suggestion.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Distance and Duration Info */}
            {distance && duration && (
              <View className="bg-orange-50 rounded-2xl p-4 mb-4">
                <View className="flex-row items-center justify-around">
                  <View className="items-center">
                    <Ionicons name="navigate-outline" size={24} color="#fd4a12" />
                    <Text className="text-orange-900 font-bold text-lg mt-1">{distance}</Text>
                    <Text className="text-orange-600 text-xs">
                      {t('rides.distance')}
                    </Text>
                  </View>
                  
                  <View className="w-px h-12 bg-orange-200" />
                  
                  <View className="items-center">
                    <Ionicons name="time-outline" size={24} color="#fd4a12" />
                    <Text className="text-orange-900 font-bold text-lg mt-1">{duration}</Text>
                    <Text className="text-orange-600 text-xs">
                      {t('rides.duration')}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Vehicle Selection */}
            {vehiclesData && vehiclesData.length > 0 && distanceValue > 0 && (
              <View className="mb-4">
                <Text className="text-lg font-bold text-gray-900 mb-3">
                  {t('rides.selectVehicle')}
                </Text>
                {vehiclesData.map((vehicle: any) => {
                  const price = calculatePrice(vehicle);
                  const isSelected = selectedVehicle?.id === vehicle.id;
                  
                  return (
                    <TouchableOpacity
                      key={vehicle.id}
                      onPress={() => setSelectedVehicle(vehicle)}
                      className={`mb-3 rounded-2xl p-4 ${
                        isSelected ? 'bg-orange-50 border-2 border-orange-500' : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <View className="flex-row items-center mb-1">
                            <Ionicons 
                              name="car-sport" 
                              size={24} 
                              color={isSelected ? '#fd4a12' : '#6B7280'} 
                            />
                            <Text className={`ml-2 text-lg font-bold ${
                              isSelected ? 'text-orange-900' : 'text-gray-900'
                            }`}>
                              {vehicle.name}
                            </Text>
                          </View>
                          <Text className={`text-sm ${
                            isSelected ? 'text-orange-600' : 'text-gray-500'
                          }`}>
                            {vehicle.type} • {vehicle.capacity} {t('rides.seats')}
                          </Text>
                          <Text className={`text-xs mt-1 ${
                            isSelected ? 'text-orange-500' : 'text-gray-400'
                          }`}>
                            {config.CurrencySymbol} {vehicle.price_per_km}/km
                          </Text>
                        </View>
                        <View className="items-end">
                          <Text className={`text-2xl font-bold ${
                            isSelected ? 'text-orange-600' : 'text-gray-900'
                          }`}>
                            {config.CurrencySymbol} {price}
                          </Text>
                          <Text className={`text-xs ${
                            isSelected ? 'text-orange-500' : 'text-gray-500'
                          }`}>
                            {t('rides.estimated')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Book Ride Button */}
            <TouchableOpacity
              onPress={getDirections}
              disabled={(!origin || !destination || loading)}
              className={`rounded-2xl py-4 mb-4 flex-row items-center justify-center ${
                origin && destination && !loading ? 'bg-gray-900' : 'bg-gray-300'
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="car-sport" size={24} color="white" />
                  <Text className="text-white font-bold text-lg ml-2">
                    {distance ? t('rides.updateRoute') : t('rides.findRoute')}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Confirm Booking Button */}
            {selectedVehicle && distanceValue > 0 && (
              <TouchableOpacity
                className="rounded-2xl py-4 mb-6 flex-row items-center justify-center"
                style={{
                  backgroundColor: '#fd4a12',
                  shadowColor: '#fd4a12',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Ionicons name="checkmark-circle" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  {t('rides.confirmBooking')} - {config.CurrencySymbol} {calculatePrice(selectedVehicle)}
                </Text>
              </TouchableOpacity>
            )}
          </BottomSheetScrollView>
        </BottomSheet>

     
      </View>
    </GestureHandlerRootView>
  );
}