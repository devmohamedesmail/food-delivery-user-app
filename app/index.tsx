
import { View, StatusBar, ScrollView } from 'react-native'
import SaleProducts from '@/components/home/SaleProducts';
import Copouns from '@/components/home/Copouns';
import FeaturedStores from '@/components/home/FeaturedStores';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '@/components/common/BottomNavigation';
import { StoreTypes } from '@/components/home/StoreTypes';
import Header from '@/components/home/Header';
import BookRideSection from '@/components/home/BookRideSection';



export default function Home() {

  return (
    <SafeAreaView
      edges={['bottom']}
      className='flex-1 bg-white'>
      <StatusBar hidden={true} />

      <Header />
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
       <BookRideSection />
        <StoreTypes />
        <SaleProducts />
        <Copouns />

        <FeaturedStores />
        <View className='h-20' />
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}
