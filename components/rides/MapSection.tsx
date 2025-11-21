import React from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// const mapRef = React.createRef<MapView>();







export default function MapSection({
  origin,
  destination,
  routeCoordinates,
  mapRegion,
  mapRef,
  fakeDrivers
}: any) {




  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width, height }}
      initialRegion={mapRegion || {
        latitude: 30.0444,
        longitude: 31.2357,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      showsBuildings={true}
      showsTraffic={true}
      showsIndoors={true}
      mapType="standard"
    >

      {fakeDrivers && fakeDrivers.map((driver: any) => (
        <Marker
          key={driver.id}
          coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
          title={`Driver #${driver.id}`}
        >
          <View className=" p-1 rounded-full shadow-lg">
            {/* <Ionicons name="car" size={20} color="white" /> */}
            <Image
              source={require('../../assets/images/banners/car.png')}
              style={{ width: 28, height: 28 }}
            
            />
          </View>
        </Marker>
      ))}

      {origin && (
        <Marker
          coordinate={origin}
          title="Pickup Location"
          pinColor="green"
        >
          <View className="bg-green-500 p-1 rounded-full shadow-lg">
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
          <View className="bg-red-500 p-1 rounded-full shadow-lg">
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
