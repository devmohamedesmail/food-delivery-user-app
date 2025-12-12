import React from 'react'
import { View,Image} from 'react-native'

export default function SlideShow() {
  return (
   <View className='my-2'>
   <Image 
        className="w-full h-56 object-cover rounded-lg py-10"
        source={require('../../assets/images/banners/image.gif')} />
   </View>
  )
}
