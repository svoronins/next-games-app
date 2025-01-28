import { z } from "zod";

const MinRequirementSchem = z.object({
  graphics: z.string(),
  memory: z.string(),
  os: z.string(),
  processor: z.string(),
  storage: z.string(),
});
const ScreenShotsSchema = z.object({
  id: z.number(),
  image: z.string(),
});
const GameSchema = z.object({
  description: z.optional(z.string()),
  developer: z.optional(z.string()),
  freetogame_profile_url: z.optional(z.string()),
  game_url: z.string(),
  genre: z.string(),
  id: z.number(),
  minimum_system_requirements: z.optional(MinRequirementSchem),
  platform: z.string(),
  publisher: z.optional(z.string()),
  release_date: z.optional(z.string()),
  screenshoots: z.optional(z.array(ScreenShotsSchema)),
  short_description: z.string(),
  status: z.optional(z.string()),
  thumbnail: z.string(),
  title: z.string(),
});
export type Game = z.infer<typeof GameSchema>;

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(6),
});
export type User = z.infer<typeof UserSchema>;
