import { z } from "zod";

const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];

export const registerSchema = z
  .object({
    name: z.string().min(3).max(20),
    email: z.string().email().min(8).max(100),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
    userAgent: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => {
    const domain = data.email.split("@")[1];
    return allowedDomains.includes(domain);
  }, {
    message: `Email domain must be one of: ${allowedDomains.join(", ")}`,
    path: ["email"],
  })
  .refine((data) => /^[A-Za-z\s]+$/.test(data.name), {
    message: "Name must contain only letters and spaces.",
    path: ["name"],
  });
