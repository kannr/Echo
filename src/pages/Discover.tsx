import TopBar from "@/components/echo/TopBar";
import {
  discoverPublicGroups, discoverChannels, discoverAgents, discoverDialects,
  discoverNearby, nearbyRooms,
} from "@/data/echo";
import { Users2, Radio, Sparkles, Languages, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const sections = [
  { id: "public",  label: "公群",   icon: Users2 },
  { id: "channel", label: "频道",   icon: Radio },
  { id: "agent",   label: "智能体", icon: Sparkles },
  { id: "lang",    label: "语言包", icon: Languages },
  { id: "nearby",  label: "附近",   icon: MapPin },
] as const;

type SectionId = typeof sections[number]["id"];

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card ring-soft rounded-2xl p-3.5">{children}</div>
);

const Discover = () => {
  const [sec, setSec] = useState<SectionId>("public");

  return (
    <>
      <TopBar
        title="发现"
        subtitle={
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSec(id)}
                className={`shrink-0 h-8 px-3 rounded-full text-[12px] flex items-center gap-1.5 ${
                  sec === id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"
                }`}
              >
                <Icon className="size-3.5" /> {label}
              </button>
            ))}
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sec === "public" && (
          <>
            <p className="text-[12px] text-armani -mt-1 mb-1">公共建设 · 投票治理 · 收益按贡献分配</p>
            {discoverPublicGroups.map((g) => (
              <Card key={g.id}>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-sand flex items-center justify-center text-primary text-lg font-medium">{g.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium">{g.name}</div>
                    <div className="text-[11px] text-armani">{g.members.toLocaleString()} 成员 · {g.topics} 个话题</div>
                  </div>
                  <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">加入</button>
                </div>
                <p className="text-[12px] text-armani-deep mt-2">{g.desc}</p>
              </Card>
            ))}
          </>
        )}

        {sec === "channel" && discoverChannels.map((c) => (
          <Card key={c.id}>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-medium">{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium">{c.name}</div>
                <div className="text-[11px] text-armani">{c.subs.toLocaleString()} 订阅 · {c.by}</div>
              </div>
              <button className="h-8 px-3 rounded-full bg-secondary text-armani-deep text-[12px]">订阅</button>
            </div>
          </Card>
        ))}

        {sec === "agent" && discoverAgents.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center"><Sparkles className="size-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium">{a.name}</div>
                <div className="text-[11px] text-armani">{a.skill}</div>
              </div>
              <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">订阅</button>
            </div>
          </Card>
        ))}

        {sec === "lang" && (
          <>
            <p className="text-[12px] text-armani -mt-1 mb-1">方言 LoRA · 离线可用</p>
            {discoverDialects.map((d) => (
              <Card key={d.id}>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center text-armani-deep"><Languages className="size-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium">{d.name}</div>
                    <div className="text-[11px] text-armani">{d.size}</div>
                  </div>
                  <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">下载</button>
                </div>
              </Card>
            ))}
          </>
        )}

        {sec === "nearby" && (
          <>
            <div>
              <div className="text-[12px] text-armani mb-2">人 · 动态</div>
              {discoverNearby.map((n) => (
                <Card key={n.id}>
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-sand text-primary flex items-center justify-center font-medium">{n.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px]">{n.name} <span className="text-[11px] text-armani ml-1">{n.distance}</span></div>
                      <div className="text-[12px] text-armani-deep truncate">{n.status}</div>
                    </div>
                    <ChevronRight className="size-4 text-armani" />
                  </div>
                </Card>
              ))}
            </div>
            <div className="pt-2">
              <div className="text-[12px] text-armani mb-2">游戏房间</div>
              {nearbyRooms.map((r) => (
                <Card key={r.id}>
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-2xl bg-accent flex items-center justify-center text-xl">{r.tag}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium">{r.title}</div>
                      <div className="text-[11px] text-armani">房主 {r.host}</div>
                    </div>
                    <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">加入</button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Discover;
