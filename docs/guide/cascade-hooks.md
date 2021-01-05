---
title: cascade-hooks
order: 3
group:
    title: 指南
    order: 2
---

## cascade-hooks 介绍

cascade-hooks 主要作为工具包依赖，不会直接使用，提供一些工具方法。

## Hooks

### useDivision

获取数据：

````
const { options } = useDivision({
    // 数据源，须为 useCallback
    dataSource: (() => Promise<CascadeItem[]>) | CascadeItem[]
});
````

## Utils

### dealDivision

- 参数: 
````
{
    data: CascadeItem[],
    levelMethods?: ((code: string) => boolean)[]
}
````
- 返回: CascadeItem[]

将平级数据改为嵌套数据。

### isCity

````
const isCity = (code: string) => code.substr(4) === '00000000';
````

判断是否为市。

### isDistrict

````
const isDistrict = (code: string) => code.substr(4) !== '00000000' && code.substr(6) === '000000';
````

判断是否为区。

### isStreet

````
const isStreet = (code: string) => code.substr(4) !== '00000000' && code.substr(6) !== '000000' && code.substr(9) === '000';
````

判断是否为街道。

### isCommunity

````
const isCommunity = (code: string) => code.substr(10) !== '00';
````

判断是否为社区。

### getLen

````
getLen(options: CascadeItem[]) => levelCount
````

获取数据层级数。

### getParents

````
getParents(options: CascadeItem[], value: string | undefined) => CascadeItem[]
````

获取所有父级项数据。
