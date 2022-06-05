import styled from '@emotion/styled';
import Base from './Base';

// 컴포넌트를 받아서 쓸 수 있다.
const Circle = styled(Base)`
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  border-radius: 50%;
`;

export default Circle;
