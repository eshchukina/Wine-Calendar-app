import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarFooter from './CalendarFooter';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';
import CalendarDay from './CalendarDay';
import FastImage from 'react-native-fast-image';

const wineImage = require('../../assets/wine.png');
const wineWithoutImage = require('../../assets/wineWithout.png');

const Calendar = ({navigation}) => {
  const [currentMonth] = useState(new Date());
  const [dayBackgroundImage, setDayBackgroundImage] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const preloadImages = async () => {
      const images = [wineImage, wineWithoutImage];

      const cacheImages = images.map(image => {
        return {uri: Image.resolveAssetSource(image).uri};
      });

      await FastImage.preload(cacheImages);
    };

    preloadImages().then(() => setImagesLoaded(true));

    const loadBackgroundImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem('backgroundImages');
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages);
          const loadedImages = Object.keys(parsedImages).reduce((acc, key) => {
            acc[key] =
              parsedImages[key] === '../../assets/wine.png'
                ? wineImage
                : wineWithoutImage;
            return acc;
          }, {});
          setDayBackgroundImage(loadedImages);
        }
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading background images:', error);
        setImagesLoaded(true);
      }
    };

    loadBackgroundImages();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentMonth.getMonth(),
        animated: true,
      });
    }
  }, [currentMonth, imagesLoaded]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const calculateWineDaysInYear = useMemo(() => {
    const year = currentMonth.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    let wineDaysCount = 0;

    for (
      let currentDate = new Date(startOfYear);
      currentDate <= endOfYear;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const isoDateString = currentDate.toISOString();
      const backgroundImage = dayBackgroundImage[isoDateString];

      if (backgroundImage && backgroundImage === wineImage) {
        wineDaysCount++;
      }
    }

    return wineDaysCount;
  }, [currentMonth, dayBackgroundImage]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getMonthData = useMemo(
    () => (year, month) => {
      const firstDay = new Date(year, month, 1);
      const startingDay = (firstDay.getDay() + 6) % 7;
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      for (let i = 0; i < startingDay; i++) {
        days.push(null);
      }

      for (let i = 1; i <= daysInMonth(month, year); i++) {
        days.push(new Date(year, month, i));
      }

      return {firstDay, lastDay, days};
    },
    [],
  );

  const handleDayPress = async day => {
    const isoDateString = day.toISOString();
    const backgroundImage =
      dayBackgroundImage[isoDateString] || wineWithoutImage;
    const isWine = backgroundImage === wineImage;

    const updatedImages = {
      ...dayBackgroundImage,
      [isoDateString]: isWine ? wineWithoutImage : wineImage,
    };

    try {
      const imagePaths = Object.keys(updatedImages).reduce((acc, key) => {
        acc[key] =
          updatedImages[key] === wineImage
            ? '../../assets/wine.png'
            : '../../assets/wineWithout.png';
        return acc;
      }, {});
      await AsyncStorage.setItem(
        'backgroundImages',
        JSON.stringify(imagePaths),
      );
      setDayBackgroundImage(updatedImages);
    } catch (error) {
      console.error('Error saving background images:', error);
    }
  };

  const resetAllDays = async () => {
    const updatedImages = {};

    for (let i = 0; i < 12; i++) {
      const {days} = getMonthData(currentMonth.getFullYear(), i);
      days.forEach(day => {
        if (day) {
          updatedImages[day.toISOString()] = wineWithoutImage;
        }
      });
    }

    try {
      const imagePaths = Object.keys(updatedImages).reduce((acc, key) => {
        acc[key] = '../../assets/wineWithout.png';
        return acc;
      }, {});
      await AsyncStorage.setItem(
        'backgroundImages',
        JSON.stringify(imagePaths),
      );
      setDayBackgroundImage(updatedImages);
    } catch (error) {
      console.error('Error resetting background images:', error);
    }
  };

  const monthsData = useMemo(
    () =>
      Array.from(
        {length: 12},
        (_, index) => new Date(currentMonth.getFullYear(), index),
      ),
    [currentMonth],
  );

  if (!imagesLoaded) {
    return (
      <View style={styles.containerIndicator}>
        <ActivityIndicator size="large" color="#771011" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CalendarHeader
        navigation={navigation}
        openModal={openModal}
        modalVisible={modalVisible}
        onClose={closeModal}
        dayBackgroundImage={dayBackgroundImage}
        currentMonth={currentMonth}
      />
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={monthsData}
        renderItem={({item}) => (
          <CalendarMonth
            monthData={item}
            getMonthData={getMonthData}
            renderDay={day => (
              <CalendarDay
                key={day ? day.toISOString() : Math.random()}
                day={day}
                dayBackgroundImage={dayBackgroundImage}
                handleDayPress={handleDayPress}
              />
            )}
            dayOfWeekNames={['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']}
          />
        )}
        keyExtractor={item => item.toISOString()}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        ListFooterComponent={
          <CalendarFooter
            wineDaysInYear={calculateWineDaysInYear}
            resetAllDays={resetAllDays}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0bfb2',
    paddingTop: 10,
  },
  containerIndicator: {
    flex: 1,
    backgroundColor: '#c0bfb2',
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

export default Calendar;
