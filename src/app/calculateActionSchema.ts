import { z } from "zod"

const calculateActionSchema = z.object({
  cd: z.coerce.number().min(0, "Không thể nhỏ hơn 0"),
  cd_: z.coerce.number().min(-100, "Không thể nhỏ hơn -100"),
  cc: z.coerce.number().min(0, "Không thể nhỏ hơn 0"),
  cc_: z.coerce.number().min(-100, "Không thể nhỏ hơn -100"),
  ccm: z.coerce
    .number()
    .refine((value) => value == 0 || value == 16, "Chỉ có thể là 0 hoặc 16"),
})

export default calculateActionSchema
