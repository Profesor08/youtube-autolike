import React from "react";
import styled, { keyframes } from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

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
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
`;

interface IButtonControlProps {
  title?: string;
  active?: boolean;
  children?: React.ReactChild;
  click?: React.MouseEventHandler;
  animated?: boolean;
}

interface IYoutubeAutolikeControlStyleProps {
  active?: boolean;
}

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

interface IButtonProps {
  active?: boolean;
}

const Button = styled.div<IButtonProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f2f2f3;
  transition: ease background-color 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e6e6e6;
    cursor: pointer;
  }

  svg {
    width: 20px;
    height: 20px;
    vertical-align: top;
    transition: ease fill 200ms;
    fill: ${props =>
      props.active ? "rgba(6, 95, 212, 1);" : "rgba(144, 144, 144, 1);"};
  }
`;

interface ITadaButtonProps {
  delay: number;
}

const TadaButton = styled(Button)<ITadaButtonProps>`
  animation-name: ${attentionAnimationTadaKeyframes};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: ${props => props.delay}s;
`;

export const ButtonControl = ({
  active,
  children,
  title,
  click,
  animated,
}: IButtonControlProps) => {
  const style = useStyle({
    active: active,
  });

  let button = null;

  if (animated) {
    button = (
      <TadaButton delay={5} onClick={click}>
        {children}
      </TadaButton>
    );
  } else {
    button = (
      <Button active={active} onClick={click}>
        {children}
      </Button>
    );
  }

  return (
    <Tooltip
      classes={{ tooltip: style.tooltip, arrow: style.tooltipArrow }}
      title={title}
      placement="top"
      arrow
    >
      <div>{button}</div>
    </Tooltip>
  );
};
