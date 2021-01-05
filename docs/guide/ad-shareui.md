---
title: ad-shareui
order: 1
---

## ad-shareui 介绍

适配 PC 端的级联选择器。

## 示例

### 基本使用

````jsx
import React, {useState, useCallback} from 'react';
import {Division} from 'ad-shareui';

export default () => {
    const [value, setValue] = useState('350201');
    const options  = [
        {
            label: '福建省',
            value: '3502',
            children: [
                {
                    label: '厦门市',
                    value: '350201',
                    children: [
                        {
                            label: '思明区',
                            value: '350201001'
                        },
                        {
                            label: '湖里区',
                            value: '350201002'
                        }
                    ]
                },
                {
                    label: '泉州市',
                    value: '350202',
                    children: [
                        {
                            label: '安溪县',
                            value: '350202001'
                        }
                    ]
                }
            ]
        }
    ];
    return (
        <div>
            <Division
                col={3}
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
            <p>控件值: {value}</p>
        </div>
    );
};
````

### 带初始值

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const [value, setValue] = useState('350203001011');
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve(dealDivision({
            data: mockData,
            levelMethods: [
                isDistrict,
                isStreet,
                isCommunity
            ]
        })), [])
    });
    return (
        <div>
            <Division
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};

````
### 禁用状态

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const [value, setValue] = useState('350203003001');
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve(dealDivision({
            data: mockData
        })), [])
    });
    return (
        <div>
            <Division
                disabled
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};
````

### 部分禁用

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const initialCode = '350203003000';
    const [value, setValue] = useState(initialCode);
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve(dealDivision({
            data: mockData,
        })), [])
    });
    let disabledIndex = false;
    // 用户自行判断禁用层级
    if (isCommunity(initialCode)) {
        disabledIndex = 3;
    } else if (isStreet(initialCode)) {
        disabledIndex = 2;
    } else if (isDistrict(initialCode)) {
        disabledIndex = 1;
    } else if (isCity(initialCode)) {
        disabledIndex = 0;
    }
    return (
        <div>
            <Division
                disabled={disabledIndex}
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};
````

### 控制显示数量/层级

只展示区、街道、社区：

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const initialCode = '';
    const [value, setValue] = useState(initialCode);
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve(dealDivision({
            data: mockData,
            levelMethods: [
                isDistrict,
                isStreet,
                isCommunity
            ]
        })), [])
    });
    return (
        <div>
            <Division
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};
````

或者可以通过`col`属性控制层级数：

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const initialCode = '';
    const [value, setValue] = useState(initialCode);
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve(dealDivision({
            data: mockData
        })), [])
    });
    return (
        <div>
            <Division
                col={2}
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};
````

### 自定义级联选择器

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'ad-hooks';
import {Division} from 'ad-shareui';

const mockData = [
    {
        label: '福建省',
        value: '3502'
    },
    {
        label: '厦门市',
        value: '350201'
    },
    {
        label: '思明区',
        value: '350201001'
    },
    {
        label: '湖里区',
        value: '350201002'
    },
    {
        label: '泉州市',
        value: '350202'
    },
    {
        label: '安溪县',
        value: '350202001'
    },
    {
        label: '广东省',
        value: '3501'
    },
    {
        label: '深圳',
        value: '350101'
    },
    {
        label: '广州',
        value: '350102'
    },
    {
        label: '汕头',
        value: '350103'
    }
];

export default () => {
    const [value, setValue] = useState();
    const {options} = useDivision({
        dataSource: dealDivision({
            data: mockData,
            levelMethods: [
                (code) => code.length === 4,
                (code) => code.length === 6,
                (code) => code.length === 9
            ]
        })
    });
    return (
        <div>
            <Division
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
};
````

### 自定义数据源

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

export default () => {
    const [value, setValue] = useState();
    const {options} = useDivision({
        dataSource: useCallback(() => Promise.resolve([
            // 厦门市自行添加上去
            {
                label: '厦门市',
                value: '350200000000'
            },
            ...dealDivision({
                data: mockData,
                levelMethods: [
                    isDistrict,
                    isStreet,
                    isCommunity
                ]
            })
        ]), [])
    });
    return (
        <div>
            <Division
                style={{width: 800}}
                options={options}
                value={value}
                onChange={(code) => {
                    setValue(code);
                }}
            />
        </div>
    );
}
````

<API src="../../packages/ad-shareui/components/Division/Division.tsx"></API>
