import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useFetch from '@/hooks/useFetch';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getMyLocation, MyLocationResult } from '@/services/location';
import Header from '@/components/rides/Header';
import LocateMeButton from '@/components/rides/LocateMeButton';
import VehichlesOptions from '@/components/rides/VehichlesOptions';
import ActionButtons from '@/components/rides/ActionButtons';
import OriginInput from '@/components/rides/OriginInput';
import DestinationInput from '@/components/rides/DestinationInput';
import MapSection from '@/components/rides/MapSection';


const GOOGLE_API_KEY = "AIzaSyCWrI-BwVYZE6D7wzFCVeEuaKr6VR-6FGI";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface Driver {
  id: number;
  latitude: number;
  longitude: number;
}

export default function Rides() {
  const { t, i18n } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // make location region state
  const [mapRegion, setMapRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);


  // Location states
  const [origin, setOrigin] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<LocationCoords | null>(null);
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);

  // Search states
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');


  // Route states
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [distanceValue, setDistanceValue] = useState(0); // in meters
  const [routeCoordinates, setRouteCoordinates] = useState<LocationCoords[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const { data: vehiclesData, loading: vehiclesLoading, error: vehiclesError } = useFetch('/vehicles');

  // ===========================================================================================
  // fake drivers data
  const [fakeDrivers, setFakeDrivers] = useState<Driver[]>([]);
  const generateFakeDrivers = (center: { latitude: number; longitude: number }) => {
  const drivers = [];

  for (let i = 0; i < 5; i++) {
    const randomLat = center.latitude + (Math.random() - 0.5) * 0.01; // حول 1km
    const randomLng = center.longitude + (Math.random() - 0.5) * 0.01;

    drivers.push({
      id: i + 1,
      latitude: randomLat,
      longitude: randomLng,
    });
  }

  setFakeDrivers(drivers);
};

useEffect(() => {
  if (currentLocation) {
    generateFakeDrivers(currentLocation);
  }
}, [currentLocation]);


//===========================================================================================


  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);


  const fetchMyLocation = async () => {
    try {
      setLoading(true);
      const result: MyLocationResult = await getMyLocation();
      setOrigin(result.coords);
      setCurrentLocation(result.coords);
      setOriginAddress(result.address);
      setOriginInput(result.address);

      // Update map region
      setMapRegion({
        ...result.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Center map
      mapRef.current?.animateToRegion({
        ...result.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
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
      fetchMyLocation();
    }
  };

  // Search places using Google Places Autocomplete
  // const searchPlaces = async (input: string, isOrigin: boolean) => {
  //   if (input.length < 3) {
  //     isOrigin ? setOriginSuggestions([]) : setDestinationSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`
  //     );

  //     if (response.data.predictions) {
  //       const suggestions = response.data.predictions.map((pred: any) => ({
  //         description: pred.description,
  //         place_id: pred.place_id,
  //       }));

  //       isOrigin ? setOriginSuggestions(suggestions) : setDestinationSuggestions(suggestions);
  //     }
  //   } catch (error) {
  //     console.error('Places search error:', error);
  //   }
  // };

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
        // setShowOriginSuggestions(false);
        // setOriginSuggestions([]);
      } else {
        setDestination({ latitude: location.lat, longitude: location.lng });
        setDestinationAddress(address);
        setDestinationInput(address);
        // setShowDestinationSuggestions(false);
        // setDestinationSuggestions([]);
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
  // const calculatePrice = (vehicle: any) => {
  //   if (!distanceValue) return 0;
  //   const distanceInKm = distanceValue / 1000;
  //   const pricePerKm = parseFloat(vehicle.price_per_km || vehicle.price || 0);
  //   return (distanceInKm * pricePerKm).toFixed(2);
  // };
  const calculatePrice = (vehicle: any): string => {
    if (!distanceValue) return '0.00';
    const distanceInKm = distanceValue / 1000;
    const pricePerKm = parseFloat(vehicle.price_per_km || vehicle.price || 0);
    return (distanceInKm * pricePerKm).toFixed(2); // دائمًا string
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
        <MapSection
          origin={origin}
          destination={destination}
          routeCoordinates={routeCoordinates}
          mapRegion={mapRegion}
          mapRef={mapRef}
          fakeDrivers={fakeDrivers}

        />


        {/* Professional Header */}
        <Header />

        {/* Locate Me Button */}
        <LocateMeButton centerMapToMyLocation={centerMapToMyLocation} loading={loading} />

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: '#ffffff' }}
          handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}
        >
          <BottomSheetScrollView className="flex-1 px-4 ">
            <Text className="text-2xl text-center text-gray-900 mb-6">
              {t('rides.bookARide')}
            </Text>


            <OriginInput
              originInput={originInput}
              setOriginInput={setOriginInput}
              getMyLocation={getMyLocation}
              loading={loading}
              getPlaceDetails={getPlaceDetails}
            />



            <DestinationInput
              destinationInput={destinationInput}
              setDestinationInput={setDestinationInput}
              getPlaceDetails={getPlaceDetails}
              loading={loading}

            />

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


            <VehichlesOptions
              vehiclesData={vehiclesData}
              distanceValue={distanceValue}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              calculatePrice={calculatePrice}
            />

            <ActionButtons
              origin={origin}
              destination={destination}
              loading={loading}
              getDirections={getDirections}
              selectedVehicle={selectedVehicle}
              distanceValue={distanceValue}
              calculatePrice={calculatePrice}

              distance={distance}

            />
          </BottomSheetScrollView>
        </BottomSheet>


      </View>
    </GestureHandlerRootView>
  );
}