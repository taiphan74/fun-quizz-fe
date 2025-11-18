"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { User, Mail, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";
import { AuthLayout } from "./auth-layout";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { AuthSocialButton } from "./auth-social-button";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schemas";
import { clearAuthError, registerThunk } from "@/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type RegisterFieldErrors = Partial<Record<keyof RegisterInput, string>>;

const initialValues: RegisterInput = {
  username: "",
  email: "",
  password: "",
};

export function RegisterPageContent() {
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
    <AuthLayout>
      <div className="flex flex-col items-center gap-3 text-center">
        <LogoLink />
        <h1 className="text-2xl font-bold tracking-tight">Tạo tài khoản</h1>
      </div>

      <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <InputWithIcon
              id="username"
              name="username"
              placeholder="Nhập tên người dùng"
              label="Tên người dùng"
              icon={<User className="size-4" />}
              value={formValues.username}
              onChange={handleChange("username")}
              autoComplete="username"
              aria-invalid={Boolean(fieldErrors.username)}
              error={fieldErrors.username}
            />

            <InputWithIcon
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email"
              label="Địa chỉ email"
              icon={<Mail className="size-4" />}
              value={formValues.email}
              onChange={handleChange("email")}
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              error={fieldErrors.email}
            />

            <InputWithIcon
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              label="Mật khẩu"
              icon={<Lock className="size-4" />}
              value={formValues.password}
              onChange={handleChange("password")}
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.password)}
              error={fieldErrors.password}
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
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/login" className="font-semibold text-primary">
                Đăng nhập ngay
              </Link>
            </p>

            <AuthSocialButton label="Đăng ký bằng Google" />
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
