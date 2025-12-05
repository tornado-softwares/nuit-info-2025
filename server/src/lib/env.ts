import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({ 
    MISTRAL_API_KEY: z
        .string()
        .nonempty({ message: 'MISTRAL_API_KEY is required' })
        .describe('API key for Mistral service, you should ask Jossua :)'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    const lines = _env.error.issues.map((issue) => {
        // issue.path holds the key name (e.g. ['ACCUWEATHER_API_KEY'])
        const key = (Array.isArray(issue.path) && issue.path.length > 0) ? issue.path.join('.') : '<unknown>';
        let msg = issue.message;
        // normalize default messages like "Expected string, received undefined"
        if (/expected string|received undefined|Required|undefined/i.test(msg)) {
            msg = 'is required';
        }
        return `- ${key}: ${msg}`;
    });
    console.error('❌ Invalid environment variables:\n' + lines.join('\n'));
    process.exit(1);
}

export const env = _env.data;