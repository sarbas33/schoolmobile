import React, { useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text, StyleSheet, Platform, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/parent/HomeScreen';
import ScheduleScreen from '../screens/parent/ScheduleScreen';
import BusTrackingScreen from '../screens/parent/BusTrackingScreen';
import AnnouncementsScreen from '../screens/parent/AnnouncementsScreen';
import AnnouncementDetailScreen from '../screens/parent/AnnouncementDetailScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import FeesScreen from '../screens/parent/FeesScreen';
import QuizScreen from '../screens/parent/QuizScreen';
import { Colors } from '../constants/Colors';
import Popover from 'react-native-popover-view';
import { useNavigation } from '@react-navigation/native';
import AttendanceRecordScreen from '../screens/parent/AttendanceRecordScreen';
import ClubsScreen from '../screens/parent/ClubsScreen';
import ClubDetailsScreen from '../screens/parent/ClubDetailsScreen';
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const touchableRef = useRef();
  const navigation = useNavigation();

  const handleMenuPress = () => {
    setPopoverVisible(true);
  };

  const handleLogout = async (navigation) => {
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
    setPopoverVisible(false);
  };

  const handleContactDevelopers = () => {
    // Handle contact developers action
    Alert.alert('Contact Developers', 'Email: schoolsyncdevs@gmail.com');
    setPopoverVisible(false);
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.headerBackground,
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
          },
          headerTintColor: Colors.headerTint,
          headerTitleStyle: {
            fontSize: 20, // Slightly smaller font size
            fontWeight: 'bold', // Bolder font
            fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', // Use appropriate font
          },
          headerRight: () => (
            <TouchableOpacity ref={touchableRef} onPress={handleMenuPress} style={{ marginRight: 15 }}>
              <Ionicons name="ellipsis-vertical" size={20} color={Colors.headerTint} />
            </TouchableOpacity>
          ),
          headerShown: true,
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'SchoolSync',
                    headerTitleStyle: {
                        color: '#1EA355', // Darker green color
                        fontSize: 20, // Slightly smaller font size
                        fontWeight: 'bold', // Bolder font
              } }}
        />
        <Stack.Screen name="Timetable" component={ScheduleScreen} />
        <Stack.Screen name="BusTracking" component={BusTrackingScreen} />
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
        <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen} 
        options={{ headerTitle: 'Announcement' }} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="Clubs" component={ClubsScreen} />
        <Stack.Screen 
          name="ClubDetails" 
          component={ClubDetailsScreen} 
          options={({ route }) => ({ 
            headerTitle: route.params?.clubName || 'Club Details',
          })}
        />
        <Stack.Screen name="AttendanceRecord" component={AttendanceRecordScreen} />
        <Stack.Screen name="Fees" component={FeesScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>

      <Popover
        isVisible={popoverVisible}
        from={touchableRef}
        onRequestClose={() => setPopoverVisible(false)}
      >
        <View style={styles.popoverContainer}>
          <TouchableOpacity onPress={() => handleLogout(navigation)} style={styles.popoverOption}>
            <Text style={styles.popoverOptionText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContactDevelopers} style={styles.popoverOption}>
            <Text style={styles.popoverOptionText}>Contact Developers</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popoverOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  popoverOptionText: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default HomeStackNavigator;
