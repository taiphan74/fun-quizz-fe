import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-secondary text-foreground">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-full max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
              Cùng phát triển thông minh
            </h1>
            <p className="text-lg text-muted-foreground">
              Khám phá tài liệu, đề thi và ghi chú chất lượng cao từ cộng đồng
              học viên như bạn.
            </p>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-6 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Tìm khóa học, quiz hoặc tài liệu bạn cần"
              className="h-16 rounded-full border-border bg-card pl-14 pr-6 text-base shadow-2xl shadow-primary/10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
