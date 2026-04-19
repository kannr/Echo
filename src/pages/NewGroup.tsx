import SubTopBar from "@/components/echo/SubTopBar";
import Avatar from "@/components/echo/Avatar";
import { friends } from "@/data/echo";
import { useState } from "react";
import { Check, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewGroup = () => {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const list = friends.filter((f) => f.name.includes(q));
  const toggle = (id: string) => {
    const n = new Set(picked); n.has(id) ? n.delete(id) : n.add(id); setPicked(n);
  };

  return (
    <div className="flex-1 flex flex-col">
      <SubTopBar
        title="发起群聊"
        right={
          <button
            disabled={picked.size < 1}
            onClick={() => { toast("已建群", { description: `${picked.size + 1} 人 · 沙漠出行` }); navigate("/"); }}
            className={`h-8 px-3 rounded-full text-[12px] ${picked.size < 1 ? "bg-secondary text-armani" : "bg-primary text-primary-foreground"}`}
          >
            完成 ({picked.size})
          </button>
        }
        subtitle={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-armani" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索好友"
              className="w-full h-9 pl-9 rounded-xl bg-secondary text-[13px] placeholder:text-armani focus:outline-none" />
          </div>
        }
      />
      <ul className="flex-1 overflow-y-auto divide-y divide-border">
        {list.map((f) => (
          <li key={f.id}>
            <button onClick={() => toggle(f.id)} className="w-full flex items-center gap-3 px-4 py-2.5 active:bg-secondary/70">
              <span className={`size-5 rounded-full flex items-center justify-center ${picked.has(f.id) ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {picked.has(f.id) && <Check className="size-3.5" />}
              </span>
              <Avatar name={f.name} size={40} />
              <div className="flex-1 text-left">
                <div className="text-[14px]">{f.name}</div>
                <div className="text-[11px] text-armani">{f.tags.join(" · ") || "无标签"}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewGroup;
