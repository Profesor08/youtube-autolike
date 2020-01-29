import React from "react";
import styled from "styled-components";

const MessageText = styled.div`
  color: #fff;
  margin-left: 20px;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  line-height: 1;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  border: 1px solid rgba(144, 144, 144, 1);

  &:before {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
    font-size: 12px;
    line-height: 1;
  }

  &[data-type="default"] {
    background: #c3c3c3;
    border-color: #909090;

    ${MessageText} {
      margin: 0;
    }
  }

  &[data-type="success"] {
    background: #6ec071;
    border-color: #3d8b40;
  }

  &[data-type="error"] {
    background: #ff8585;
    border-color: #ff1f1f;
  }

  &[data-type="warn"] {
    background: #ffa32f;
    border-color: #c87000;
  }

  &[data-type="info"] {
    background: #51adf6;
    border-color: #0c7cd5;
  }

  &[data-type="success"]:before {
    content: "✔️";
  }

  &[data-type="error"]:before {
    content: "⛔";
    margin-top: -1px;
  }

  &[data-type="warn"]:before {
    content: "⚠️";
    margin-top: -1px;
  }

  &[data-type="info"]:before {
    content: "ℹ️";
    border: 1px solid black;
    background: #0078d7;
    width: 12px;
    height: 12px;
    font-size: 10px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type MessageType = "default" | "success" | "error" | "warn" | "info";

interface IMessageProps {
  children?: React.ReactNode;
  text?: string;
  success?: true;
  error?: true;
  warn?: true;
  info?: true;
}

export const Message = ({
  children,
  success,
  error,
  warn,
  info,
}: IMessageProps) => {
  const type: MessageType = success
    ? "success"
    : error
    ? "error"
    : warn
    ? "warn"
    : info
    ? "info"
    : "default";

  return (
    <MessageContainer data-type={type}>
      <MessageText>{children}</MessageText>
    </MessageContainer>
  );
};
