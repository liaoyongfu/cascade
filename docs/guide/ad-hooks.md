---
title: ad-hooks
order: 3
---

## ad-hooks 介绍

ad-hooks 主要作为工具包依赖，不会直接使用，提供一些工具方法。

## Hooks

### useDivision

获取数据：

````
const { options } = useDivision({
    // 数据源，须为 useCallback
    dataSource: (() => Promise<DivisionItem[]>) | DivisionItem[]
});
````

## Utils

### dealDivision

- 参数: 
````
{
    data: DivisionItem[],
    levelMethods?: ((code: string) => boolean)[]
}
````
- 返回: DivisionItem[]

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
getLen(options: DivisionItem[]) => levelCount
````

获取数据层级数。

### getParents

````
getParents(options: DivisionItem[], value: string | undefined) => DivisionItem[]
````

获取所有父级项数据。
