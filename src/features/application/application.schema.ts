import { z } from "zod";

const payload = {
  body: z.object({
    companyName: z
      .string({
        required_error: "Company name is required",
      })
      .trim()
      .min(3, "Company name must be 3 characters long"),
    applicationDate: z.string({
      required_error: "Application date is required",
    }),
    platform: z.string({
      required_error: "Platform is required",
    }),
    location: z
      .string({
        required_error: "Location is required",
      })
      .trim()
      .min(3, "Location is required"),
    postUrl: z.string().url().optional(),
    description: z.string().optional(),
    role: z
      .string({
        required_error: "Role is required",
      })
      .min(1, "Role is required"),
    mobile: z
      .union([
        z.string().regex(/^\d{6,12}$/, "Please enter valid number"),
        z.string().length(0),
      ])
      .optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    linkedIn: z.string().url().optional(),
    status: z
      .enum(["rejected", "no-response", "responded", "selected"])
      .default("no-response"),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "Application Id is required",
    }),
  }),
};

export const createApplicationSchema = z.object({
  ...payload,
});

export const getApplicationSchema = z.object({
  ...params,
});

export const updateApplicationSchema = z.object({
  ...params,
  ...payload,
});

export const deleteApplicationSchema = z.object({
  ...params,
});

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;
export type GetApplicationDto = z.infer<typeof getApplicationSchema>;
export type UpdateApplicationDto = z.infer<typeof updateApplicationSchema>;
export type DeleteApplicationDto = z.infer<typeof deleteApplicationSchema>;
