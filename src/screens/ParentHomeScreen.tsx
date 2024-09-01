import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeParentNavigator from './HomeParentNavigator';
import AcademicsParentNavigator from './AcademicsParentNavigator';
import FeesParentNavigator from './FeesParentNavigator';
import ProfileParentNavigator from './ProfileParentNavigator';

const Tab = createBottomTabNavigator();

const ParentHomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color = 'gray', size = 24 }) => {
          let iconName;

          // Customize the icon based on the route name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Academics') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Fees') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#fff', // Background color of the tab bar
          height: 60, // Height of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12, // Label font size
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeParentNavigator} />
      <Tab.Screen name="Academics" component={AcademicsParentNavigator} />
      <Tab.Screen name="Fees" component={FeesParentNavigator} />
      <Tab.Screen name="Profile" component={ProfileParentNavigator} />
    </Tab.Navigator>
  );
};

export default ParentHomeScreen;
