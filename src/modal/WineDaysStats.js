import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import Button from '../buttons/Button';
import {LineChart} from 'react-native-chart-kit';

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
      const monthsShort = months.map(month => month.charAt(0));
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
        monthsShort.map((month, index) => ({
          month,
          count: counts[index],
        })),
      );
    };

    calculateWineDaysByMonth();
  }, [dayBackgroundImage, currentMonth, t]);

  const screenWidth = Dimensions.get('window').width;

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
            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: wineDaysCountByMonth.map(({month}) => month),
                  datasets: [
                    {
                      data: wineDaysCountByMonth.map(({count}) => count),
                    },
                  ],
                }}
                width={screenWidth}
                height={220}
                yAxisLabel=""
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#c0bfb2',
                  backgroundGradientFrom: '#c0bfb2',
                  backgroundGradientTo: '#c0bfb2',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `#771011`,
                  labelColor: (opacity = 1) => `#771011`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '5',
                    strokeWidth: '2',
                    stroke: '#ece6d3',
                  },
                }}
                bezier
                style={{
                  marginVertical: 1,
                  borderRadius: 16,
                }}
              />
            </View>
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
    width: '100%',
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
  chartContainer: {
    right: 20,
  },
});

export default WineDaysStats;
