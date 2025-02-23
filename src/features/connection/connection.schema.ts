import { z } from "zod";

const payload = {
  body: z.object({
    name: z
      .string({
        required_error: "Person name is required",
      })
      .trim()
      .min(3, "Person name must be 3 characters long"),
    mobile: z
      .union([
        z.string().regex(/^\d{6,12}$/, "Please enter valid number"),
        z.string().length(0),
      ])
      .optional(),
    company: z
      .string({
        required_error: "Company is required",
      })
      .trim()
      .min(1, "Company is required"),
    email: z.string().email().optional(),
    linkedIn: z.string().url().optional(),
    description: z.string().trim().optional(),
    designation: z
      .string({
        required_error: "Designation is required",
      })
      .min(1, "Designation is required"),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "Connection Id is required",
    }),
  }),
};

export const createConnectionSchema = z.object({
  ...payload,
});

export const getConnectionSchema = z.object({
  ...params,
});

export const updateConnectionSchema = z.object({
  ...params,
  ...payload,
});

export const deleteConnectionSchema = z.object({
  ...params,
});

export type CreateConnectionDto = z.infer<typeof createConnectionSchema>;
export type GetConnectionDto = z.infer<typeof getConnectionSchema>;
export type UpdateConnectionDto = z.infer<typeof updateConnectionSchema>;
export type DeleteConnectionDto = z.infer<typeof deleteConnectionSchema>;
