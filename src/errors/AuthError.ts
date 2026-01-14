import { AppError } from "./AppError";

export class AuthError extends AppError {
  constructor(message = "未登录") {
    super(message, "AUTH_ERROR");
  }
}
