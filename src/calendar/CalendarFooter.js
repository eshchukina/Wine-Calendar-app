import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Button from '../buttons/Button';
import {useTranslation} from 'react-i18next';

const CalendarFooter = ({wineDaysInYear, resetAllDays}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextFooter}>
        {t('day')}: <Text style={styles.titleTextMark}>{wineDaysInYear}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          text={t('cancel')}
          paddingRight={0}
          paddingLeft={0}
          padding={15}
          color="#771011"
          onPress={() => {
            Alert.alert(
              '',
              t('clean'),
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => resetAllDays(),
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 70,
  },
  container: {},
  titleTextFooter: {
    color: '#ece6d3',
    fontSize: 20,
    fontFamily: 'Pacifico-Regular',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleTextMark: {
    color: '#771011',
  },
});

export default CalendarFooter;
