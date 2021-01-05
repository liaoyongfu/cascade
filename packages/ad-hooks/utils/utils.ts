import { DivisionItem } from 'ad-hooks/typings';

export const isCity = (code: string) => code.substr(4) === '00000000';
export const isDistrict = (code: string) => code.substr(4) !== '00000000' && code.substr(6) === '000000';
export const isStreet = (code: string) => code.substr(4) !== '00000000' && code.substr(6) !== '000000' && code.substr(9) === '000';
export const isCommunity = (code: string) => code.substr(10) !== '00';

export const getChildren = (
  curItem: DivisionItem,
  data: DivisionItem[],
  levelMethods: LevelMethods,
  index: number
): DivisionItem[] => {
  if (index === levelMethods.length - 1) return [];
  if (index + 1 === levelMethods.length - 1) {
    return data.filter((item) => (
      levelMethods[index + 1](item.value) && !(levelMethods.slice(0, index + 1).some((levelMethod) => levelMethod(item.value))) && item.value.indexOf(curItem.value.replace(/0+?$/, '')) === 0
    ));
  }
  return data.filter((item) => levelMethods[index + 1](item.value)
      && !(levelMethods.slice(0, index + 1).some((levelMethod) => levelMethod(item.value)))
      && item.value.indexOf(curItem.value.replace(/0+?$/, '')) === 0).map((item) => ({
    ...item,
    children: getChildren(item, data, levelMethods, index + 1)
  }));
};

export type LevelMethods = ((code: string) => boolean)[];

export interface dealDivisionProps {
  data: DivisionItem[];
  levelMethods?: LevelMethods;
  compare?: (prev: DivisionItem, next: DivisionItem, preLevelMethod: (code: string) => boolean) => boolean;
}

// 处理行政区划数据
export const dealDivision = ({
  data = [],
  levelMethods = [isCity, isDistrict, isStreet, isCommunity]
}: dealDivisionProps) => {
  const dealedData: DivisionItem[] = [];
  for (let i = 0; i < levelMethods.length; i += 1) {
    const find = data.filter((item) => levelMethods[i](item.value));

    if (find.length > 0) {
      find.forEach((item) => {
        if (i === levelMethods.length - 1) {
          dealedData.push(item);
        } else {
          dealedData.push({
            ...item,
            children: getChildren(item, data, levelMethods, i)
          });
        }
      });
      break;
    }
  }

  return dealedData;
};

export const getLen = (options: DivisionItem[]) => {
  let maxLevel = 0;

  const mapOptions = (data: DivisionItem[], level: number) => {
    if (level > maxLevel) {
      maxLevel = level;
    }
    data.forEach((option) => {
      if (option.children) {
        mapOptions(option.children, level + 1);
      }
    });
  };

  mapOptions(options, 1);

  return maxLevel;
};

export
const getParents = (options: DivisionItem[], value: string | undefined) => {
  let allParents: DivisionItem[] = [];

  const mapOptions = (data: DivisionItem[], parents: DivisionItem[]) => {
    data.forEach((item) => {
      if (item.value === value) {
        allParents = [...parents, item];
      } else if (item.children) {
        mapOptions(item.children, [...parents, item]);
      }
    });
  };

  mapOptions(options, allParents);

  return allParents;
};
