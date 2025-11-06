// app/page.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <main className="w-full max-w-3xl px-4 py-12 sm:px-8">
        {/* top bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            {/* logo của bạn */}
            <Image
              src="/logo.png" // <-- đổi thành path logo của bạn
              alt="Logo"
              width={48}
              height={48}
              className="rounded-md"
            />
            <div>
              <p className="text-sm text-muted-foreground">Welcome back 👋</p>
              <h1 className="text-lg font-semibold tracking-tight">
                Your Learning Dashboard
              </h1>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            dark-only
          </Badge>
        </div>

        <Card className="bg-card border-border">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Bắt đầu nhanh với app của bạn
              </CardTitle>
              <p className="text-muted-foreground">
                Sửa <code className="bg-muted px-1.5 py-0.5 rounded text-xs">app/page.tsx</code> để đổi nội dung.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator className="bg-border" />

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Tài liệu & template gợi ý:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="gap-2"
                  >
                    <a
                      href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Templates
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border"
                  >
                    <a
                      href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learning center
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <a
                      href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Documentation
                    </a>
                  </Button>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Triển khai ngay:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="gap-2"
                  >
                    <a
                      href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Deploy to Vercel
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border"
                    asChild
                  >
                    <a
                      href="https://github.com/vercel/next.js/tree/canary/examples"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Next.js examples
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
