"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";
import { AuthLayout } from "./auth-layout";
import { InputWithIcon } from "@/components/ui/input-with-icon";

export function ForgotPasswordPageContent() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-3 text-center">
        <LogoLink />
        <h1 className="text-2xl font-bold tracking-tight">Quên mật khẩu</h1>
      </div>

      <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
        <CardContent className="space-y-6">
          <InputWithIcon
            id="reset-email"
            type="email"
            label="Địa chỉ email"
            placeholder="Nhập email đã đăng ký"
            icon={<Mail className="size-4" />}
          />

          <Button className="h-12 w-full rounded-2xl text-base font-semibold">
            Gửi hướng dẫn
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Nhớ mật khẩu rồi?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Quay lại đăng nhập
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
