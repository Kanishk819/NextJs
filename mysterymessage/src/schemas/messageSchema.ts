import {z} from "zod"

export const messageSchema = z.object({
    content : z
    .string()
    .min(10, "Content must be atleast 10 characters")
    .max(300, "Content must be Atmost 300 characters")
})