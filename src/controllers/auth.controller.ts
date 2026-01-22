import { Request, Response } from 'express'
import { AuthProvider } from '../providers/auth.provider'
import { AppError } from '../errors/app.error'

export class AuthController {
  constructor(private readonly authProvider: AuthProvider) {}

  async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      await this.authProvider.signUp({ email, password })

      return res.status(201).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      const session = await this.authProvider.signIn({ email, password })

      return res.json(session)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  async requestPasswordReset(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { email } = req.body

      await this.authProvider.requestPasswordReset(email)

      return res.status(204).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  async resetPassword(req: Request, res: Response): Promise<Response> {
    try {
      const { token, newPassword } = req.body

      await this.authProvider.resetPassword(token, newPassword)

      return res.status(204).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  async requestOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { destination } = req.body

      await this.authProvider.requestOtp({ destination })

      return res.status(204).send()
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<Response> {
    try {
      const { destination, code } = req.body

      const session = await this.authProvider.verifyOtp({
        destination,
        code
      })

      return res.json(session)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: error.message,
        code: error.code
      })
    }

    // Fallback for truly unexpected errors
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}
