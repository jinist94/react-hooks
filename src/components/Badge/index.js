import styled from "@emotion/styled";

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 20px;
  color: white;
  background-color: #f44;
  transform: translate(50%, -50%);

  &.dot {
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
`;

const Badge = ({ children, showZero, dot = false, count, maxCount, backgroundColor, textColor, ...props }) => {
  const colorStyle = {
    backgroundColor,
    color: textColor,
  };

  let badge = null;
  if (count) {
    badge = <Super style={colorStyle}>{maxCount && count > maxCount ? `${maxCount}+` : count}</Super>;
  } else {
    if (count !== undefined) {
      badge = showZero ? <super style={colorStyle}>0</super> : null;
    } else if (dot) {
      badge = <Super className="dot" style={colorStyle} />;
    }
  }

  return (
    <BadgeContainer>
      {children}
      {badge}
    </BadgeContainer>
  );
};

export default Badge;
