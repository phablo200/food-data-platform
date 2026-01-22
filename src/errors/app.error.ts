export class AppError extends Error {
    public readonly statusCode: number
    public readonly code?: string
    public readonly isOperational: boolean
  
    constructor(
      message: string,
      statusCode = 500,
      code?: string,
      isOperational = true
    ) {
      super(message)
  
      this.statusCode = statusCode
      this.code = code
      this.isOperational = isOperational
  
      // Restore prototype chain
      Object.setPrototypeOf(this, new.target.prototype)
  
      // Capture stack trace (V8)
      Error.captureStackTrace?.(this, this.constructor)
    }
  }
  