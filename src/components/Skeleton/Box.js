import styled from '@emotion/styled';
import Base from './Base';

// 컴포넌트를 받아서 쓸 수 있다.
const Box = styled(Base)`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
`;

export default Box;
