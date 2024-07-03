import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';
import IconButton from '../buttons/IconButton';
import WineDaysStats from '../modal/WineDaysStats';
import Bottle from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarHeader = ({
  openModal,
  navigation,
  dayBackgroundImage,
  currentMonth,
  modalVisible,
  onClose,
}) => {
  return (
    <View style={styles.headerWrapper}>
      <IconButton
        iconComponent={<Back name="chevron-back" size={40} color="#771011" />}
        text=""
        onPress={() => navigation.navigate('Home')}
        marginLeft={0}
      />

      <View>
        <Text style={styles.titleTextHeader}>Wine Calendar</Text>
      </View>
      <IconButton
        iconComponent={<Bottle name="glass-wine" size={40} color="#771011" />}
        text=""
        onPress={openModal}
        marginLeft={0}
      />
      <WineDaysStats
        modalVisible={modalVisible}
        onClose={onClose}
        dayBackgroundImage={dayBackgroundImage}
        currentMonth={currentMonth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    margin: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleTextHeader: {
    fontFamily: 'Philosopher-Regular',
    color: '#771011',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
});

export default CalendarHeader;
