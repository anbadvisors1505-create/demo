import { z } from "zod";

export const phoneRegex = /^[0-9+()\-.\s]{7,20}$/;

export const bookConsultationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // honeypot — must stay empty; bots tend to fill every field
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export const speakToCaSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address.").optional().or(z.literal("")),
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  areaOfInterest: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a little about what you need.").max(2000),
  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type BookConsultationInput = z.infer<typeof bookConsultationSchema>;
export type SpeakToCaInput = z.infer<typeof speakToCaSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
