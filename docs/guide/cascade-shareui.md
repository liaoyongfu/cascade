---
title: cascade-shareui
order: 1
---

## cascade-shareui 介绍

适配 PC 端的级联选择器。

## 示例

### 基本使用

````jsx
import React, {useState, useCallback} from 'react';
import {Division} from 'cascade-shareui';

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
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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
import {useDivision, dealDivision} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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

手动控制显示项：

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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

或者可以通过`col`属性控制前面层级数：

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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
import {useDivision, dealDivision} from 'cascade-hooks';
import {Division} from 'cascade-shareui';

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
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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

### 控制每项的属性

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision, isDistrict, isStreet, isCommunity} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

export default () => {
    return (
        <Division
            style={{width: 800}}
            options={[
                {
                    label: '思明区',
                    value: '350201',
                    children: [
                        {
                            label: 'SIM街道',
                            value: '35020101',
                            children: []
                        }
                    ]
                }
            ]}
            itemProps={[
                {
                    placeholder: '全部区'
                },
                {
                    placeholder: '全部街道',
                    isLoading: true
                },
                {
                    placeholder: '全部社区'
                }
            ]}
        />
    )
};
````

### 适配 @share/shareui-form

````jsx
import React, {useState, useCallback} from 'react';
import { Panel } from '@share/shareui';
import {Division} from 'cascade-shareui';
import "bootstrap/dist/css/bootstrap.min.css";
import "@share/shareui-html/dist/shareui.css";
import { createForm, getComponents } from '@share/shareui-form';

const { Form, Row, FormItem, Input } = getComponents('search');

// 可以直接包装在项目中作为组件
const CascadeWithForm = props => (
    <FormItem {...props}>
        {({value, onChange}) => (
            <Division
                value={value}
                onChange={code => onChange({
                    target: {
                        value: code
                    }
                })}
                options={[
                    {
                        label: '思明区',
                        value: '350201',
                        children: [
                            {
                                label: 'SIM街道',
                                value: '35020101',
                                children: []
                            }
                        ]
                    }
                ]}
            />
        )}
    </FormItem>
);

export default createForm(
    {
        division: '',
        name: ''
    },
    'form'
)(({ form }) => {
    const formValid = () => {
        alert('校验');
    }
    return (
        <div className="ui-box">
            <Panel>
                <Panel.Head title="标题"/>
                <Form.Fragment pageType="queryPage" formState={form}>
                    <Form.View query={formValid}>
                        <CascadeWithForm field="division" label="行政区划" col={6} />
                        <Input field="name" label="地址名称" col={3} />
                    </Form.View>
                </Form.Fragment>
            </Panel>
        </div>
    )
});
````

<API src="../../packages/cascade-shareui/components/Division/Division.tsx"></API>

CascadeItem 类型如下：

````
interface CascadeItem {
    label: string;
    value: string;
    children?: CascadeItem[];
    [prop: string]: any;
}
````
