import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import Description from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/Octicons';
import Document from 'react-native-vector-icons/Ionicons';
import Mail from 'react-native-vector-icons/AntDesign';
import HorizontalLine from '../components/HorizontalLine';
import ToggleSwitch from 'toggle-switch-react-native';
import IconButton from '../buttons/IconButton';
import shareApp from '../utils/shareApp';
import rateApp from '../utils/rateApp';
import reviewPage from '../utils/reviewApp';
import ModalInstructions from '../modal/ModalInstructions';
import {useTranslation} from 'react-i18next';
import i18n from '../translation/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerMenu({onClose}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const sendEmail = () => {
    const email = 'unateamdev@gmail.com';
    const subject = 'Question from the app';
    const body = 'Hello, developer!';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink);
  };

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('languageSwitch');
        if (storedState !== null) {
          const newState = JSON.parse(storedState);
          setIsEnabled(newState);
          const newLang = newState ? 'en' : 'ru';
          i18n.changeLanguage(newLang);
        }
      } catch (error) {
        console.error('Failed to load switch state', error);
      }
    };

    loadSwitchState();
  }, []);

  const opemModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    const newLang = newState ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    try {
      await AsyncStorage.setItem('languageSwitch', JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save switch state', error);
    }
  };

  const handleButtonPress = () => {
    const url =
      'https://www.freeprivacypolicy.com/live/db0aca65-9d2b-40d2-b9aa-71570d35e9a6';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <>
      <View style={styles.header}>
        <HorizontalLine />

        <Image
          source={require('../../assets/logoWine.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <HorizontalLine />

        <View>
          <View style={styles.switchContainer}>
            <Text style={styles.textTitle}>ru</Text>
            <ToggleSwitch
              isOn={isEnabled}
              onColor="#221712"
              offColor="#221712"
              thumbOnStyle={styles.thumbOnStyle}
              thumbOffStyle={styles.thumbOffStyle}
              size="medium"
              onToggle={toggleSwitch}
            />

            <Text style={styles.textTitle}>en</Text>
          </View>
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={
              <ShareIcon name="sharealt" size={30} color="#221712" />
            }
            text={t('share')}
            onPress={shareApp}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={<Star name="star" size={30} color="#221712" />}
            text={t('rate')}
            onPress={rateApp}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={<Mail name="mail" size={30} color="#221712" />}
            text={t('connect')}
            onPress={sendEmail}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={<Star name="comment" size={30} color="#221712" />}
            text={t('review')}
            onPress={reviewPage}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Document
                name="document-attach-outline"
                size={30}
                color="#221712"
              />
            }
            text={t('privacyPolicy')}
            onPress={handleButtonPress}
          />
        </View>
        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Description
                name="script-text-outline"
                size={30}
                color="#221712"
              />
            }
            text={t('instructions')}
            onPress={opemModal}
          />
        </View>

        <View></View>
        <ModalInstructions visible={modalVisible} onClose={closeModal} />
        <HorizontalLine />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
  },
  switchContainer: {
    width: '90%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  icon: {
    color: '#6f635b',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'Philosopher-Regular',
    fontSize: 25,
    color: '#221712',
    textAlign: 'center',
  },
  thumbOnStyle: {
    backgroundColor: '#c0bfb2',
  },
  thumbOffStyle: {
    backgroundColor: '#c0bfb2',
  },
  button: {
    paddingLeft: 20,
  },
});
