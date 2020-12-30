import React, { useCallback } from 'react';
import { render } from 'react-dom';
import { useDivision } from 'ad-hooks';
import mock from '../../../mock/allData.json';
import '@share/shareui-html';
import Division from '../components/Division';

const Demo = () => {
  const { division } = useDivision({
    dataSource: useCallback(() => Promise.resolve(mock), [])
  });
  return (
    <div>
      <Division
        style={{ width: 800, margin: 30 }}
        division={division}
        value=""
        onChange={(code) => {
          console.info('change code:', code);
        }}
      />
    </div>
  );
};

render(
  <Demo />,
  document.getElementById('root')
);
