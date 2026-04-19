import SubTopBar from "@/components/echo/SubTopBar";
import { useState } from "react";
import { Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";

const Match = () => {
  const [desc, setDesc] = useState("");
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto">
      <SubTopBar title="智能匹配" />
      <div className="p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4">
          <div className="text-[14px] font-medium mb-1">描述你想找的人</div>
          <div className="text-[11px] text-armani mb-3">支持自然语言。例如："喜欢三毛，会西班牙语，长居北非的中国女性"</div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="例如：在里斯本，做 AI 产品，听 Sigur Rós…"
            className="w-full h-24 rounded-xl bg-secondary p-3 text-[13px] placeholder:text-armani focus:outline-none resize-none"
          />
        </div>

        <button
          onClick={() => { if (!desc) return toast("请先描述"); setRevealed(false); toast("已为你寻得 1 位高契合者"); }}
          className="w-full h-11 rounded-2xl bg-primary text-primary-foreground text-[14px] flex items-center justify-center gap-2"
        >
          <Sparkles className="size-4" /> 寻找高契合者
        </button>

        {desc && (
          <div className="bg-card ring-soft rounded-2xl p-4 relative overflow-hidden">
            <div className={`flex items-center gap-3 ${revealed ? "" : "blur-sm select-none"}`}>
              <div className="size-14 rounded-2xl bg-accent/40 text-primary flex items-center justify-center text-lg font-medium">N</div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium">Noor · 摩洛哥, 拉巴特</div>
                <div className="text-[11px] text-armani">说三种语言 · 文化策展人</div>
                <div className="text-[12px] text-primary mt-0.5">契合度 92</div>
              </div>
            </div>
            {!revealed && (
              <button
                onClick={() => { setRevealed(true); toast("已扣除展示额度", { description: "本月剩余 2 次" }); }}
                className="absolute inset-0 m-auto h-11 w-44 rounded-full bg-primary text-primary-foreground text-[13px] flex items-center justify-center gap-2"
              ><Lock className="size-4" /> 付费展示 · 18 Echo</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
