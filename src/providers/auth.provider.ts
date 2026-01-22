export interface AuthProviderConfig {
  baseURL: string
  applicationId: string
  apiKey?: string
}

/**
 * DTOs
 */
export interface SignUpInput {
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface RequestOtpInput {
  destination: string // email or phone
}

export interface VerifyOtpInput {
  destination: string
  code: string
}

export interface AuthSession {
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
}

/**
 * Provider contract
 * (this is what allows Auth0 or any other service later)
 */
export interface AuthProvider {
  signUp(input: SignUpInput): Promise<void>
  signIn(input: SignInInput): Promise<AuthSession>
  requestPasswordReset(email: string): Promise<void>
  resetPassword(token: string, newPassword: string): Promise<void>
  requestOtp(input: RequestOtpInput): Promise<void>
  verifyOtp(input: VerifyOtpInput): Promise<AuthSession>
}
