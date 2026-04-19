import TopBar from "@/components/echo/TopBar";
import Avatar from "@/components/echo/Avatar";
import { friends, friendRequests } from "@/data/echo";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Tab = "friends" | "groups" | "requests";

const Contacts = () => {
  const [tab, setTab] = useState<Tab>("friends");

  const grouped = useMemo(() => {
    const map = new Map<string, typeof friends>();
    friends.forEach((f) => {
      const key = f.letter.toUpperCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(f);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  return (
    <>
      <TopBar
        title="通讯录"
        right={<button className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep"><Plus className="size-5" /></button>}
        subtitle={
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-armani" />
              <input placeholder="搜索联系人" className="w-full h-9 pl-9 rounded-xl bg-secondary text-[13px] placeholder:text-armani focus:outline-none" />
            </div>
            <div className="flex gap-1.5">
              {([
                { id: "friends",  label: "好友" },
                { id: "groups",   label: "私群" },
                { id: "requests", label: `好友申请 · ${friendRequests.length}` },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`h-7 px-3 rounded-full text-[12px] ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        {tab === "friends" && (
          <ul>
            {grouped.map(([letter, items]) => (
              <li key={letter}>
                <div className="px-4 py-1.5 text-[11px] text-armani bg-secondary/50">{letter}</div>
                {items.map((f) => (
                  <div key={f.id} className="flex items-center gap-3 px-4 py-2.5">
                    <Avatar name={f.name} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px]">{f.name}</div>
                      {f.tags.length > 0 && (
                        <div className="flex gap-1 mt-0.5">
                          {f.tags.map((t) => (
                            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-sand text-primary">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}

        {tab === "groups" && (
          <div className="p-4 space-y-3">
            {[
              { name: "沙漠出行", topics: ["默认", "装备", "路线"] },
              { name: "家人",     topics: ["默认", "晚餐"] },
              { name: "读书会",   topics: ["默认", "三毛", "卡尔维诺"] },
            ].map((g) => (
              <div key={g.name} className="bg-card ring-soft rounded-2xl p-3.5">
                <div className="flex items-center gap-3">
                  <Avatar name={g.name} size={40} />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium">{g.name}</div>
                    <div className="text-[11px] text-armani">{g.topics.length} 个话题</div>
                  </div>
                  <button className="text-[12px] text-primary">新建话题</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {g.topics.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-secondary text-armani-deep">#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "requests" && (
          <ul className="divide-y divide-border">
            {friendRequests.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={r.name} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium">{r.name}</div>
                  <div className="text-[12px] text-armani truncate">{r.intro}</div>
                </div>
                <button className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">同意</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Contacts;
