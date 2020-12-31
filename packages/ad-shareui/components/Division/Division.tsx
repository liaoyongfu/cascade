import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { DivisionItem } from 'ad-hooks/typings';
import { getLen, getParents } from 'ad-hooks';
import Item from '../Item';
import './Division.css';

export interface DivisionProps {
    options: DivisionItem[],
    value: string | undefined,
    onChange: (code: string | undefined) => void;
    style: CSSProperties;
    disabled: boolean | number;
    initialCode?: string;
    // 隐藏 options 为空
    hideEmptyItem?: boolean;
}

const Division = ({
  options, style, value, onChange, disabled, hideEmptyItem
}: DivisionProps) => {
  const handleChange = (opt: DivisionItem, allParents: DivisionItem[], index: number) => {
    if (opt) {
      onChange(opt?.value);
    } else if (index > 0) {
      onChange(allParents[index - 1].value);
    } else {
      onChange(undefined);
    }
  };
  const len = getLen(options);

  const allParents = getParents(options, value);
  return (
    <div
      className={cn('administrative-division', {
        [`ad-len-${len}`]: true
      })}
      style={style}
    >
      {[...Array(len).keys()].map((_, index) => {
        const itemOptions = index === 0 ? options : allParents[index - 1]?.children ?? [];
        if (hideEmptyItem && itemOptions.length === 0) return null;
        return (
          <Item
            disabled={typeof disabled === 'number' ? index <= disabled : disabled}
            value={allParents[index]}
            onChange={(option: DivisionItem) => handleChange(option, allParents, index)}
            options={itemOptions}
          />
        );
      })}
    </div>
  );
};

Division.defaultProps = {
  disabled: false,
  hideEmptyItem: false
};

export default Division;
