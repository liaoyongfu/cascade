import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { DivisionItem } from 'ad-hooks/typings';
import { getLen, getParents } from 'ad-hooks';
import Item from '../Item';
import './Division.css';

export interface DivisionProps {
    /**
     * 数据源
     * @default []
     */
    options: DivisionItem[],
    /**
     * 控件值
     */
    value: string | undefined,
    /**
     * 值更改时的回调函数，参数 code 表示更改后的值
     */
    onChange: (code: string | undefined) => void;
    /**
     * 给每个 select 项增加样式
     */
    style: CSSProperties;
    /**
     * 是否禁用，如果为数字，则小于等于当前值的索引的项为禁用状态
     */
    disabled: boolean | number;
    /**
     * 隐藏 options 为空的项
     */
    hideEmptyItem?: boolean;
    /**
     * 层级数，如果为指定则自动根据 options 层级计算
     */
    col?: number;
    /**
     * 显示加载中
     */
    loading?: boolean;
}

const Division = ({
  options, style, value, onChange, disabled, hideEmptyItem, col, loading
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

  const len = col || getLen(options);
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
            isLoading={loading}
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
  options: [],
  disabled: false,
  hideEmptyItem: false
};

export default Division;
