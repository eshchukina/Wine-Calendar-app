import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import IconButton from '../buttons/IconButton';
import Menu from 'react-native-vector-icons/Entypo';
import Calendar from 'react-native-vector-icons/EvilIcons';
import DrawerMenu from '../sidemenu/DrawerMenu';
import {useTranslation} from 'react-i18next';
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({navigation}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerTranslateX = useRef(new Animated.Value(-screenWidth)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {t} = useTranslation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    Animated.timing(drawerTranslateX, {
      toValue: isDrawerOpen ? 0 : -screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [drawerTranslateX, fadeAnim, isDrawerOpen]);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <TouchableWithoutFeedback onPress={isDrawerOpen ? closeDrawer : null}>
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton
              iconComponent={<Menu name="menu" size={50} color="#771011" />}
              text=""
              onPress={toggleDrawer}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{t('welcome')}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.text}>calendar</Text>

            <IconButton
              iconComponent={
                <Calendar name="calendar" size={90} color="#771011" />
              }
              text=""
              marginLeft={0}
              onPress={() => navigation.navigate('Calendar')}
            />
          </View>

          <Animated.View
            style={[
              styles.drawer,
              {transform: [{translateX: drawerTranslateX}]},
              {opacity: fadeAnim},
            ]}>
            <DrawerMenu onClose={closeDrawer} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c0bfb2',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 25,
    color: '#221712',
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: 'Philosopher-Regular',
  },
  text: {
    fontFamily: 'Pacifico-Regular',
    color: '#ece6d3',
    fontSize: 20,
    textAlign: 'center',
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  drawer: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#771011',
    paddingTop: 20,
    zIndex: 200,
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 0,
    width: 240,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
