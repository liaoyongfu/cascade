export interface DivisionItem {
    label: string;
    value: string;
    children?: DivisionItem[];
    [prop: string]: any;
}
