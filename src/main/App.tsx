import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { AutoIcon } from "../options/components/icons";
import store, { IChannel } from "../store";
import { ButtonControl } from "./components/ButtonControl";
import { likeVideo } from "./utils";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyle = makeStyles({
  tooltip: {
    "&.__react_component_tooltip.type-dark": {
      background: "rgb(97, 97, 97)",

      "&.show": {
        opacity: 1,
      },

      "&:after": {
        borderTopColor: "rgb(97, 97, 97)",
      },
    },
  },

  youtubeAutolikeControlsList: {
    position: "relative",
    top: 2,
    display: "flex",
  },
});

const toggleLiking = (channel: IChannel | null) => {
  if (channel) {
    const isActiveChannel = store.hasChannel(channel);

    if (isActiveChannel) {
      store.removeChannel(channel);
    } else {
      store.addChannel(channel);
    }

    likeVideo();
  }
};

const ConstrolsList = observer(() => {
  const style = useStyle();
  const { t } = useTranslation();

  const isActiveChannel = store.hasChannel(store.channel);

  return (
    <div className={style.youtubeAutolikeControlsList}>
      <ButtonControl
        title={t("channelAutoLike")}
        active={isActiveChannel}
        animated={!isActiveChannel}
        click={() => {
          toggleLiking(store.channel);
        }}
      >
        <AutoIcon />
      </ButtonControl>
    </div>
  );
});

const App = () => {
  return (
    <div className="youtube-autolike-app">
      <ConstrolsList />
    </div>
  );
};

export default App;
