import { Mic, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props { open: boolean; onClose: () => void; }

const VoiceWakeOverlay = ({ open, onClose }: Props) => {
  const [heard, setHeard] = useState("");
  useEffect(() => {
    if (!open) { setHeard(""); return; }
    const phrases = ["", "你好…", "你好 Echo…", "你好 Echo，搜索三毛"];
    let i = 0;
    const t = setInterval(() => { setHeard(phrases[i]); i = Math.min(i + 1, phrases.length - 1); }, 700);
    return () => clearInterval(t);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 glass flex flex-col items-center justify-center px-8" onClick={onClose}>
      <button className="absolute top-5 right-5 size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
        <X className="size-5" />
      </button>
      <div className="size-32 rounded-full bg-primary/10 flex items-center justify-center relative">
        <span className="absolute inset-0 rounded-full bg-primary/15 animate-ping" />
        <div className="size-20 rounded-full bg-primary flex items-center justify-center">
          <Mic className="size-9 text-primary-foreground" />
        </div>
      </div>
      <div className="mt-8 flex items-end gap-1 h-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="echo-bar w-[3px] rounded-full bg-primary/70"
            style={{ height: 24 + (i % 4) * 6, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <p className="mt-8 text-armani-deep text-sm tracking-wide">说 “你好 Echo” 唤醒</p>
      <p className="mt-2 text-foreground text-base font-medium min-h-[24px]">{heard}</p>
    </div>
  );
};

export default VoiceWakeOverlay;
