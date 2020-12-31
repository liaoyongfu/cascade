import React, { useCallback, useState } from 'react';
import { useDivision, dealDivision } from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const Basic = () => {
  const [value, setValue] = useState<string | undefined>();
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve(dealDivision({
      data: mock
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

export default Basic;
