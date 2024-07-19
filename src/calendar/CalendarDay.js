import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';

const CalendarDay = ({day, dayBackgroundImage, handleDayPress}) => {
  const today = new Date();
  const isToday =
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear();

  const backgroundImage =
    dayBackgroundImage[day.toISOString()] ||
    require('../../assets/wineWithout.png');
  const isWine = backgroundImage === require('../../assets/wine.png');

  const dayTextColorStyle = isWine
    ? {color: '#ece6d3'}
    : {color: isToday ? '#771011' : '#6f635b'};

  return (
    <TouchableOpacity
      key={day.toISOString()}
      onPress={() => handleDayPress(day)}
      style={styles.dayContainer}>
      <ImageBackground
        source={backgroundImage}
        style={styles.dayBackgroundImage}>
        <Text
          style={[
            styles.dayText,
            dayTextColorStyle,
            isToday && styles.todayContainer,
          ]}>
          {day.getDate()}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    bottom: 15,
    fontFamily: 'Pacifico-Regular',
    fontSize: 18,
  },
  dayBackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
  todayContainer: {
    color: '#771011',
    fontSize: 22,
  },
});

export default CalendarDay;
