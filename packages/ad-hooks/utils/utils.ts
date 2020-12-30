export const isCity = (code: string) => code.substr(4) === '00000000';
export const isDistrict = (code: string) => code.substr(6) === '000000';
export const isStreet = (code: string) => code.substr(8) === '00';
export const isCommunity = (code: string) => code.substr(8) !== '00';
