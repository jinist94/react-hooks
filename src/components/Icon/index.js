import { Buffer } from "buffer";
import styled from "@emotion/styled";

const IconWrapper = styled.i`
  display: inline-block;
`;

const Icon = ({ name, size = 16, rotate, strokeWidth = 2, color = "#222", ...props }) => {
  // feather icons 사용
  // https://feathericons.com/

  const wrapperStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    "stroke-width": strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const icon = require("feather-icons").icons[name];
  // icon 형식의 데이터를 받게 됨

  const svg = icon ? icon.toSvg(iconStyle) : "";

  // toSvg()를 통해 icon형태의 데이터를 svg코드로 변환할 수 있음.
  const base64 = Buffer.from(svg, "utf8").toString("base64");

  return (
    <IconWrapper {...props} style={wrapperStyle}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

export default Icon;
