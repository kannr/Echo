import SubTopBar from "@/components/echo/SubTopBar";
import { discoverChannels, channelPosts } from "@/data/echo";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldOff } from "lucide-react";

const ChannelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = discoverChannels.find((x) => x.id === id) ?? discoverChannels[0];
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto">
      <SubTopBar title={c.name} />
      <div className="p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg font-medium">{c.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-medium">{c.name}</div>
            <div className="text-[11px] text-armani">{c.subs.toLocaleString()} 订阅 · {c.by}</div>
          </div>
          <button onClick={() => { setSubscribed(!subscribed); toast(subscribed ? "已取消订阅" : "已订阅"); }}
            className={`h-8 px-3 rounded-full text-[12px] ${subscribed ? "bg-secondary text-armani-deep" : "bg-primary text-primary-foreground"}`}>
            {subscribed ? "已订阅" : "订阅"}
          </button>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5">
          <div className="text-[12px] text-armani mb-1">介绍</div>
          <p className="text-[13px] text-armani-deep leading-relaxed">{c.desc}</p>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5 space-y-3">
          <div className="text-[12px] text-armani">最近文章</div>
          {channelPosts.map((p) => (
            <div key={p.id} className="border-t border-border pt-2.5 first:border-0 first:pt-0">
              <div className="text-[14px] font-medium">{p.title}</div>
              <div className="text-[12px] text-armani-deep mt-0.5 line-clamp-2">{p.excerpt}</div>
              <div className="text-[10px] text-armani mt-1">{p.time}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate(`/chat/${c.id}`)} className="h-11 rounded-2xl bg-primary text-primary-foreground text-[14px]">进入频道单聊</button>
          <button onClick={() => toast("已拉黑此频道", { description: "以后将不再推荐" })} className="h-11 rounded-2xl bg-card ring-soft text-armani-deep text-[14px] flex items-center justify-center gap-1.5">
            <ShieldOff className="size-4" /> 拉黑
          </button>
        </div>
        <p className="text-[11px] text-armani text-center">频道主可拉黑某些人 · 你也可以拉黑频道</p>
      </div>
    </div>
  );
};

export default ChannelDetail;
