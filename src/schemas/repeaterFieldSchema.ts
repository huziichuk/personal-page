import {z} from "zod";
import {TypesEnum} from "../types/types.ts";

export const repeaterFieldSchema = z.object({
    id: z.number().optional(),
    title: z.string({message:"Title is required"}).min(3, "Title is too short").max(100, "Title is too long"),
    key: z.string({message:"Key is required"}).min(3, "Key is too short").max(200, "Key is too long"),
    type: z.enum([TypesEnum.string, TypesEnum.int, TypesEnum.link]),
    value: z.string({message:"Value is required"}).max(100000, "Value is too long"),
    repeaterId: z.number().optional(),
})

export type RepeaterFieldFormData = z.infer<typeof repeaterFieldSchema>;