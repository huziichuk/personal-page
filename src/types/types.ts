export type PageType = {
    id: number;
    title: string;
    slug: string;
}

export enum TypesEnum {
    string = 'string',
    int = 'int',
    link = 'link',
}

export type FieldType = {
    id: string,
    value: string,
    type: TypesEnum,
    title: string,
    field_key: string,
    page_id: number,
}

export type RepeaterFieldType = {
    id: string,
    title: string,
    repeater_id: string,
    key: string,
    value: string,
    type: TypesEnum,
}

export type RepeaterType = {
    title: string,
    id: number,
    key: string,
    page_id: number,
    fields?: RepeaterFieldType[],
}


export type PageWithFieldsType = PageType & {
    fields: FieldType[];
    repeaters: RepeaterType[];
};

export type CreateApiType = {
    id: number,
    message: string,
}

export const typeSelectArray = [
    {
        name: "String",
        value: TypesEnum.string,
    },
    {
        name: "Link",
        value: TypesEnum.link,
    },
    {
        name: "Int",
        value: TypesEnum.int,
    },
]