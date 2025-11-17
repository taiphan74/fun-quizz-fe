"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { User, Mail, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schemas";
import {
  clearAuthError,
  registerThunk,
} from "@/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type RegisterFieldErrors = Partial<Record<keyof RegisterInput, string>>;

const initialValues: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formValues, setFormValues] = useState<RegisterInput>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});

  const handleChange =
    (field: keyof RegisterInput) =>
    (event: ChangeEvent<HTMLInputElement>) => {
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
    const parsed = registerSchema.safeParse(formValues);

    if (!parsed.success) {
      const nextErrors: RegisterFieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path.at(0);
        if (typeof key === "string") {
          nextErrors[key as keyof RegisterInput] = issue.message;
        }
      });
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    void dispatch(registerThunk(parsed.data));
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoLink />
          <h1 className="text-2xl font-bold tracking-tight">Tạo tài khoản</h1>
          <p className="text-sm text-muted-foreground">
            Tham gia ngay để lưu trữ tài liệu và học cùng cộng đồng FunQuizz.
          </p>
        </div>

        <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1.5 text-left text-sm font-medium">
                <label htmlFor="username">Tên người dùng</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="Nhập tên người dùng"
                    className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                    value={formValues.username}
                    onChange={handleChange("username")}
                    autoComplete="username"
                    aria-invalid={Boolean(fieldErrors.username)}
                  />
                </div>
                {fieldErrors.username ? (
                  <p className="text-xs font-medium text-destructive">
                    {fieldErrors.username}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5 text-left text-sm font-medium">
                <label htmlFor="email">Địa chỉ email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                    value={formValues.email}
                    onChange={handleChange("email")}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                </div>
                {fieldErrors.email ? (
                  <p className="text-xs font-medium text-destructive">
                    {fieldErrors.email}
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
                    type="password"
                    placeholder="Tạo mật khẩu"
                    className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                    value={formValues.password}
                    onChange={handleChange("password")}
                    autoComplete="new-password"
                    aria-invalid={Boolean(fieldErrors.password)}
                  />
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
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-semibold text-primary">
                  Đăng nhập ngay
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
