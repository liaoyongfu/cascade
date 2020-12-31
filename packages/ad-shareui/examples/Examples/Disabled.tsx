import React, { useCallback, useState } from 'react';
import { dealDivision, useDivision } from 'ad-hooks';
import { Division } from 'ad-shareui';
import mock from '../../../../mock/allData.json';

const Disabled = () => {
  const [value, setValue] = useState<string | undefined>('350203003001');
  const { options } = useDivision({
    dataSource: useCallback(() => Promise.resolve(dealDivision({
      data: mock
    })), [])
  });
  return (
    <div>
      <Division
        disabled
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

export default Disabled;
