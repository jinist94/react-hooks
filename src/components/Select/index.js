import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = ({
  data,
  label,
  placeholder,
  block = false,
  required = false,
  invalid = false,
  disabled = false,
  wrapperProps,
  ...props
}) => {
  // data는 string과 object 형태로 받을 수 있다.
  // Object { label: string, value: string};

  // string으로 들어오면 object로 변환
  const formattedData = data.map((item) => (typeof item === "string" ? { label: item, value: item } : item));

  const options = formattedData.map((item) => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ));

  if (placeholder) {
    // hidden 속성을 사용해서 옵션을 선택했을 때는 보이지 않게 처리
    options.unshift(
      <option key="placeholder" value="" hidden>
        {placeholder}
      </option>
    );
  }

  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect invalid={invalid} required={required} disabled={disabled} {...props}>
        {options}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
