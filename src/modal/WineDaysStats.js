import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import Button from '../buttons/Button';

const WineDaysStats = ({
  dayBackgroundImage,
  currentMonth,
  modalVisible,
  onClose,
}) => {
  const [wineDaysCountByMonth, setWineDaysCountByMonth] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const calculateWineDaysByMonth = () => {
      const months = [
        t('january'),
        t('february'),
        t('march'),
        t('april'),
        t('may'),
        t('june'),
        t('july'),
        t('august'),
        t('september'),
        t('october'),
        t('november'),
        t('december'),
      ];
      const counts = new Array(12).fill(0);
      const year = currentMonth.getFullYear();

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day).toISOString();
          if (dayBackgroundImage[date] === require('../../assets/wine.png')) {
            counts[month]++;
          }
        }
      }

      setWineDaysCountByMonth(
        months.map((month, index) => ({
          month,
          count: counts[index],
        })),
      );
    };

    calculateWineDaysByMonth();
  }, [dayBackgroundImage, currentMonth, t]);

  const getMaxCount = () => {
    let maxCount = 0;
    wineDaysCountByMonth.forEach(({count}) => {
      if (count > maxCount) {
        maxCount = count;
      }
    });
    return maxCount;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
      statusBarTranslucent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <Text style={styles.modalText}>{t('statistics')}</Text>
            {wineDaysCountByMonth.map(({month, count}) => (
              <Text
                key={month}
                style={[
                  styles.statsText,
                  month ===
                  wineDaysCountByMonth.find(
                    ({count}) => count === getMaxCount(),
                  ).month
                    ? styles.maxCountText
                    : null,
                ]}>
                {month}: {count} {t('days')}
              </Text>
            ))}
          </View>

          <Button
            text={t('close')}
            padding={15}
            color="#771011"
            onPress={onClose}
            paddingLeft={15}
            paddingRight={15}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#c0bfb2',
    borderRadius: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  container: {
    padding: 10,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 20,
    color: '#6f635b',
    lineHeight: 30,
    fontFamily: 'Philosopher-Regular',
  },
  maxCountText: {
    color: '#771011',
  },
  modalText: {
    color: '#ece6d3',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Pacifico-Regular',
  },
});

export default WineDaysStats;
