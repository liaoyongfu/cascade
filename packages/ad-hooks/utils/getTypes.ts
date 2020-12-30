import { DivisionItem } from '../typings';

const filterOptions = (
  options: DivisionItem[],
  condition: (code: string) => boolean,
  code: string | undefined
) => {
  if (typeof code === 'undefined') return {};
  return {
    city: []
  };
};

export default filterOptions;
