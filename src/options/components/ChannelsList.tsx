import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import store, { IChannel } from "../../store";
import makeStyles from "@material-ui/core/styles/makeStyles";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { Message } from "./Message";

const useStyles = makeStyles({
  channelsList: {
    maxHeight: 300,
    overflowY: "auto",
    overflowX: "hidden",
  },

  listItem: {
    padding: "5px 0",
  },

  listItemText: {
    margin: 0,
  },

  primaryText: {
    fontSize: 14,
  },

  secondaryText: {
    fontSize: 12,
  },

  deleteIcon: {
    width: 20,
    height: 20,
    color: grey[500],
  },

  fabButton: {
    background: "transparent",
    boxShadow: "none",
    transition: "ease background-color 150ms",
    "&:hover, &:focus": {
      background: grey[200],
      boxShadow: "none",
    },
  },

  seachInput: {
    width: "100%",
  },
});

const ChannelsListHeader = styled.h4`
  margin: 0;
`;

const SearchInput = styled(TextField)`
  width: 100%;
`;

const ChannelsListBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 8px;
`;

const ChannelItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 0;
`;

const ChannelImage = styled.div`
  border-radius: 50%;
  background: ${grey[200]};
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border: 1px solid white;
  margin-right: 8px;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border-style: none;

    &:not([src]) {
      display: none;
    }
  }
`;

const ChannelText = styled.div`
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const ChannelName = styled.a`
  color: ${grey[800]};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

const ChannelId = styled.div`
  margin: 0;
  font-size: 11px;
`;

const ChannelButton = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: ease background-color 150ms;

  &:hover {
    cursor: pointer;
    background: ${grey[200]};
  }

  &:active {
    background: ${grey[300]};
  }
`;

export const ChannelsList = observer(() => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const style = useStyles();

  const listItems: React.ReactNode[] = store.channels
    .filter(channel => {
      if (search.trim().length > 0) {
        return channel.name.includes(search);
      }

      return true;
    })
    .reduce((acc: React.ReactNode[], channel: IChannel, id) => {
      acc.push(
        <ChannelItem key={`channel-item-${id}`}>
          <ChannelImage>
            <img src={channel.image} />
          </ChannelImage>
          <ChannelText>
            <ChannelName
              href={`https://www.youtube.com/channel/${channel.id}`}
              target="_blank"
            >
              {channel.name}
            </ChannelName>
            <ChannelId>{channel.id}</ChannelId>
          </ChannelText>
          <ChannelButton onClick={() => store.removeChannel(channel)}>
            <DeleteIcon className={style.deleteIcon} />
          </ChannelButton>
        </ChannelItem>,
      );

      if (id < store.channels.length - 1) {
        acc.push(<Divider key={`channel-divider-${id}`} />);
      }

      return acc;
    }, []);

  return (
    <Box>
      <ChannelsListHeader>{t("channelsList")}</ChannelsListHeader>
      <SearchInput
        value={search}
        placeholder={t("search")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={e => {
          if (e.target) {
            setSearch(e.target.value);
          }
        }}
      />
      <ChannelsListBox>
        {listItems.length === 0 ? (
          <Message warn>{t("listIsEmty")}</Message>
        ) : (
          listItems
        )}
      </ChannelsListBox>
    </Box>
  );
});
