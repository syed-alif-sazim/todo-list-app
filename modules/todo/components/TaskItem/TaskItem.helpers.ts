import { z } from 'zod';
import { MAX_DESCRIPTION_LENGTH } from '../../../shared';

export const TaskSchema = z.string().min(1, { message: "Title cannot be empty" });

export const truncateDescription = (description: string) => {
    if (description.length <= MAX_DESCRIPTION_LENGTH) return description;
    return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}... `;
}; 