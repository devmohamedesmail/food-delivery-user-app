import * as Location from 'expo-location';

// دالة للحصول على موقع المستخدم الحالي
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

    return 'غير معروف';
  } catch (error) {
    console.error('خطأ في الحصول على الموقع:', error);
    return 'غير معروف';
  }
};
