import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./components/LanguageSeletor";
import { ChannelsList } from "./components/ChannelsList";
import {
  ThemeProvider,
  StylesProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { OptionsTab } from "./components/OptionsTab";
import { Footer, FooterContainer } from "./components/Footer";
import styled from "styled-components";

const outerTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red,
  },
});

const OptionsPage = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 500px;

  ${FooterContainer} {
    margin-top: auto;
  }
`;

export const App = () => {
  const [tab, setTab] = useState("options");
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={outerTheme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <OptionsPage>
          <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={(_, tab: string) => {
                setTab(tab);
              }}
              centered={false}
            >
              <Tab value="options" label={t("optionsTab")} />
              <Tab value="channels" label={t("channelsTab")} />
            </Tabs>
          </AppBar>

          <LanguageSelector />

          <Box pt={2} pb={2}>
            <Container>
              <OptionsTab active={tab === "options"} />
              <Typography component="div" hidden={tab !== "channels"}>
                <ChannelsList />
              </Typography>
            </Container>
          </Box>

          <Footer />
        </OptionsPage>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default App;
