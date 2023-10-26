import React from 'react';
import Radio from '../Radio/Radio';
import styled from 'styled-components';

function RadioGroup({ data, name, value, defaultChecked, text, onChange }) {
  return (
    <RadioGroupWrap>
      {data?.map(item => {
        return (
          <Radio
            key={item.id}
            id={item.id}
            name={name}
            value={item.value}
            text={item.text}
            defaultChecked={item.defaultChecked}
            onChange={onChange}
          />
        );
      })}
    </RadioGroupWrap>
  );
}

const RadioGroupWrap = styled.span`
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
`;

export default RadioGroup;
