import { type HTMLAttributes } from "react";

interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  size?: "small" | "default" | "large";
  color?: string; // 支持自定义颜色，如 "text-red-500"
}

export default function Spin({
  size = "default",
  color = "text-indigo-600",
  className = "",
  ...props // <--- 关键：捕获剩余参数（如 style, id 等）
}: SpinProps) {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-10 w-10",
  };

  return (
    <div
      // 默认充满父容器并居中
      className={`flex h-full w-full items-center justify-center ${className}`}
      {...props} // <--- 关键：将 style 等属性应用到最外层 div
    >
      <svg
        className={`animate-spin ${sizeClasses[size]} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
