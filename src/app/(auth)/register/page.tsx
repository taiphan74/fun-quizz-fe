import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";

export default function RegisterPage() {
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
          <CardContent className="space-y-6">
            <div className="space-y-1.5 text-left text-sm font-medium">
              <label htmlFor="username">Tên người dùng</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Nhập tên người dùng"
                  className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left text-sm font-medium">
              <label htmlFor="email">Địa chỉ email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email"
                  className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left text-sm font-medium">
              <label htmlFor="password">Mật khẩu</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Tạo mật khẩu"
                  className="h-12 rounded-xl border-border bg-secondary/40 pl-11"
                />
              </div>
            </div>

            <Button className="h-12 w-full rounded-2xl text-base font-semibold">
              Đăng ký
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/login" className="font-semibold text-primary">
                Đăng nhập ngay
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
