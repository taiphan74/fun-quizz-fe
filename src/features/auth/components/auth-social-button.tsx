"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

type AuthSocialButtonProps = {
  label: string;
};

export function AuthSocialButton({ label }: AuthSocialButtonProps) {
  const handleGoogleAuth = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        HOẶC
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        variant="outline"
        className="h-12 w-full rounded-2xl border-border bg-secondary/40 text-foreground"
        type="button"
        onClick={handleGoogleAuth}
      >
        <Image src="/google.svg" alt="" width={18} height={18} className="mr-3" />
        {label}
      </Button>
    </div>
  );
}
