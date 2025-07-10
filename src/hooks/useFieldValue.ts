import {FieldType, PageWithFieldsType} from "../types/types.ts";

export const useFieldValue = (page: PageWithFieldsType | undefined) => {
    return (key: string): null | string => {
        if (!page) {
            return null;
        }

        const field = page.fields.find((f: FieldType) => f.field_key === key);

        if (field) {
            return field.value || null;
        }
        
        console.error(`Field ${key} not found.`);
        return null;
    }
}