import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import AutoIconSvg from "./svg/auto-icon.svg";
import RemoveIconSvg from "./svg/remove-icon.svg";
import SearchIconSvg from "./svg/search-icon.svg";
import CoffeeIconSvg from "./svg/coffee-icon.svg";
import PayPalIconSvg from "./svg/paypal-icon.svg";

export const AutoIcon = () => {
  return <SvgIcon component={AutoIconSvg} viewBox="0 0 480 480" />;
};

export const RemoveIcon = () => {
  return <SvgIcon component={RemoveIconSvg} viewBox="0 0 426.67 426.67" />;
};

export const SearchIcon = () => {
  return <SvgIcon component={SearchIconSvg} viewBox="0 0 310.42 310.42" />;
};

export const CoffeeIcon = () => {
  return <SvgIcon component={CoffeeIconSvg} viewBox="0 0 24 36" />;
};

export const PayPalIcon = () => {
  return <SvgIcon component={PayPalIconSvg} viewBox="0 0 468.78 468.78" />;
};
