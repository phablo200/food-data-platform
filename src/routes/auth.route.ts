import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { Auth210Provider } from '../providers/auth210.provider'

const authRoutes = Router()
const authProvider = new Auth210Provider(
  {
    baseURL: process.env.AUTH_PROVIDER_URL!,
    applicationId: process.env.AUTH_PROVIDER_APPLICATION_ID!,
    apiKey: process.env.AUTH_SERVICE_API_KEY!
  }
)

const authController = new AuthController(authProvider)

authRoutes.post('/auth/signup', (req, res) =>
  authController.signUp(req, res)
)

authRoutes.post('/auth/signin', (req, res) =>
  authController.signIn(req, res)
)

authRoutes.post('/auth/password/reset', (req, res) =>
  authController.requestPasswordReset(req, res)
)

authRoutes.post('/auth/password/reset/confirm', (req, res) =>
  authController.resetPassword(req, res)
)

authRoutes.post('/auth/otp/request', (req, res) =>
  authController.requestOtp(req, res)
)

authRoutes.post('/auth/otp/verify', (req, res) =>
  authController.verifyOtp(req, res)
)

export default authRoutes
