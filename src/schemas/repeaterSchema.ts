import {z} from "zod";

export const repeaterSchema = z.object({
    id: z.number(),
    key: z.string({message:"Key is required"}).min(3, "Key is too short").max(200, "Key is too long"),
    pageId: z.number().optional(),
})

export type RepeaterFormData = z.infer<typeof repeaterSchema>;