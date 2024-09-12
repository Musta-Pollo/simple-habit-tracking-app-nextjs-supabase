import { z } from "zod";

// Regular expression for validating hex color codes
const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

export const ColorHexaTypeSchema = z.string().regex(hexColorRegex, {
  message: "Invalid hex color code",
});
