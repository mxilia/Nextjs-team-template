import { loadEnvConfig } from '@next/env'
import { createHmac } from 'crypto'

loadEnvConfig(process.cwd())

console.log(createHmac('sha256', process.env.INVITE_SECRET!).update(process.argv[2]).digest('hex'))
