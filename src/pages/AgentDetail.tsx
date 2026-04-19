import SubTopBar from "@/components/echo/SubTopBar";
import { discoverAgents } from "@/data/echo";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const a = discoverAgents.find((x) => x.id === id) ?? discoverAgents[0];
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto">
      <SubTopBar title={a.name} />
      <div className="p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center"><Sparkles className="size-6" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-medium">{a.name}</div>
            <div className="text-[11px] text-armani">{a.skill}</div>
          </div>
          <button onClick={() => { setSubscribed(!subscribed); toast(subscribed ? "已取消订阅" : "已订阅"); }}
            className={`h-8 px-3 rounded-full text-[12px] ${subscribed ? "bg-secondary text-armani-deep" : "bg-primary text-primary-foreground"}`}>
            {subscribed ? "已订阅" : "订阅"}
          </button>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5">
          <div className="text-[12px] text-armani mb-1">介绍</div>
          <p className="text-[13px] text-armani-deep leading-relaxed">{a.desc}</p>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5 space-y-2">
          <div className="text-[12px] text-armani">能力</div>
          <div className="flex flex-wrap gap-1.5">
            {a.skill.split(" · ").map((s) => (
              <span key={s} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-armani-deep">{s}</span>
            ))}
          </div>
        </div>

        <button onClick={() => navigate(`/chat/${a.id}`)} className="w-full h-11 rounded-2xl bg-primary text-primary-foreground text-[14px]">开始对话</button>
      </div>
    </div>
  );
};

export default AgentDetail;
