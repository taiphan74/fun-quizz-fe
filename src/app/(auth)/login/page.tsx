import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/logo-link";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <LogoLink />
          <h1 className="text-2xl font-bold tracking-tight">Đăng nhập</h1>
        </div>

        <Card className="rounded-3xl border border-border/60 bg-card/95 py-8 shadow-xl shadow-background/40">
          <CardContent className="space-y-6">
            <div className="space-y-1.5 text-left text-sm font-medium">
              <label htmlFor="email">Địa chỉ email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
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
                  placeholder="Nhập mật khẩu"
                  className="h-12 rounded-xl border-border bg-secondary/40 pl-11 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl text-muted-foreground"
                  aria-label="Hiện mật khẩu"
                >
                  <Eye className="size-4" />
                </Button>
              </div>
            </div>

            <Button className="h-12 w-full rounded-2xl text-base font-semibold">
              Đăng nhập
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
