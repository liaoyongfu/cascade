import React from 'react';
import { Select } from '@share/shareui';
import { DivisionItem } from 'ad-hooks/typings';

interface ItemProps {
    options: DivisionItem[];
    disabled?: boolean;
    className?: string;
    [prop: string]: any;
}

const Item = ({
  options, disabled, className, ...rest
}: ItemProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Select options={options} inline disabled={disabled} className={className} {...rest} />
);

Item.defaultProps = {
  disabled: false,
  className: ''
};

export default Item;
