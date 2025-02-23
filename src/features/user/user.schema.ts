import { z } from "zod";

const payload = {
  firstName: z
    .string({
      required_error: "First Name is required",
    })
    .trim()
    .min(3, "First name must be 3 characters long"),
  lastName: z
    .string({
      required_error: "Last Name is required",
    })
    .trim()
    .min(1, "Last name cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter valid email"),
  mobile: z
    .union([
      z.string().regex(/^\d{6,12}$/, "Please enter valid number"),
      z.string().length(0),
    ])
    .optional(),
};

const createUserPayload = {
  body: z.object({
    ...payload,
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(1, "Password is required"),
    isUser: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
    emailVerified: z.boolean({
      required_error: "Email Verification is required",
    }),
  }),
};

const updateUserPayload = {
  body: z.object({
    ...payload,
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .optional(),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "User Id is required",
    }),
  }),
};

export const createUserSchema = z.object({
  ...createUserPayload,
});

export const getUserSchema = z.object({
  // ...params,
});

export const updateUserSchema = z.object({
  // ...params,
  ...updateUserPayload,
});

export const deleteUserSchema = z.object({
  // ...params,
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type GetUserDto = z.infer<typeof getUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type DeleteUserDto = z.infer<typeof deleteUserSchema>;
