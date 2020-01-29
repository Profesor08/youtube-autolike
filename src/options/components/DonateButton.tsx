import React from "react";
import styled, { keyframes, css } from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core";

const attentionAnimationTadaKeyframes = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.3, 1.3, 1.3) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
`;

const useStyle = makeStyles({
  tooltip: {
    fontSize: "12px",
    fontWeight: "normal",
    padding: 8,
    borderRadius: 2,
    background: "rgb(97, 97, 97)",
    color: "white",
  },

  tooltipArrow: {
    "&:before": {
      borderTopColor: "rgb(97, 97, 97)",
    },
  },
});

interface LinkButton {
  delay: number;
}

export const LinkButton = styled.a<LinkButton>`
  animation-name: ${attentionAnimationTadaKeyframes};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: ${props => props.delay}s;
`;

export const DonateButton = ({
  children,
  title = "",
  href = "",
  delay = 0,
}: {
  href: string;
  title: string;
  delay: number;
  children: React.ReactNode;
}) => {
  const style = useStyle();

  return (
    <LinkButton href={href} target="_blank" delay={delay}>
      <Tooltip
        classes={{ tooltip: style.tooltip, arrow: style.tooltipArrow }}
        title={title}
        placement="top"
        arrow
      >
        <IconButton>{children}</IconButton>
      </Tooltip>
    </LinkButton>
  );
};
