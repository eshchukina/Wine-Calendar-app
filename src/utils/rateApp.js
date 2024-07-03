import Rate, { AndroidMarket } from "react-native-rate";

const rateApp = () => {
  const options = {
    GooglePackageName: "com.unarest.WineCalendar",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
  };

  Rate.rate(options, (success) => {
    if (success) {
      console.log("Спасибо за оценку!");
    } else {
      console.log("Оценка не была поставлена.");
    }
  });
};

export default rateApp;
