export interface DivisionItem {
    label: string;
    value: string;
}

export interface Data {
    city: DivisionItem[],
    district: DivisionItem[],
    street: DivisionItem[],
    community: DivisionItem[]
}
