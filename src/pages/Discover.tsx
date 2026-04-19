import TopBar from "@/components/echo/TopBar";
import {
  discoverPublicGroups, discoverChannels, discoverAgents, discoverDialects,
  nearbyPeople, nearbyRooms, nearbyPublicGroups,
} from "@/data/echo";
import { Users2, Radio, Sparkles, Languages, MapPin, ChevronRight, Sparkle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  { id: "nearby",  label: "附近",   icon: MapPin },
  { id: "public",  label: "公群",   icon: Users2 },
  { id: "channel", label: "频道",   icon: Radio },
  { id: "agent",   label: "智能体", icon: Sparkles },
  { id: "lang",    label: "语言包", icon: Languages },
] as const;

type SectionId = typeof sections[number]["id"];
type NearbySub = "people" | "rooms" | "groups";
type NearbySort = "smart" | "distance" | "fit";

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-card ring-soft rounded-2xl p-3.5 ${className}`}>{children}</div>
);

const fmt = (m: number) => (m < 1000 ? `${m}m` : `${(m / 1000).toFixed(1)}km`);

const Discover = () => {
  const [sec, setSec] = useState<SectionId>("nearby");
  const [sub, setSub] = useState<NearbySub>("people");
  const [sort, setSort] = useState<NearbySort>("smart");

  const sortedPeople = [...nearbyPeople].sort((a, b) => {
    if (sort === "distance") return a.distanceM - b.distanceM;
    if (sort === "fit")      return b.fit - a.fit;
    return (b.fit - a.fit) - (a.distanceM - b.distanceM) * 0.01;
  });

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

        {sec === "nearby" && (
          <>
            {/* Match entry */}
            <Link to="/match" className="block">
              <Card className="!p-3 bg-gradient-to-r from-primary/10 to-accent/40">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center"><Sparkle className="size-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium">智能匹配</div>
                    <div className="text-[11px] text-armani">描述你想找的人 · 给出契合度最高的一位</div>
                  </div>
                  <ChevronRight className="size-4 text-armani" />
                </div>
              </Card>
            </Link>

            {/* sub-tabs: 人 / 游戏房间 / 公群 */}
            <div className="flex gap-1.5">
              {([
                { id: "people", label: "人" },
                { id: "rooms",  label: "游戏房间" },
                { id: "groups", label: "附近公群" },
              ] as const).map((t) => (
                <button key={t.id} onClick={() => setSub(t.id)}
                  className={`h-7 px-3 rounded-full text-[12px] ${sub === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {sub === "people" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-[12px] text-armani">{sortedPeople.length} 人在附近</div>
                  <div className="inline-flex rounded-full bg-secondary p-0.5 text-[11px]">
                    {([
                      { id: "smart", label: "综合" },
                      { id: "distance", label: "距离" },
                      { id: "fit", label: "契合度" },
                    ] as const).map((s) => (
                      <button key={s.id} onClick={() => setSort(s.id)}
                        className={`px-2.5 py-1 rounded-full ${sort === s.id ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                {sortedPeople.map((n) => (
                  <Link to={`/nearby/${n.id}`} key={n.id} className="block">
                    <Card>
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-2xl bg-sand text-primary flex items-center justify-center font-medium bg-accent/40">{n.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px]">{n.name}
                            <span className="text-[11px] text-armani ml-1">{fmt(n.distanceM)}</span>
                            <span className="text-[11px] text-primary ml-1.5">契合 {n.fit}</span>
                          </div>
                          <div className="text-[12px] text-armani-deep truncate">{n.status}</div>
                        </div>
                        <ChevronRight className="size-4 text-armani" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </>
            )}

            {sub === "rooms" && nearbyRooms.map((r) => (
              <Card key={r.id}>
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-accent flex items-center justify-center text-xl">{r.tag}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium">{r.title}</div>
                    <div className="text-[11px] text-armani">房主 {r.host} · 最近一人 {fmt(r.nearestPersonM)}</div>
                  </div>
                  <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">加入</button>
                </div>
                <button className="w-full mt-2.5 h-8 rounded-full bg-secondary text-armani-deep text-[12px]">游戏后建立游戏群</button>
              </Card>
            ))}

            {sub === "groups" && nearbyPublicGroups.map((g) => (
              <Card key={g.id}>
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-medium">{g.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium">{g.name}</div>
                    <div className="text-[11px] text-armani">{g.members} 成员 · {fmt(g.distanceM)}</div>
                  </div>
                  <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">查看</button>
                </div>
              </Card>
            ))}
          </>
        )}

        {sec === "public" && (
          <>
            <p className="text-[12px] text-armani -mt-1 mb-1">公共建设 · 投票治理 · 收益按贡献分配</p>
            {discoverPublicGroups.map((g) => (
              <Link to={`/public-group/${g.id}`} key={g.id} className="block">
                <Card>
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-accent/40 flex items-center justify-center text-primary text-lg font-medium">{g.name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium">{g.name}</div>
                      <div className="text-[11px] text-armani">{g.members.toLocaleString()} 成员 · {g.topics} 话题</div>
                    </div>
                    <ChevronRight className="size-4 text-armani" />
                  </div>
                  <p className="text-[12px] text-armani-deep mt-2 line-clamp-2">{g.desc}</p>
                </Card>
              </Link>
            ))}
          </>
        )}

        {sec === "channel" && discoverChannels.map((c) => (
          <Link to={`/channel/${c.id}`} key={c.id} className="block">
            <Card>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-medium">{c.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium">{c.name}</div>
                  <div className="text-[11px] text-armani">{c.subs.toLocaleString()} 订阅 · {c.by}</div>
                </div>
                <ChevronRight className="size-4 text-armani" />
              </div>
            </Card>
          </Link>
        ))}

        {sec === "agent" && discoverAgents.map((a) => (
          <Link to={`/agent/${a.id}`} key={a.id} className="block">
            <Card>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center"><Sparkles className="size-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium">{a.name}</div>
                  <div className="text-[11px] text-armani">{a.skill}</div>
                </div>
                <ChevronRight className="size-4 text-armani" />
              </div>
            </Card>
          </Link>
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
                    <div className="text-[11px] text-armani">{d.size} · {d.users} 使用 · 热度 {d.heat}</div>
                  </div>
                  <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">下载</button>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Discover;
