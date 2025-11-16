import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoLinkProps = {
  className?: string;
  size?: number;
};

export function LogoLink({ className, size = 72 }: LogoLinkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex rounded-full border border-border/60 bg-secondary/70 p-2",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="FunQuizz"
        width={size}
        height={size}
        priority
      />
      <span className="sr-only">Quay lại trang chủ FunQuizz</span>
    </Link>
  );
}
