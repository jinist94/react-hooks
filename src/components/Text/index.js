import "./Text.css";

import PropTypes from "prop-types";

const Text = ({ children, size, strong, underline, color, block, paragraph, delete: del, mark, code, ...props }) => {
  const fontStyle = {
    fontWeight: strong ? "bold" : undefined,
    fontSize: typeof size === "number" ? size : undefined,
    textDecoration: underline ? "underline" : "undefined",
    color,
  };

  // 동적 태그 설정
  const Tag = block ? "div" : paragraph ? "p" : "span";

  // 중첩 가능

  if (mark) {
    children = <mark>{children} </mark>;
  }
  if (code) {
    children = <code>{children} </code>;
  }
  if (del) {
    children = <del>{children} </del>;
  }

  return (
    <Tag
      className={typeof fontSize === "string" ? `Text--size==${size}` : undefined}
      style={{ ...props.style, ...fontStyle }}
      {...props}
    >
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  delete: PropTypes.bool,
  code: PropTypes.bool,
  mark: PropTypes.bool,
  strong: PropTypes.bool,
  underline: PropTypes.bool,
  color: PropTypes.string,
};

export default Text;
