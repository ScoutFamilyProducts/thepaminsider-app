import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import ScenariosScreen from '../screens/ScenariosScreen';
import RolesScreen from '../screens/RolesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.neonGreen,
        tabBarInactiveTintColor: colors.dimTextGray,
        tabBarStyle: {
          backgroundColor: colors.deepCharcoal,
          borderTopColor: colors.borderGray,
          borderTopWidth: 1,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
          height: 64 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Learn') {
            iconName = 'book-open-variant';
          } else if (route.name === 'WhatWentWrong') {
            iconName = 'alert-circle';
          } else if (route.name === 'Roles') {
            iconName = 'account-multiple';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          tabBarLabel: 'Learn',
        }}
      />
      <Tab.Screen
        name="WhatWentWrong"
        component={ScenariosScreen}
        options={{
          tabBarLabel: 'Scenarios',
        }}
      />
      <Tab.Screen
        name="Roles"
        component={RolesScreen}
        options={{
          tabBarLabel: 'Roles',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
