import React from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const mapRef = React.createRef<MapView>();

const origin = {
  latitude: 37.78825,
  longitude: -122.4324,
};

const destination = {
  latitude: 37.75825,
  longitude: -122.4624,
};

const routeCoordinates = [
  { latitude: 37.78825, longitude: -122.4324 },
  { latitude: 37.77825, longitude: -122.4424 },
  { latitude: 37.76825, longitude: -122.4524 },
  { latitude: 37.75825, longitude: -122.4624 },
];

export default function MapSection() {
  return (
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
  )
}
