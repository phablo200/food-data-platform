export interface AuthProviderErrorResponse {
    statusCode: number
    body: {
        message: string
        code?: string
    }
}
  