import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserHomeScreen from '../screens/User/UserHomeScreen';
import RideTrackingScreen from '../screens/User/RideTrackingScreen';
import PaymentScreen from '../screens/User/PaymentScreen';
import DestinationScreen from '../screens/User/DestinationScreen';
import RideSelectionScreen from '../screens/User/RideSelectionScreen';
import ProfileScreen from '../screens/User/ProfileScreen';
import MyRidesScreen from '../screens/User/MyRidesScreen';
import NotificationScreen from '../screens/User/NotificationScreen';
import HelpScreen from '../screens/User/HelpScreen';
import SafetyScreen from '../screens/User/SafetyScreen';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserHome" component={UserHomeScreen} />
            <Stack.Screen name="Destination" component={DestinationScreen} />
            <Stack.Screen name="RideSelection" component={RideSelectionScreen} />
            <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="MyRides" component={MyRidesScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Safety" component={SafetyScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}
