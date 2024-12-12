import { z } from 'zod';

export const TaskSchema = z.string().min(1, { message: "Title cannot be empty" });