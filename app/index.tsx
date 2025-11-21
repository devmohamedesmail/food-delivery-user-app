
import { View, StatusBar , ScrollView } from 'react-native'
import FeaturedMeals from '@/components/home/FeaturedMeals';
import Copouns from '@/components/home/Copouns';
import FeaturedResturants from '@/components/home/FeaturedResturants';
import { SafeAreaView } from 'react-native-safe-area-context';
import SpecialOffers from '@/components/home/SpecialOffers';
import BottomNavigation from '@/components/common/BottomNavigation';
import { StoreTypes } from '@/components/home/StoreTypes';
import Header from '@/components/home/Header';


export default function Home() {
 
  return (
    <SafeAreaView
      edges={['bottom']}
      className='flex-1 bg-white'>
      <StatusBar hidden={true}  />
    
      <Header />

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        
        <StoreTypes />
        <SpecialOffers />
        <FeaturedMeals />
        <Copouns />
        <FeaturedResturants />
        <View className='h-20' />
      </ScrollView>

      {/* <CreativeBottomNavigation /> */}
      <BottomNavigation />
    </SafeAreaView>
  );
}
