import { useCallback, useEffect, useState } from 'react';
import { Data, DivisionItem } from './typings';
import dealDivision from './utils/dealDivision';
import {
  isCity as defaultIsCity,
  isCommunity as defaultIsCommunity,
  isDistrict as defaultIsDistrict,
  isStreet as defaultIsStreet
} from './utils/utils';

interface DivisionProps {
    // 数据源，须为 useCallback
    dataSource: () => Promise<DivisionItem[]>;
    // 显示市
    showCity?: boolean;
    // 显示区
    showDistrict?: boolean;
    // 显示街道
    showStreet?: boolean;
    // 显示社区
    showCommunity?: boolean;
    // 初始值
    initialCode?: string;
    isCity?: (code: string) => boolean;
    isDistrict?: (code: string) => boolean;
    isStreet?: (code: string) => boolean;
    isCommunity?: (code: string) => boolean;
}

// eslint-disable-next-line import/prefer-default-export
export const useDivision = ({
  dataSource,
  showCity = true,
  showCommunity = true,
  showDistrict = true,
  showStreet = true,
  initialCode,
  isCity = defaultIsCity,
  isCommunity = defaultIsCommunity,
  isDistrict = defaultIsDistrict,
  isStreet = defaultIsStreet
}: DivisionProps) => {
  const [data, setData] = useState<Data>({
    city: [],
    district: [],
    street: [],
    community: []
  });

  const fetchDivision = useCallback(async () => {
    const response = await dataSource();
    setData(dealDivision(response, {
      isCity,
      isCommunity,
      isDistrict,
      isStreet
    }));
  }, [dataSource]);

  useEffect(() => {
    fetchDivision();
  }, [fetchDivision]);

  return {
    division: {
      data,
      showCity,
      showStreet,
      showDistrict,
      showCommunity,
      initialCode
    }
  };
};
