import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import store from "../../store";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import Slider from "@material-ui/core/Slider";

export const OptionsTab = observer(({ active }: { active: boolean }) => {
  const { t } = useTranslation();

  const marks = [
    {
      value: 1,
      label: `0${t("secondsShort")}`,
    },
    {
      value: 2.1,
      label: `30${t("secondsShort")}`,
    },
    {
      value: 4.7,
      label: `2${t("minutesShort")}`,
    },
    {
      value: 7.84,
      label: `5${t("minutesShort")}`,
    },
    {
      value: 10,
      label: `10${t("minutesShort")}`,
    },
  ];

  const timeValue = (
    x: number,
  ): {
    m: number;
    s: number;
  } => {
    const time = Math.round((1 - Math.log10(11 - x)) * 600);
    const m = Math.floor(time / 60);
    const s = time % 60;

    return { m, s };
  };

  const valueLabelFormat = (x: number): string => {
    const time = timeValue(x);

    return `${time.m}:${time.s < 10 ? "0" + time.s : time.s}`;
  };

  const likeDelayText = (x: number) => {
    const time = timeValue(x);

    return `${time.m}:${time.s < 10 ? "0" + time.s : time.s}${
      time.m > 0 ? t("minutesShort") : t("secondsShort")
    }`;
  };

  return (
    <Typography component="div" hidden={active === false}>
      <Box component="h4" m={0}>
        {t("likeAllVideos")}
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={store.likeAll}
            onChange={() => {
              store.likeAll = !store.likeAll;
            }}
          />
        }
        label={store.likeAll ? t("on") : t("off")}
      />
      <Box component="h4" m={0}>
        {t("likeDelay")}: {likeDelayText(store.likeDelay)}
      </Box>

      <Slider
        value={store.likeDelay}
        valueLabelDisplay="auto"
        marks={marks}
        step={0.1}
        min={1}
        max={10}
        onChange={(_, value) => {
          if (typeof value === "number") {
            store.likeDelay = value;
          }
          console.log(value);
        }}
        valueLabelFormat={valueLabelFormat}
      />
    </Typography>
  );
});
