import SubTopBar from "@/components/echo/SubTopBar";
import Avatar from "@/components/echo/Avatar";
import { myMoments, allFriendTags } from "@/data/echo";
import { useState } from "react";
import { Plus, Globe, Users, Tag } from "lucide-react";
import { toast } from "sonner";

const Moments = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [vis, setVis] = useState<"public" | "friends" | "tag">("public");
  const [tag, setTag] = useState(allFriendTags[0]);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto relative">
      <SubTopBar title="我的展示" right={
        <button onClick={() => setOpen(true)} className="size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><Plus className="size-4" /></button>
      } />
      <p className="px-4 pt-1 text-[11px] text-armani">动态与"附近-人"同源 · 一份内容多处展示</p>

      <div className="p-4 space-y-3">
        {myMoments.map((m) => (
          <div key={m.id} className="bg-card ring-soft rounded-2xl p-3.5">
            <div className="flex items-center gap-2.5">
              <Avatar name={m.author} size={36} />
              <div className="flex-1">
                <div className="text-[13px] font-medium">{m.author}</div>
                <div className="text-[10px] text-armani">{m.time} · {m.visibility === "public" ? "公开" : m.visibility === "friends" ? "好友可见" : `标签可见 · ${m.tag}`}</div>
              </div>
            </div>
            <p className="text-[14px] mt-2 leading-relaxed">{m.text}</p>
            {m.imageHint && (
              <div className="mt-2 h-32 rounded-2xl bg-gradient-to-br from-[hsl(25_30%_25%)] via-[hsl(25_25%_15%)] to-[hsl(25_30%_8%)] flex items-end p-2">
                <span className="text-[11px] text-primary-foreground/80">{m.imageHint}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {open && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative bg-card rounded-t-3xl border-t border-border p-5 pb-[calc(env(safe-area-inset-bottom)+20px)]" onClick={(e) => e.stopPropagation()}>
            <div className="text-[15px] font-medium mb-3">发布动态</div>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="此刻在想什么…"
              className="w-full h-24 rounded-xl bg-secondary p-3 text-[13px] placeholder:text-armani focus:outline-none resize-none" />
            <div className="mt-3 text-[12px] text-armani mb-1.5">谁可以看</div>
            <div className="inline-flex rounded-full bg-secondary p-1 text-[12px] mb-3">
              <button onClick={() => setVis("public")}  className={`px-3 py-1 rounded-full flex items-center gap-1 ${vis === "public"  ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}><Globe className="size-3" />公开</button>
              <button onClick={() => setVis("friends")} className={`px-3 py-1 rounded-full flex items-center gap-1 ${vis === "friends" ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}><Users className="size-3" />好友</button>
              <button onClick={() => setVis("tag")}     className={`px-3 py-1 rounded-full flex items-center gap-1 ${vis === "tag"     ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}><Tag className="size-3" />标签</button>
            </div>
            {vis === "tag" && (
              <div className="flex gap-1.5 flex-wrap mb-3">
                {allFriendTags.map((t) => (
                  <button key={t} onClick={() => setTag(t)} className={`h-7 px-2.5 rounded-full text-[11px] ${tag === t ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}>{t}</button>
                ))}
              </div>
            )}
            <button onClick={() => { toast("已发布", { description: vis === "tag" ? `仅"${tag}"标签的好友可见` : vis === "friends" ? "仅好友可见" : "公开" }); setOpen(false); setText(""); }}
              className="w-full h-11 rounded-2xl bg-primary text-primary-foreground text-[14px]">发布</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moments;
