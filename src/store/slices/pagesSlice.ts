import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {apiGetPage} from "../../api/dashboard";
import {PageWithFieldsType} from "../../types/types.ts";

interface PagesState {
    pages: Record<string, PageWithFieldsType>;
    loading: Record<string, boolean>;
    error: Record<string, string | null>;
}

const initialState: PagesState = {
    pages: {},
    loading: {},
    error: {},
};

export const fetchPageBySlug = createAsyncThunk<
    { slug: string; data: PageWithFieldsType },
    string,
    { rejectValue: string }
>(
    "pages/fetchBySlug",
    async (slug, thunkAPI) => {
        try {
            const response = await apiGetPage(slug);
            return {slug, data: response.data};
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue("Failed to fetch page");
        }
    }
);

const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageBySlug.pending, (state, action) => {
                const slug = action.meta.arg;
                state.loading[slug] = true;
                state.error[slug] = null;
            })
            .addCase(fetchPageBySlug.fulfilled, (state, action: PayloadAction<{
                slug: string;
                data: PageWithFieldsType
            }>) => {
                const {slug, data} = action.payload;
                state.loading[slug] = false;
                state.pages[slug] = data;
            })
            .addCase(fetchPageBySlug.rejected, (state, action) => {
                const slug = action.meta.arg;
                state.loading[slug] = false;
                state.error[slug] = action.payload ?? action.error.message ?? "Unknown error";
            });
    },
});

export default pagesSlice.reducer;
