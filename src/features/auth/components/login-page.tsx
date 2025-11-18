"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";
import { AuthLayout } from "./auth-layout";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { AuthSocialButton } from "./auth-social-button";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import { clearAuthError, loginThunk } from "@/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type LoginFieldErrors = Partial<Record<keyof LoginInput, string>>;

const initialValues: LoginInput = {
  usernameOrEmail: "",
  password: "",
};

export function LoginPageContent() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formValues, setFormValues] = useState<LoginInput>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof LoginInput) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      if (error) {
        dispatch(clearAuthError());
      }
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = loginSchema.safeParse(formValues);

    if (!parsed.success) {
      const nextErrors: LoginFieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path.at(0);
        if (typeof key === "string") {
          nextErrors[key as keyof LoginInput] = issue.message;
        }
      });
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    void dispatch(loginThunk(parsed.data));
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-3 text-center">
        <LogoLink />
        <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
      </div>

      <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <InputWithIcon
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              label="Tên đăng nhập hoặc email"
              placeholder="Nhập email hoặc tên đăng nhập"
              icon={<Mail className="size-4" />}
              value={formValues.usernameOrEmail}
              onChange={handleChange("usernameOrEmail")}
              autoComplete="username"
              aria-invalid={Boolean(fieldErrors.usernameOrEmail)}
              error={fieldErrors.usernameOrEmail}
            />

            <InputWithIcon
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              icon={<Lock className="size-4" />}
              value={formValues.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              aria-invalid={Boolean(fieldErrors.password)}
              error={fieldErrors.password}
              trailingAction={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl text-muted-foreground"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Eye className="size-4" />
                </Button>
              }
            />

            {error ? (
              <p className="text-center text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="h-12 w-full rounded-2xl text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Link href="/forgot-password" className="font-medium text-primary">
                Quên mật khẩu?
              </Link>
              <Link href="/register" className="font-medium text-primary">
                Đăng ký
              </Link>
            </div>

            <AuthSocialButton label="Đăng nhập bằng Google" />
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
