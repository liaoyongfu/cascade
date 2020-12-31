import React, { useCallback, useState } from 'react';
import {
  useDivision, dealDivision, isCity, isCommunity, isDistrict, isStreet
} from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const DisabledDefault = () => {
  const initialCode = '350203003000';
  const [value, setValue] = useState<string | undefined>(initialCode);
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve(dealDivision({
      data: mock,
    })), [])
  });
  let disabledIndex: boolean | number = false;
  // 用户自行判断禁用层级
  if (isCommunity(initialCode)) {
    disabledIndex = 3;
  } else if (isStreet(initialCode)) {
    disabledIndex = 2;
  } else if (isDistrict(initialCode)) {
    disabledIndex = 1;
  } else if (isCity(initialCode)) {
    disabledIndex = 0;
  }
  return (
    <div>
      <Division
        disabled={disabledIndex}
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

export default DisabledDefault;
