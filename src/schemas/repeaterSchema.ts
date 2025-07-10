import {z} from "zod";

export const repeaterSchema = z.object({
    id: z.number().optional(),
    title: z.string({message:"Title is required"}).min(3, "Title is too short").max(200, "Title is too long"),
    key: z.string({message:"Key is required"}).min(3, "Key is too short").max(200, "Key is too long"),
    pageId: z.number().optional(),
})

export type RepeaterFormData = z.infer<typeof repeaterSchema>;