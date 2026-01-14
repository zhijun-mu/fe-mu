import { AppError } from "./AppError";

export class NetworkError extends AppError {
  constructor(message = "网络异常，请稍后重试") {
    super(message, "NETWORK_ERROR");
  }
}
