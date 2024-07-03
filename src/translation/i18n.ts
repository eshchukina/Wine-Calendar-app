import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome:
        "Welcome to the Wine Calendar App, your personal companionfor tracking and celebrating the days you enjoy a glass of wine",
      share: "share",
      rate: "rate",
      review: "review",
      privacyPolicy: "privacy policy",
      instructions: "about the app",
      close: "close",
      description:
        "The Wine Calendar app is a unique and enjoyable way for wine enthusiasts to track and celebrate their wine-drinking experiences. With this app, users can mark the days on a calendar when they indulge in a glass of wine, creating a personal log of their wine journey",
      calendar: "calendar",
      day: "the number of days when you've enjoyed a glass of wine",
      clean: "are you sure you want to reset all days?",
      cancel: "clear calendar",
      connect: "connect with us",
      statistics:'statistics by months',
    },
  },
  ru: {
    translation: {
      welcome:
        "Добро пожаловать в приложение Wine Calendar, вашего персонального спутника для отслеживания и празднования дней, когда вы наслаждаетесь бокалом вина",
      share: "поделиться",
      rate: "оценка",
      review: "отзыв",
      privacyPolicy: "privacy policy",
      instructions: "о приложении",
      close: "закрыть",
      description:
        "Wine Calendar — это уникальный и увлекательный способ для любителей вина отслеживать и отмечать свои винные впечатления. С помощью этого приложения пользователи могут отмечать дни в календаре, когда они наслаждаются бокалом вина, создавая личный журнал своего винного пути",
      calendar: "календарь",
      day: "количество дней, когда вы наслаждались бокалом вина",
      cancel: "очистить календарь",
      clean: "вы уверены, что хотите сбросить все дни?",
      connect: "связаться с нами",
      statistics:'статистика по месяцам',

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v3",
});

export default i18n;
