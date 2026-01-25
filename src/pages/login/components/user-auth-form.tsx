import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils.ts";

import { passwordLogin, getLoginInfo } from "@/api/auth.ts";
import { useAuthStore } from "@/stores";

export function UserAuthForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const {
    setToken,
    setUserInfo,
    isAuthenticated,
    rememberedUsername,
    setRememberedUsername,
    setIsRememberUsername,
  } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    // Radix Checkbox 如果设置了 name，也会在 FormData 里提交
    // 选中时值为 "on"，未选中时为 null
    const isRemember = formData.get("isRemember") === "on";

    try {
      const data: any = await passwordLogin({ username, password });

      setToken(data.token);
      const info = await getLoginInfo();
      setUserInfo(info);

      if (isRemember) {
        setIsRememberUsername(true);
        setRememberedUsername(username);
      } else {
        setIsRememberUsername(false);
        setRememberedUsername(null);
      }

      navigate("/", { replace: true });

    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel className="sr-only" htmlFor="username">
              用户名
            </FieldLabel>
            <Input
              id="username"
              name="username"
              placeholder="请输入用户名"
              type="text"
              defaultValue={rememberedUsername || ""}
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </Field>

          <Field>
            <FieldLabel className="sr-only" htmlFor="password">
              密码
            </FieldLabel>
            <Input
              id="password"
              name="password"
              placeholder="请输入密码"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </Field>

          {/* --- 修改部分：使用 Shadcn UI Checkbox --- */}
          <Field>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRemember"
                name="isRemember" // 关键：必须加 name 才能被 FormData 获取
                defaultChecked={!!rememberedUsername} // 默认选中状态
                disabled={isLoading}
              />
              <label
                htmlFor="isRemember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                记住用户名
              </label>
            </div>
          </Field>

          <Field>
            <Button disabled={isLoading} className="w-full">
              {isLoading && <Spinner />}
              登录
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}