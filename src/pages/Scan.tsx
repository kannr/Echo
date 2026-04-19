import SubTopBar from "@/components/echo/SubTopBar";
import { Image as ImageIcon, Zap } from "lucide-react";

const Scan = () => (
  <div className="flex-1 flex flex-col bg-foreground">
    <SubTopBar title={<span className="text-primary-foreground">扫一扫</span>} back />
    <div className="flex-1 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
      <div className="relative w-64 h-64 rounded-3xl border-2 border-primary/80">
        <span className="absolute -top-1 -left-1 size-6 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
        <span className="absolute -top-1 -right-1 size-6 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
        <span className="absolute -bottom-1 -left-1 size-6 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
        <span className="absolute -bottom-1 -right-1 size-6 border-b-4 border-r-4 border-primary rounded-br-2xl" />
        <span className="absolute left-2 right-2 top-2 h-[2px] bg-primary/80 animate-[echo-pulse_1.6s_ease-in-out_infinite]" />
      </div>
      <div className="absolute bottom-24 text-center text-primary-foreground/80 text-[12px]">将二维码 / 条码放入框内，自动识别</div>
    </div>
    <div className="px-6 py-6 flex items-center justify-around bg-foreground text-primary-foreground/80 text-[11px]">
      <button className="flex flex-col items-center gap-1.5"><ImageIcon className="size-5" />相册</button>
      <button className="flex flex-col items-center gap-1.5"><Zap className="size-5" />闪光灯</button>
    </div>
  </div>
);

export default Scan;
