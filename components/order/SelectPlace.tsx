import React, { useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { View , Text} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SelectPlace() {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                backgroundStyle={{ backgroundColor: '#ffffff' }}
                handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}
            >
                <BottomSheetScrollView >
                    <View className='bg-red-600'>
                        <Text>dsafsdfsfaf</Text>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}
