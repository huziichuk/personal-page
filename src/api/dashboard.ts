import api from "./axios.ts"
import {PageFormData} from "../schemas/pageSchema.ts";
import {CreateApiType, PageType, PageWithFieldsType} from "../types/types.ts";
import {FieldFormData} from "../schemas/fieldSchema.ts";
import {RepeaterFormData} from "../schemas/repeaterSchema.ts";
import {RepeaterFieldFormData} from "../schemas/repeaterFieldSchema.ts";

export const apiCreatePage = ({title, slug}: PageFormData) => api.post(`/pages`, {title, slug})

export const apiGetPages = () => api.get<PageType[]>(`/pages`);

export const apiGetPage = (slug: string) => api.get<PageWithFieldsType>(`/pages/${slug}`);

export const apiCreateField = ({
                                   title,
                                   type,
                                   fieldKey,
                                   value,
                                   pageId
                               }: FieldFormData) => api.post<CreateApiType>(`/fields`, {
    title,
    value,
    field_key: fieldKey,
    type,
    page_id: pageId
});

export const apiUpdateField = ({
                                   title,
                                   type,
                                   fieldKey,
                                   value,
                                   id
                               }: FieldFormData) => api.put(`/fields/${id}`, {
    title,
    value,
    field_key: fieldKey,
    type
});

export const apiCreateRepeater = ({
                                      key,
                                      title,
                                      pageId
                                  }: RepeaterFormData) => api.post<CreateApiType>(`/repeaters`, {
    repeater_key: key,
    title,
    page_id: pageId
});

export const apiUpdateRepeater = ({id, key}: RepeaterFormData) => api.put(`/repeaters/${id}`, {repeater_key: key})

export const apiCreateRepeaterField = ({
                                           key,
                                           repeaterId,
                                           type,
                                           value,
                                           title
                                       }: RepeaterFieldFormData) => api.post<CreateApiType>(`/repeaterFields`, {
    value,
    type,
    field_key: key,
    repeater_id: repeaterId,
    title
})

export const apiUpdateRepeaterField = ({
                                           id,
                                           key,
                                           type,
                                           title,
                                           value
                                       }: RepeaterFieldFormData) => api.put(`/repeaterFields/${id}`, {
    field_key: key,
    type,
    title,
    value
})