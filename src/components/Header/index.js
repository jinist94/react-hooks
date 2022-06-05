import PropTypes from "prop-types";

export const Header = ({ children, level = 1, strong, underline, color, ...props }) => {
  let Tag = `h${level}`;

  if (level < 1 || level > 6) {
    // 예외처리 코드 필요
    console.warn('Header only accept "1|2|3|4|5|6"');
    Tag = "h1";
  }

  const fontStyle = {
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : "undefined",
    color,
  };

  return <Tag style={{ ...props.style, ...fontStyle }}>{children}</Tag>;
};

export default Header;

Header.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.number,
  strong: PropTypes.bool,
  underline: PropTypes.bool,
  color: PropTypes.string,
};
