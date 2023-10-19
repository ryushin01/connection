import React from 'react';
import Radio from '../Radio/Radio';
import './RadioGroup.scss';

const RadioGroup = props => {
  // props
  // name: [String]
  // value: [String]
  // text: [String]
  // defaultChecked: [String]
  const { name, data } = props;

  return (
    <div className="radio-group">
      {data.map(item => {
        return (
          <Radio
            key={item.id}
            name={name}
            value={item.value}
            text={item.text}
            defaultChecked={item.defaultChecked}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
