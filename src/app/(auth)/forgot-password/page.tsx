import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoLink />
          <h1 className="text-2xl font-bold tracking-tight">Quên mật khẩu</h1>
          <p className="text-sm text-muted-foreground">
            Nhập email đã đăng ký để chúng tôi gửi hướng dẫn đặt lại mật khẩu.
          </p>
        </div>

        <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
          <CardContent className="space-y-6">
            <div className="space-y-1.5 text-left text-sm font-medium">
              <label htmlFor="reset-email">Địa chỉ email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Nhập email đã đăng ký"
                  className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                />
              </div>
            </div>

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
      </div>
    </main>
  );
}
