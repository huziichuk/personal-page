// hooks/usePageWithFields.ts
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {RootState, AppDispatch} from "../store/store";
import {fetchPageBySlug} from "../store/slices/pagesSlice";
import {PageWithFieldsType} from "../types/types";
import {useFieldValue} from "./useFieldValue";
import {useRepeaterFieldsValue} from "./useRepeaterFieldsValue.ts";

export const usePageWithFields = (pageName: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const page = useSelector(
        (state: RootState): PageWithFieldsType | undefined =>
            state.pages.pages[pageName]
    );

    useEffect(() => {
        if (!page) {
            dispatch(fetchPageBySlug(pageName));
        }
    }, [page, dispatch, pageName]);

    const getFieldValue = useFieldValue(page);
    const getRepeaterFieldsValue = useRepeaterFieldsValue(page);

    return {page, getFieldValue, getRepeaterFieldsValue};
};
