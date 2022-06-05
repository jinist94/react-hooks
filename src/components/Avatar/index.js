import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ImageComponent from "../Image";
import PropTypes from "prop-types";
import AvatarGroup from "./AvatarGroup";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: #eee;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({ lazy, threshold, src, size = 70, shape = "circle", placeholder, alt, mode = "cover", ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
    // 이미지가 로드되었을 때 실행
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        laze={lazy}
        threshold={threshold}
        src={src}
        width={size}
        height={size}
        alt={alt}
        placeholder={placeholder}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  __TYPE: "Avatar",
};

Avatar.propTypes = {
  __TYPE: PropTypes.oneOf(["Avatar"]),
};

Avatar.Group = AvatarGroup;

export default Avatar;
