import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';
import moment from 'moment';

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
          <Text style={styles.time}>{moment(item.time, 'HH:mm').format('h:mm A')} - {endTime}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, currentDay === 'today' && styles.activeButton]}
          onPress={() => handleDaySwitch('today')}
        >
          <Text style={styles.switchButtonText}>Today ({todayDate})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, currentDay === 'tomorrow' && styles.activeButton]}
          onPress={() => handleDaySwitch('tomorrow')}
        >
          <Text style={styles.switchButtonText}>Tomorrow ({tomorrowDate})</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.timetableContainer}>
        {renderTimetable(currentDay)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: 'grey',
  },
  switchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  timetableContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 3,
  },
  test: {
    backgroundColor: '#ffebee',
  },
  class: {
    backgroundColor: '#e3f2fd',
  },
  event: {
    backgroundColor: '#e8f5e9',
  },
});

export default ScheduleScreen;
