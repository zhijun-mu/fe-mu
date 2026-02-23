import { UserAuthForm } from "@/pages/login/components/user-auth-form.tsx";

export default function LoginPage() {
  return (
    // 使用 min-h-screen 确保容器至少与屏幕等高，去掉 container 改为 w-full
    <div className="relative min-h-screen w-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* 左侧装饰栏：仅在 lg 屏幕及以上显示 */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* 背景层：可以使用颜色或渐变 */}
        <div className="absolute inset-0 bg-zinc-900" />

        {/* Logo 区域 */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>

        {/* 底部引用/文案 */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;这个库为我节省了无数的工作时间，帮我更快地向客户交付了精美的设计。&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      {/* 右侧表单栏 */}
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">登录</h1>
            <p className="text-sm text-muted-foreground">请在下方输入您的用户名以登录您的账户。</p>
          </div>

          <UserAuthForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            点击登录即表示您同意我们的{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              服务条款
            </a>{" "}
            和{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              隐私政策
            </a>
            。
          </p>
        </div>
      </div>
    </div>
  );
}
