import axios, { AxiosInstance } from 'axios';
import {
  AuthProvider,
  SignInInput,
  SignUpInput,
  AuthSession,
  RequestOtpInput,
  VerifyOtpInput,
  AuthProviderConfig
} from './auth.provider';
import { AppError } from '../errors/app.error';

export class Auth210Provider implements AuthProvider {
  private client: AxiosInstance

  constructor(config: AuthProviderConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'x-application-id': config.applicationId,
        ...(config.apiKey && { 'x-api-key': config.apiKey })
      },
      timeout: 5000
    })
  }

  async signUp(input: SignUpInput): Promise<void> {
    try {
      await this.client.post('/auth/signup', input)
    } catch (error) {
      this.forwardError(error)
    }
  }

  async signIn(input: SignInInput): Promise<AuthSession> {
    try {
      const { data } = await this.client.post<AuthSession>('auth/signin', input)
      return data
    } catch (error) {
      console.error(error);
      this.forwardError(error)
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await this.client.post('/auth/password/reset/request', { email })
    } catch (error) {
      this.forwardError(error)
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await this.client.post('/auth/password/reset/confirm', {
        token,
        newPassword
      })
    } catch (error) {
      this.forwardError(error)
    }
  }

  async requestOtp(input: RequestOtpInput): Promise<void> {
    try {
      await this.client.post('/auth/otp/request', input)
    } catch (error) {
      this.forwardError(error)
    }
  }

  async verifyOtp(input: VerifyOtpInput): Promise<AuthSession> {
    try {
      const { data } = await this.client.post<AuthSession>('/auth/otp/verify', input)
      return data
    } catch (error) {
      this.forwardError(error)
    }
  }

  /**
   * Forward already-treated provider errors safely
   */
  private forwardError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 502
      const message =
        error.response?.data?.message ?? 'Authentication service error'
      const code = error.response?.data?.code

      throw new AppError(message, status, code)
    }

    throw new AppError('Unexpected authentication error', 500)
  }
}
