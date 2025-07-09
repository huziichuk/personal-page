import {z} from "zod";

export const loginSchema = z.object({
    login: z.string({message:"Login is required"}).min(3, "Invalid login or password").max(100, "Invalid login or password"),
    password: z.string({message:"Password is required"}).min(3, "Invalid login or password").max(100, "Invalid login or password"),
    rememberMe: z.boolean()
})

export type LoginFormData = z.infer<typeof loginSchema>;