import Link from "next/link";

import { LogoLink } from "@/components/logo-link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="bg-secondary text-foreground border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <LogoLink size={52} className="p-1.5" />
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-foreground">
              FunQuizz
            </span>
            <span className="sr-only">Quay lại trang chủ FunQuizz</span>
          </Link>
        </div>

        <Button asChild className="px-6 py-2 text-sm font-semibold">
          <Link href="/login">Đăng nhập</Link>
        </Button>
      </div>
    </header>
  );
}
