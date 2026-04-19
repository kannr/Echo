import SubTopBar from "@/components/echo/SubTopBar";
import { nearbyPeople } from "@/data/echo";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Heart, Sparkles, MapPin } from "lucide-react";
import { toast } from "sonner";

const NearbyProfile = () => {
  const { id } = useParams();
  const p = nearbyPeople.find((x) => x.id === id) ?? nearbyPeople[0];
  // mock 配额
  const [sentToday] = useState(0);   // 已发出
  const [recvToday] = useState(2);   // 已收到
  const sentLeft = Math.max(0, 1 - sentToday);
  const recvLeft = Math.max(0, 5 - recvToday);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto">
      <SubTopBar title={p.name} />
      <div className="p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
          <div className="size-16 rounded-2xl bg-accent/40 text-primary flex items-center justify-center text-lg font-medium">{p.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-medium">{p.name}</div>
            <div className="text-[11px] text-armani flex items-center gap-1 mt-0.5"><MapPin className="size-3" /> {p.distanceM}m · {p.language}</div>
            <div className="text-[12px] text-armani-deep mt-0.5">{p.status}</div>
            <div className="flex gap-3 mt-1.5 text-[11px]">
              <span className="text-primary flex items-center gap-1"><Sparkles className="size-3" /> 契合 {p.fit}</span>
              <span className="text-armani flex items-center gap-1"><Heart className="size-3" /> 待评估</span>
            </div>
          </div>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5">
          <div className="text-[12px] text-armani mb-1">今日动态</div>
          <div className="space-y-2">
            {[
              { id: "d1", text: "在咖啡馆写作，需要安静的位置", time: "2h" },
              { id: "d2", text: "推荐沙丘日落点：Erg Chebbi 西侧", time: "5h" },
            ].map((d) => (
              <div key={d.id} className="border-t border-border pt-2 first:border-0 first:pt-0">
                <div className="text-[13px]">{d.text}</div>
                <div className="text-[10px] text-armani mt-0.5">{d.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card ring-soft rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[12px] text-armani">
            <span>今日好友申请额度</span>
            <span>发出 {sentToday}/1 · 接收 {recvToday}/5</span>
          </div>
          <button
            disabled={sentLeft === 0 || recvLeft === 0}
            onClick={() => toast("好友申请已发送", { description: "对方接收名额 +1" })}
            className={`w-full h-11 rounded-2xl text-[14px] ${sentLeft === 0 || recvLeft === 0 ? "bg-secondary text-armani" : "bg-primary text-primary-foreground"}`}
          >
            {sentLeft === 0 ? "今日额度已用完" : recvLeft === 0 ? "对方今日不可接收" : "申请加为好友"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyProfile;
