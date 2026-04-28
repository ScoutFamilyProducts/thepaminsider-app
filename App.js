import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/theme/colors';
import { storage } from './src/utils/storage';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import TermDetailScreen from './src/screens/TermDetailScreen';
import ScenarioDetailScreen from './src/screens/ScenarioDetailScreen';
import RoleDetailScreen from './src/screens/RoleDetailScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();
const SPLASH_DURATION = 5000;

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), SPLASH_DURATION);

    const checkOnboardingState = async () => {
      try {
        const dismissed = await storage.isOnboardingDismissed();
        setShowOnboarding(!dismissed);
      } catch (error) {
        console.error('Error checking onboarding state:', error);
        setShowOnboarding(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingState();

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.backgroundBlack, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.neonGreen} />
      </View>
    );
  }

  const detailScreenOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.deepCharcoal,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderGray,
    },
    headerTintColor: colors.neonGreen,
    headerTitleStyle: {
      color: colors.textWhite,
      fontWeight: '600',
    },
    title: '',
    headerBackTitle: '',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showOnboarding ? 'Onboarding' : 'MainTabs'}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.backgroundBlack },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen name="TermDetail" component={TermDetailScreen} options={detailScreenOptions} />
        <Stack.Screen name="ScenarioDetail" component={ScenarioDetailScreen} options={detailScreenOptions} />
        <Stack.Screen name="RoleDetail" component={RoleDetailScreen} options={detailScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
