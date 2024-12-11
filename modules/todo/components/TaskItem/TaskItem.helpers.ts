import { z } from 'zod';

export const TaskSchema = z.string().min(1, { message: "Description cannot be empty" });