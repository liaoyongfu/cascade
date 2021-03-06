/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { CascadeItem } from 'cascade-hooks/typings';
import { getLen, getParents } from 'cascade-hooks';
import Item from '../Item';
import './Division.css';

export interface DivisionProps {
    /**
     * 数据源
     * @default []
     */
    options: CascadeItem[],
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
     * 显示加载中（每个均会加，如果想单独控制，请使用 itemProps 实现
     */
    loading?: boolean;
    /**
     * 配置每项 Select 组件的属性，配置项详见 shareui 的 Select 组件文档
     */
    itemProps?: Record<any, any>[];
}

const Division = ({
  options, style, value, onChange, disabled, hideEmptyItem, col, loading, itemProps
}: DivisionProps) => {
  const handleChange = (opt: CascadeItem, allParents: CascadeItem[], index: number) => {
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
            onChange={(option: CascadeItem) => handleChange(option, allParents, index)}
            options={itemOptions}
            {...(itemProps ? itemProps[index] : {})}
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
