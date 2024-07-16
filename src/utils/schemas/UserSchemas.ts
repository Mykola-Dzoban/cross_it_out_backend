import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string().email(),
  online: z.boolean(),
  ownerId: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
