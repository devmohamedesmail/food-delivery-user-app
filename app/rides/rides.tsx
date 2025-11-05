import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import BottomNavigation from '@/components/BottomNavigation';
import { useTranslation } from 'react-i18next';

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
  const mapRef = useRef<MapView>(null);
  
  // Location states
  const [origin, setOrigin] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<LocationCoords | null>(null);
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  
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
  const [routeCoordinates, setRouteCoordinates] = useState<LocationCoords[]>([]);
  const [loading, setLoading] = useState(false);

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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location');
    } finally {
      setLoading(false);
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

  return (
    <View className="flex-1 bg-white">
      {/* Map */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ width, height: height * 0.5 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {origin && (
          <Marker
            coordinate={origin}
            title="Pickup Location"
            pinColor="green"
          >
            <View className="bg-green-500 p-3 rounded-full">
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
            <View className="bg-red-500 p-3 rounded-full">
              <Ionicons name="flag" size={24} color="white" />
            </View>
          </Marker>
        )}
        
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={4}
            strokeColor="#3B82F6"
          />
        )}
      </MapView>

      {/* Controls */}
      <View className="flex-1 bg-white rounded-t-3xl -mt-8 px-4 pt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Book a Ride</Text>
        
        {/* Origin Input */}
        <View className="mb-4">
          <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
            <View className="bg-green-500 w-3 h-3 rounded-full mr-3" />
            <View className="flex-1">
              <Text className="text-gray-500 text-xs mb-1">Pickup Location</Text>
              <TextInput
                value={originInput}
                onChangeText={(text) => {
                  setOriginInput(text);
                  searchPlaces(text, true);
                  setShowOriginSuggestions(true);
                }}
                placeholder="Enter pickup location"
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
            </View>
          )}
        </View>

        {/* Destination Input */}
        <View className="mb-4">
          <View className="bg-gray-50 rounded-2xl p-4 flex-row items-center">
            <View className="bg-red-500 w-3 h-3 rounded-full mr-3" />
            <View className="flex-1">
              <Text className="text-gray-500 text-xs mb-1">Destination</Text>
              <TextInput
                value={destinationInput}
                onChangeText={(text) => {
                  setDestinationInput(text);
                  searchPlaces(text, false);
                  setShowDestinationSuggestions(true);
                }}
                placeholder="Enter destination"
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
            </View>
          )}
        </View>

        {/* Distance and Duration Info */}
        {distance && duration && (
          <View className="bg-blue-50 rounded-2xl p-4 mb-4">
            <View className="flex-row items-center justify-around">
              <View className="items-center">
                <Ionicons name="navigate-outline" size={24} color="#3B82F6" />
                <Text className="text-blue-900 font-bold text-lg mt-1">{distance}</Text>
                <Text className="text-blue-600 text-xs">Distance</Text>
              </View>
              
              <View className="w-px h-12 bg-blue-200" />
              
              <View className="items-center">
                <Ionicons name="time-outline" size={24} color="#3B82F6" />
                <Text className="text-blue-900 font-bold text-lg mt-1">{duration}</Text>
                <Text className="text-blue-600 text-xs">Duration</Text>
              </View>
            </View>
          </View>
        )}

        {/* Book Ride Button */}
        <TouchableOpacity
          onPress={getDirections}
          disabled={!origin || !destination || loading}
          className={`rounded-2xl py-4 flex-row items-center justify-center ${
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
                {distance ? 'Update Route' : 'Find Route'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </View>
  );
}