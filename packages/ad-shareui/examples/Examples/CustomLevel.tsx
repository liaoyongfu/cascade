import React, { useCallback, useState } from 'react';
import {
  useDivision, dealDivision, isCommunity, isDistrict, isStreet
} from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const CustomShow = () => {
  const [value, setValue] = useState<string | undefined>();
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve([
      // 厦门市自行添加上去
      {
        label: '厦门市',
        value: '350200000000'
      },
      ...dealDivision({
        data: mock,
        levelMethods: [
          isDistrict,
          isStreet,
          isCommunity
        ]
      })
    ]), [])
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

export default CustomShow;
