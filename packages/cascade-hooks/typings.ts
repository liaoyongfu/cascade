export interface CascadeItem {
    label: string;
    value: string;
    children?: CascadeItem[];
    [prop: string]: any;
}
