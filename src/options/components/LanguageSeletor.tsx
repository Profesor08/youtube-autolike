import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import store from "../../store";

export interface ILanguage {
  name: string;
  locale: string;
  image: string;
}

const availableLanguages: ILanguage[] = [
  {
    name: "English",
    locale: "en-US",
    image: "assets/images/locale/en-US.svg",
  },
  {
    name: "Русский",
    locale: "ru-RU",
    image: "assets/images/locale/ru-RU.svg",
  },
];

const SelectList = styled(Select)`
  position: fixed;
  top: 24px;
  right: 12px;
  transform: translate(0, -50%);
`;

const SelectItem = styled(MenuItem)`
  min-height: 24px;
`;

const SelectItemImage = styled.img`
  width: 20px
  margin: 0 7px;
`;

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <SelectList
      value={i18n.language}
      onChange={e => {
        if (e.target) {
          i18n.changeLanguage(e.target.value as string);
          store.lang = e.target.value as string;
        }
      }}
      autoWidth
    >
      {availableLanguages.map((lang, id) => {
        return (
          <SelectItem key={`lang-item-${id}`} value={lang.locale}>
            <SelectItemImage src={lang.image} />
            {lang.name}
          </SelectItem>
        );
      })}
    </SelectList>
  );
};
