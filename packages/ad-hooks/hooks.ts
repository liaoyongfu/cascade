import { useCallback, useEffect, useState } from 'react';
import { DivisionItem } from './typings';

interface DivisionProps{
    // 数据源，须为 useCallback
    dataSource: (() => Promise<DivisionItem[]>) | DivisionItem[];
}

// eslint-disable-next-line import/prefer-default-export
export const useDivision = ({
  dataSource
}: DivisionProps) => {
  const [options, setOptions] = useState<DivisionItem[]>([]);

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
