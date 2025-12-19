import React from 'react'
import { View } from 'react-native'
import Skeleton from '../ui/Skeleton'

export default function ReviewLoading() {
  return (
    <View>
        <Skeleton width={'100%'} height={100} className='mb-1' />
        <Skeleton width={'100%'} height={100} className='mb-1' />
        <Skeleton width={'100%'} height={100} className='mb-1' />
        <Skeleton width={'100%'} height={100} className='mb-1' />
        <Skeleton width={'100%'} height={100} className='mb-1' />
    </View>
  )
}
