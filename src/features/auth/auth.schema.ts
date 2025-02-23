import { z } from "zod";

const payload = {
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Please enter valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
};

export const loginUserSchema = z.object({
  ...payload,
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
