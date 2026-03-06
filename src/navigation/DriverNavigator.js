import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DriverDashboardScreen from '../screens/Driver/DriverDashboardScreen';
import DriverEarningsScreen from '../screens/Driver/DriverEarningsScreen';
import DriverRewardsScreen from '../screens/Driver/DriverRewardsScreen';
import DriverAccessFeeScreen from '../screens/Driver/DriverAccessFeeScreen';
import DriverMilesBonusScreen from '../screens/Driver/DriverMilesBonusScreen';
import DriverServiceManagerScreen from '../screens/Driver/DriverServiceManagerScreen';
import DriverHelpScreen from '../screens/Driver/DriverHelpScreen';

const Stack = createNativeStackNavigator();

export default function DriverNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
            <Stack.Screen name="DriverEarnings" component={DriverEarningsScreen} />
            <Stack.Screen name="DriverRewards" component={DriverRewardsScreen} />
            <Stack.Screen name="DriverAccessFee" component={DriverAccessFeeScreen} />
            <Stack.Screen name="DriverMilesBonus" component={DriverMilesBonusScreen} />
            <Stack.Screen name="DriverServiceManager" component={DriverServiceManagerScreen} />
            <Stack.Screen name="DriverHelp" component={DriverHelpScreen} />
        </Stack.Navigator>
    );
}
