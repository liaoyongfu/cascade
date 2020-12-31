import React, { useState } from 'react';
import { useDivision, dealDivision } from 'ad-hooks';
import { Division } from 'ad-shareui';

const mockData = [
  {
    label: '福建省',
    value: '3502'
  },
  {
    label: '厦门市',
    value: '350201'
  },
  {
    label: '思明区',
    value: '350201001'
  },
  {
    label: '湖里区',
    value: '350201002'
  },
  {
    label: '泉州市',
    value: '350202'
  },
  {
    label: '安溪县',
    value: '350202001'
  },
  {
    label: '广东省',
    value: '3501'
  },
  {
    label: '深圳',
    value: '350101'
  },
  {
    label: '广州',
    value: '350102'
  },
  {
    label: '汕头',
    value: '350103'
  }
];

const MultiSelect = () => {
  const [value, setValue] = useState<string | undefined>();
  const { options } = useDivision({
    dataSource: dealDivision({
      data: mockData,
      levelMethods: [
        (code: string) => code.length === 4,
        (code: string) => code.length === 6,
        (code: string) => code.length === 9
      ]
    })
  });
  return (
    <div>
      <Division
        style={{ width: 800 }}
        options={options}
        value={value}
        onChange={(code) => {
          setValue(code);
        }}
      />
    </div>
  );
};

export default MultiSelect;
