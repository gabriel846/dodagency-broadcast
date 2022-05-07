// Packages
import React from "react";

export function Loading(props) {
  const { containerStyle, message, textStyle } = props;

  return (
    <div style={containerStyle}>
      <h1 style={textStyle}>{message}</h1>
    </div>
  );
}
