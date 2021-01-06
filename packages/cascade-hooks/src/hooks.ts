import { useCallback, useEffect, useState } from 'react';
import { CascadeItem } from '../typings';

interface DivisionProps{
    // 数据源，须为 useCallback
    dataSource: (() => Promise<CascadeItem[]>) | CascadeItem[];
}

// eslint-disable-next-line import/prefer-default-export
export const useDivision = ({
  dataSource
}: DivisionProps) => {
  const [options, setOptions] = useState<CascadeItem[]>([]);

  const fetchDivision = useCallback(async () => {
    const response = typeof dataSource === 'function' ? await dataSource() : dataSource;
    setOptions(response);
  }, [typeof dataSource === 'function' ? dataSource : JSON.stringify(dataSource)]);

  useEffect(() => {
    fetchDivision();
  }, [fetchDivision]);

  return {
    options
  };
};
