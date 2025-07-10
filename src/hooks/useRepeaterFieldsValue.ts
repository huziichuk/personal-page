import {PageWithFieldsType, RepeaterFieldType, RepeaterType} from "../types/types.ts";

export const useRepeaterFieldsValue = (page: PageWithFieldsType | undefined) => {
    return (key: string): null | string[] => {
        if (!page) {
            return null;
        }

        const repeater = page.repeaters.find((r: RepeaterType) => r.key === key);
        console.log("repeater", repeater);
        if (!repeater) {
            return null;
        }

        if(!repeater.fields){
            return [];
        }

        return repeater.fields.map((field: RepeaterFieldType) => field.value);
    }
}