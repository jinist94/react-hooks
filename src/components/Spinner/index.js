import React from "react";
import styled from "@emotion/styled";

const Icon = styled.i`
  display: inline-block;
`;

const Spinner = ({ size = 24, color = "#919eab", loading = true, ...props }) => {
  const sizeStyle = {
    width: size,
    height: size,
  };
  return loading ? (
    <Icon>
      <svg
        version="1.1"
        id="L3"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
        style={sizeStyle}
      >
        <circle fill="none" stroke="#fff" strokeWidth="4" cx="50" cy="50" r="44" style={{ opacity: 0.5 }} />
        <circle fill="#fff" stroke={color} strokeWidth="3" cx="8" cy="54" r="6">
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </Icon>
  ) : null;
};

export default Spinner;
