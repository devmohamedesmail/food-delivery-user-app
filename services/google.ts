import * as Location from 'expo-location';
import axios from 'axios';
import { config } from '@/constants/config';


// Function to get current location as a city or region name in Arabic
export const getCurrentLocation = async (): Promise<string> => {
  try {
    // permission for location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return 'الموقع غير متاح';
    }

    // Get coordinates
    const currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    // Convert coordinates to city or region name
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode && reverseGeocode.length > 0) {
      const { city, district, subregion, region } = reverseGeocode[0];
      return city || district || subregion || region || 'غير معروف';
    }

    return 'unknown place';
  } catch (error) {
    console.error('خطأ في الحصول على الموقع:', error);
    return 'unknown place';
  }
};





export const searchPlaces = async (input: string) => {
  if (input.length < 3) {
    // isOrigin ? setOriginSuggestions([]) : setDestinationSuggestions([]);
    return;
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${config.GOOGLE_API_KEY}`
    );

    if (response.data.predictions) {
      return response.data.predictions.map((pred: any) => ({
        description: pred.description,
        place_id: pred.place_id,
      }));

      // isOrigin ? setOriginSuggestions(suggestions) : setDestinationSuggestions(suggestions);


    }
    return [];
  } catch (error) {
    console.log('Places search error:', error);
    return [];
  }
};




