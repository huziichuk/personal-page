import {AppDispatch} from "./store.ts";
import { fetchPageBySlug } from "./slices/pagesSlice";

export const preloadPagesBySlugs = (slugs: string[]) => async (dispatch: AppDispatch) => {
    await Promise.all(slugs.map(slug => dispatch(fetchPageBySlug(slug))));
};