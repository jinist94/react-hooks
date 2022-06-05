import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

const Rail = styled.div`
  position: absolute;
  top: 6px;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: #aaa;
`;

const Handle = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
  border: 2px solid #44b;
  border-radius: 50%;
  background-color: white;
  cursor: gray;
`;

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 4px;
  border-radius: 2px;
  background-color: #44b;
`;

const Slider = ({ min = 0, max = 100, step = 0.1, defaultValue, onChange, ...props }) => {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [value, setValue] = useState(defaultValue ? defaultValue : min);

  const handleMouseDown = useCallback(() => {
    setDragging(true);
  }, []);

  const handleMouseUp = useCallback((e) => {
    setDragging(false);
  }, []);

  useEffect(() => {
    // useEffect에서 전역으로 사용하는 이유는 마우스가 컴포넌트 바깥으로 벗어나면 이벤트가 멈추기 때문
    const handleMouseMove = (e) => {
      if (!dragging) {
        return;
      }

      const handleOffset = e.pageX - sliderRef.current.offsetLeft; // 드래그하는 마우스 위치
      const sliderWidth = sliderRef.current.offsetWidth;

      const track = handleOffset / sliderWidth;

      let newValue;

      if (track < 0) {
        newValue = min;
      } else if (track > 1) {
        newValue = max;
      } else {
        // 마우스가 트랙 안에 위치할 때
        // newValue = min + (max - min) * track;
        newValue = Math.floor(min + ((max - min) * track) / step) * step;
        newValue = Math.min(max, Math.max(min, newValue));
        // min과 max의 값에서 벗어나지 않도록 재 계산
      }
      setValue(newValue);
      onChange && onChange(newValue);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [value, min, max, dragging, sliderRef, handleMouseUp, onChange, step]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <SliderContainer ref={sliderRef} {...props}>
      <Rail />
      <Track style={{ width: `${percentage}%` }} />
      <Handle onMouseDown={handleMouseDown} style={{ left: `${percentage}%` }} />
    </SliderContainer>
  );
};

export default Slider;
