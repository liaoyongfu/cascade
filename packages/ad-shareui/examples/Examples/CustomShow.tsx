import React, { useCallback, useState } from 'react';
import { dealDivision, useDivision, isStreet } from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const CustomShow = () => {
  const [value, setValue] = useState<string | undefined>();
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve(dealDivision({
      data: mock,
      levelMethods: [
        (code: string) => code.substr(4) !== '00000000' && code.substr(6) === '000000',
        isStreet
      ]
    })), [])
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
