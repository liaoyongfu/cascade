# 行政区划 pc 端组件

## 安装

````
yarn add ad-shareui cascade-hooks
````

## 使用

````
import React from 'react';
import { useDivision } from 'cascade-hooks';
import { Division } from 'ad-shareui';

const Demo = () => {
    const [value, setValue] = useState();
    const { division } = useDivision();
    return (
        <div>
            <Division division={division} value={} onChange={} />
        </div>
    )
};
````