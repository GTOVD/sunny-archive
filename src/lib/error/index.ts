export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code = 'INTERNAL_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ShopifyError extends AppError {
  constructor(message: string) {
    super(message, 'SHOPIFY_ERROR', 502);
  }
}
