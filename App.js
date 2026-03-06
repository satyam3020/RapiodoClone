import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider, AppContext } from './src/context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthNavigator from './src/navigation/AuthNavigator';
import UserNavigator from './src/navigation/UserNavigator';
import DriverNavigator from './src/navigation/DriverNavigator';

function RootNavigator() {
  const { user, role } = useContext(AppContext);

  // If no user is logged in, show authentication flow
  if (!user) {
    return <AuthNavigator />;
  }

  // If user is logged in, show respective app based on role
  if (role === 'driver') {
    return <DriverNavigator />;
  }

  return <UserNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
