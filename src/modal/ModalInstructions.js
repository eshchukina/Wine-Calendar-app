import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import Button from '../buttons/Button';
import Bottle from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

const ModalInstructions = ({visible, onClose}) => {
  const {t} = useTranslation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <Bottle name="bottle-wine" size={60} style={styles.icon} />
            <Bottle name="glass-wine" size={40} style={styles.icon} />
          </View>
          <Text style={styles.modalText}>{t('description')}</Text>

          <Button
            text={t('close')}
            padding={15}
            color="#771011"
            onPress={onClose}
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
  modalView: {
    backgroundColor: '#c0bfb2',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#221712',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Philosopher-Regular',
    lineHeight: 25,
  },
  icon: {
    color: '#6f635b',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: 40,
  },
});

export default ModalInstructions;
