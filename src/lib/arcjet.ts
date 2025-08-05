import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from '@arcjet/next'
import { env } from './env'

export { detectBot, fixedWindow, slidingWindow, sensitiveInfo, protectSignup, shield }

export default arcjet({
  key: env.ARCJET_KEY,

  characteristics: ['fingerprint'],

  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
})
