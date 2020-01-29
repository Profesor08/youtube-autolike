import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import store from "./../store";

const resources = {
  "en-US": {
    translation: {
      channelAutoLike: "Autolike videos on this channel",
      likeAllVideos: "Like all videos",
      channelsList: "Channels list",
      likeDelay: "Like delay",
      on: "On",
      off: "Off",
      optionsTab: "Options",
      channelsTab: "Channels",
      search: "Search...",
      secondsShort: "s",
      minutesShort: "m",
      listIsEmty: "List is empty",
    },
  },
  "ru-RU": {
    translation: {
      channelAutoLike: "Лайкать видео на данном канале",
      likeAllVideos: "Лайкать все видео",
      channelsList: "Список каналов",
      likeDelay: "Задержка лайков",
      on: "Вкл",
      off: "Выкл",
      optionsTab: "Настройки",
      channelsTab: "Каналы",
      search: "Искать...",
      secondsShort: "с",
      minutesShort: "м",
      listIsEmty: "Список пуст",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en-US",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    // debug: true,
  });

i18n.changeLanguage(store.lang);

export default i18n;
