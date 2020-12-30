import { DivisionItem } from '../typings';

interface Types {
    isCity: (code: string) => boolean;
    isDistrict: (code: string) => boolean;
    isStreet: (code: string) => boolean;
    isCommunity: (code: string) => boolean;
}

const dealDivision = (data: DivisionItem[], types: Types) => {
  const {
    isCity, isCommunity, isDistrict, isStreet
  } = types;

  const city: DivisionItem[] = [];
  const district: DivisionItem[] = [];
  const street: DivisionItem[] = [];
  const community: DivisionItem[] = [];

  data.forEach((item) => {
    const { value } = item;
    if (isCity(value)) {
      city.push(item);
    } else if (isDistrict(value)) {
      district.push(item);
    } else if (isStreet(value)) {
      street.push(item);
    } else if (isCommunity(value)) {
      community.push(item);
    }
  });

  return {
    city,
    district,
    street,
    community
  };
};

export default dealDivision;
