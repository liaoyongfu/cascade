---
title: 快速开始
order: 0
---

# 快速开始

行政区划 react 组件，包括：

- ad-utils：工具库
- ad-shareui：适配 shareui 的行政区划组件
- ad-mshareui：适配 mshareui 的行政区划组件

## 特性

- 支持配置行政区划级联选择器
- 支持自定义层级数据

## 快速上手

### 安装

````
// PC 端组件
yarn add ad-shareui
// H5 端组件
yarn add ad-mshareui
````

### 使用

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'ad-hooks';
import {Division} from 'ad-shareui';
import mockData from 'ad-hooks/mock/allData.json';

const Basic = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const {options} = useDivision({
    dataSource: useCallback(() => new Promise(((resolve) => {
      setLoading(true);
      // 模拟接口调用
      setTimeout(() => {
        setLoading(false);
        resolve(dealDivision({
          data: mockData
        }));
      }, 1000);
    })), [])
  });
  return (
          <Division
                  loading={loading}
                  col={3}
                  style={{width: 800}}
                  options={options}
                  value={value}
                  onChange={(code) => {
                    setValue(code);
                  }}
          />
  );
};

export default Basic;
````
