import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { Data } from 'ad-hooks/typings';
import Item from '../Item';
import './Division.css';

export interface DivisionProps {
    division: {
        data: Data,
        // 显示市
        showCity: boolean;
        // 显示区
        showDistrict: boolean;
        // 显示街道
        showStreet: boolean;
        // 显示社区
        showCommunity: boolean;
    },
    value: string | undefined,
    onChange: (code: string | undefined) => void;
    style: CSSProperties;
}

const Division = ({
  division, style
}: DivisionProps) => {
  const {
    data, showCity, showCommunity, showDistrict, showStreet
  } = division;
  const {
    city, community, district, street
  } = data;
  const cityOptions = city;
  const districtOptions = district;
  const streetOptions = street;
  const communityOptions = community;
  const len = [showCity, showDistrict, showStreet, showCommunity].filter((item) => item).length;

  return (
    <div
      className={cn('administrative-division', {
        [`ad-len-${len}`]: true
      })}
      style={style}
    >
      {showCity && <Item options={cityOptions} />}
      {showDistrict && <Item options={districtOptions} />}
      {showStreet && <Item options={streetOptions} />}
      {showCommunity && <Item options={communityOptions} />}
    </div>
  );
};

export default Division;
