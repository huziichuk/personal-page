import {z} from "zod";

export const pageSchema = z.object({
    title: z.string({message:"Title is required"}).max(200, "Title is too long"),
    slug: z.string({message:"Slug is required"}).min(2, "Slug is too short").max(100, "Slug is too long"),
})

export type PageFormData = z.infer<typeof pageSchema>;