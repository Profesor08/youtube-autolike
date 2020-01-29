import React from "react";
import Box from "@material-ui/core/Box";
import { DonateButton } from "./DonateButton";
import { PayPalIcon, CoffeeIcon } from "./icons";
import styled from "styled-components";

export const FooterContainer = styled(Box)`
  padding: 0 16px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <DonateButton
        delay={5}
        title="Donate with PayPal"
        href="https://www.paypal.me/ewebdev/10"
      >
        <PayPalIcon />
      </DonateButton>

      <DonateButton
        delay={8}
        title="Buy Me A Coffee"
        href="https://www.buymeacoffee.com/Pd3iVsZ"
      >
        <CoffeeIcon />
      </DonateButton>
    </FooterContainer>
  );
};
