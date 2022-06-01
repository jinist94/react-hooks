const { useState, useCallback, useEffect, useRef } = require("react");

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = useCallback(() => setState(true), []); // 함수 저장하기
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);

      return () => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
