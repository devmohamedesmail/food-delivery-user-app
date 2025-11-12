import BottomNavigation from '@/components/common/BottomNavigation'
import { View , Text } from '@/components/Themed'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stores = () => {
  return (
   <SafeAreaView className="flex-1 bg-white">
    <Text>Stores Screen</Text>
    <ScrollView>

    </ScrollView>
    <BottomNavigation />
   </SafeAreaView>
  )
}

export default Stores
