import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroSplashScreen from '../screens/Auth/IntroSplashScreen';
import LanguageScreen from '../screens/Auth/LanguageScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import UserOTPScreen from '../screens/Auth/UserOTPScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import DriverLoginScreen from '../screens/Auth/DriverLoginScreen';
import DriverOTPScreen from '../screens/Auth/DriverOTPScreen';
import DriverCitySelectionScreen from '../screens/Auth/DriverCitySelectionScreen';
import DriverVehicleSelectionScreen from '../screens/Auth/DriverVehicleSelectionScreen';
import DriverDocumentUploadScreen from '../screens/Auth/DriverDocumentUploadScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="IntroSplash" component={IntroSplashScreen} />
            <Stack.Screen name="LanguageSelection" component={LanguageScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UserOTP" component={UserOTPScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="DriverLogin" component={DriverLoginScreen} />
            <Stack.Screen name="DriverOTP" component={DriverOTPScreen} />
            <Stack.Screen name="DriverCitySelection" component={DriverCitySelectionScreen} />
            <Stack.Screen name="DriverVehicleSelection" component={DriverVehicleSelectionScreen} />
            <Stack.Screen name="DriverDocumentUpload" component={DriverDocumentUploadScreen} />
        </Stack.Navigator>
    );
}
