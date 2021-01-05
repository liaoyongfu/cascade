---
title: 介绍
---

# 快速开始

级联选择器，主要包括：

- cascade-hooks：工具库
- cascade-shareui：适配 shareui 的行政区划组件
- cascade-mshareui：适配 mshareui 的行政区划组件

## 特性

- 可控级联选择器
- 提供处理数据工具方法
- 对行政区划提供支持

## 快速上手

### 安装

````
// PC 端组件
yarn add cascade-shareui
// H5 端组件
yarn add cascade-mshareui
````

### 使用

````jsx
import React, {useState, useCallback} from 'react';
import {useDivision, dealDivision} from 'cascade-hooks';
import {Division} from 'cascade-shareui';
import mockData from 'cascade-hooks/mock/allData.json';

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
