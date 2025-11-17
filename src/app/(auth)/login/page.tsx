"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, Lock, Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";
import { loginSchema, type LoginInput } from "@/features/auth/schemas";
import {
  clearAuthError,
  loginThunk,
} from "@/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type LoginFieldErrors = Partial<Record<keyof LoginInput, string>>;

const initialValues: LoginInput = {
  usernameOrEmail: "",
  password: "",
};

export default function LoginPage() {
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
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoLink />
          <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
        </div>

        <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="space-y-1.5 text-left text-sm font-medium">
                <label htmlFor="usernameOrEmail">Tên đăng nhập hoặc email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                    value={formValues.usernameOrEmail}
                    onChange={handleChange("usernameOrEmail")}
                    autoComplete="username"
                    aria-invalid={Boolean(fieldErrors.usernameOrEmail)}
                  />
                </div>
                {fieldErrors.usernameOrEmail ? (
                  <p className="text-xs font-medium text-destructive">
                    {fieldErrors.usernameOrEmail}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5 text-left text-sm font-medium">
                <label htmlFor="password">Mật khẩu</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="h-12 rounded-xl border-border bg-secondary/40 pl-11 pr-12"
                    value={formValues.password}
                    onChange={handleChange("password")}
                    autoComplete="current-password"
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
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
                </div>
                {fieldErrors.password ? (
                  <p className="text-xs font-medium text-destructive">
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>

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

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                HOẶC
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button
                variant="outline"
                className="h-12 w-full rounded-2xl border-border bg-secondary/40 text-foreground"
                type="button"
              >
                <Image
                  src="/google.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="mr-3"
                />
                Đăng nhập bằng Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
