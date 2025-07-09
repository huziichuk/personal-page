import {z} from "zod";
import {TypesEnum} from "../types/types.ts";

export const fieldSchema = z.object({
    id: z.number(),
    title: z.string({message:"Title is required"}).min(3, "Title is too short").max(200, "Title is too long"),
    fieldKey: z.string({message:"Field key is required"}).min(3, "Field key is too short").max(100, "Field key is too long"),
    type: z.enum([TypesEnum.string, TypesEnum.int, TypesEnum.link]),
    value: z.string({message:"Value is required"}).max(100000, "Value is too long"),
    pageId: z.number().optional(),
})

export type FieldFormData = z.infer<typeof fieldSchema>;