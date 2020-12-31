import React, { useCallback, useState } from 'react';
import { dealDivision, useDivision } from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const HideEmptyItem = () => {
  const [value, setValue] = useState<string | undefined>('350203000000');
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve(dealDivision({
      data: mock
    })), [])
  });
  return (
    <div>
      <Division
        hideEmptyItem
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

export default HideEmptyItem;
