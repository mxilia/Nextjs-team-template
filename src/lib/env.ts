import * as z from 'zod'

const createEnv = () => {
  const EnvSchema = z.object({
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_APP_URL: z.url(),
  })

  const envVars = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  }

  const parsedEnv = EnvSchema.safeParse(envVars)
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
       The following variables are missing or invalid:
        ${Object.entries(parsedEnv.error.flatten().fieldErrors)
          .map(([k, v]) => `- ${k}: ${v}`)
          .join('\n')}
      `,
    )
  }

  return parsedEnv.data ?? {}
}

export const env = createEnv()
