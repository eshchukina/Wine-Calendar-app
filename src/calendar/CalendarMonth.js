import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CalendarMonth = ({
  monthData,
  getMonthData,
  renderDay,
  dayOfWeekNames,
}) => {
  return (
    <View key={monthData.toISOString()}>
      <Text style={styles.header}>
        {monthData.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </Text>
      <View style={styles.weekContainer}>
        <View style={styles.rowContainer}>
          {dayOfWeekNames.map((dayName, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayOfWeekText}>{`${dayName}`}</Text>
            </View>
          ))}
        </View>

        {Array.from({length: 6}, (_, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {Array.from({length: 7}, (_, colIndex) => {
              const dayIndex = rowIndex * 7 + colIndex;
              const daysData = getMonthData(
                monthData.getFullYear(),
                monthData.getMonth(),
              );
              const day = daysData.days[dayIndex];
              return day ? (
                renderDay(day)
              ) : (
                <View key={colIndex} style={styles.dayContainer} />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 23,
    fontFamily: 'Pacifico-Regular',
    color: '#6f635b',
    paddingLeft: 50,
  },
  weekContainer: {
    flexDirection: 'column',
    fontFamily: 'Philosopher-Regular',
    color: '#6f635b',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontFamily: 'Philosopher-Regular',
    color: '#6f635b',
  },
  dayOfWeekText: {
    fontFamily: 'OverlockSC-Regular',
    color: '#221712',
    margin: 0,
    padding: 0,
    fontSize: 18,
    alignItems: 'flex-start',
  },
  dayContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarMonth;
