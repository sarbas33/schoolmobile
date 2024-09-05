import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScheduleScreen: React.FC = () => {
  const { timetable } = useApiData();
  const [currentDay, setCurrentDay] = useState('today');
  const [todayDate, setTodayDate] = useState('');
  const [tomorrowDate, setTomorrowDate] = useState('');

  useEffect(() => {
    const currentHour = moment().hour();
    if (currentHour >= 18) {
      setCurrentDay('tomorrow');
    } else {
      setCurrentDay('today');
    }

    setTodayDate(moment().format('MMM D ddd'));
    setTomorrowDate(moment().add(1, 'day').format('MMM D ddd'));
  }, []);

  const handleDaySwitch = (day) => {
    setCurrentDay(day);
  };

  const renderTimetable = (day) => {
    const dayTimetable = timetable[day];
    return dayTimetable.map((item) => {
      const endTime = moment(item.time, 'HH:mm').add(item.duration, 'minutes').format('h:mm A');
      return (
        <View key={item.id} style={[styles.card, styles[item.type]]}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{moment(item.time, 'HH:mm').format('h:mm A')}</Text>
            <Text style={styles.endTime}>{endTime}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
          </View>
          <View style={styles.iconContainer}>
            {item.type === 'class' && <Ionicons name="book-outline" size={20} color={Colors.darkGrey} />}
            {item.type === 'test' && <Ionicons name="clipboard-outline" size={20} color={Colors.error} />}
            {item.type === 'event' && <Ionicons name="calendar-outline" size={20} color={Colors.success} />}
          </View>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchButton, currentDay === 'today' && styles.activeButton]}
            onPress={() => handleDaySwitch('today')}
          >
            <Text style={[styles.switchButtonText, currentDay === 'today' && styles.activeButtonText]}>Today ({todayDate})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchButton, currentDay === 'tomorrow' && styles.activeButton]}
            onPress={() => handleDaySwitch('tomorrow')}
          >
            <Text style={[styles.switchButtonText, currentDay === 'tomorrow' && styles.activeButtonText]}>Tomorrow ({tomorrowDate})</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.timetableContainer}>
          {renderTimetable(currentDay)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginHorizontal: 8,
    borderRadius: 20,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: Colors.darkGrey,
  },
  switchButtonText: {
    color: Colors.text,
    fontWeight: Fonts.weight.semibold,
    fontSize: Fonts.size.regular,
  },
  activeButtonText: {
    color: Colors.white,
  },
  timetableContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    marginRight: 12,
    alignItems: 'center',
  },
  time: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  endTime: {
    fontSize: Fonts.size.tiny,
    color: Colors.textLight,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  type: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
  },
  test: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  class: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.darkGrey,
  },
  event: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.success,
  },
});

export default ScheduleScreen;
