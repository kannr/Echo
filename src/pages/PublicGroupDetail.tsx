import SubTopBar from "@/components/echo/SubTopBar";
import Avatar from "@/components/echo/Avatar";
import {
  discoverPublicGroups, publicTopics, publicHighlights, publicMembers, publicReports,
} from "@/data/echo";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, FileText, Image as ImageIcon, Mic, Video } from "lucide-react";
import { toast } from "sonner";

type Tab = "members" | "rules" | "highlights" | "reports";

const PublicGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const g = discoverPublicGroups.find((x) => x.id === id) ?? discoverPublicGroups[0];
  const [tab, setTab] = useState<Tab>("members");
  const [topic, setTopic] = useState("t-default");
  const [composeOpen, setComposeOpen] = useState(false);

  const filteredHighlights = publicHighlights.filter((h) => topic === "t-default" || h.topic === topic);

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-hidden">
      <SubTopBar
        title={g.name}
        subtitle={
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {([
              { id: "members",    label: `成员 ${publicMembers.length}` },
              { id: "rules",      label: "规则" },
              { id: "highlights", label: "精华贴" },
              { id: "reports",    label: "AI 报告" },
            ] as const).map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`shrink-0 h-7 px-3 rounded-full text-[12px] ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}>
                {t.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-accent/40 text-primary flex items-center justify-center font-medium">{g.name[0]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-medium">{g.name}</div>
            <div className="text-[11px] text-armani">{g.members.toLocaleString()} 成员</div>
          </div>
          <button onClick={() => navigate(`/chat/g1`)} className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">进入群聊</button>
        </div>

        {tab === "members" && (
          <div className="bg-card ring-soft rounded-2xl divide-y divide-border">
            {publicMembers.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-2.5">
                <Avatar name={m.name} size={36} />
                <div className="flex-1 text-[14px]">{m.name}</div>
                <span className="text-[11px] text-armani">{m.role}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "rules" && (
          <div className="bg-card ring-soft rounded-2xl p-4">
            <div className="text-[14px] font-medium mb-2">群规则</div>
            <p className="text-[13px] text-armani-deep whitespace-pre-line leading-relaxed">{g.rule}</p>
            <button onClick={() => toast("已发起规则修订投票")} className="mt-3 h-9 px-4 rounded-full bg-primary text-primary-foreground text-[12px]">发起规则修订投票</button>
          </div>
        )}

        {tab === "highlights" && (
          <>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {publicTopics.map((t) => (
                <button key={t.id} onClick={() => setTopic(t.id)}
                  className={`shrink-0 h-7 px-3 rounded-full text-[12px] ${topic === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}>
                  # {t.name}
                </button>
              ))}
            </div>
            {filteredHighlights.map((h) => (
              <div key={h.id} className="bg-card ring-soft rounded-2xl p-3.5">
                <div className="flex items-center gap-2 text-[11px] text-armani mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-secondary">{h.kind}</span>
                  <span>{publicTopics.find((t) => t.id === h.topic)?.name}</span>
                  <span>· {h.author}</span>
                  <span className="ml-auto">{h.time}</span>
                </div>
                <div className="text-[14px]">{h.title}</div>
              </div>
            ))}
            <button onClick={() => setComposeOpen(true)}
              className="fixed bottom-24 right-[max(16px,calc(50vw-220px+16px))] size-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center">
              <Plus className="size-5" />
            </button>
          </>
        )}

        {tab === "reports" && publicReports.map((r) => (
          <div key={r.id} className="bg-card ring-soft rounded-2xl p-3.5">
            <div className="flex items-center gap-2 text-[11px] text-armani mb-1">
              <span>{r.date}</span>
            </div>
            <div className="text-[14px] font-medium">{r.title}</div>
            <p className="text-[12px] text-armani-deep mt-1.5 leading-relaxed">{r.summary}</p>
          </div>
        ))}
      </div>

      {composeOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={() => setComposeOpen(false)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative bg-card rounded-t-3xl border-t border-border p-5 pb-[calc(env(safe-area-inset-bottom)+20px)]" onClick={(e) => e.stopPropagation()}>
            <div className="text-[15px] font-medium mb-3">创作精华贴</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "img", label: "图文", icon: ImageIcon },
                { id: "vid", label: "视频", icon: Video },
                { id: "voi", label: "语音", icon: Mic },
              ].map((o) => (
                <button key={o.id} onClick={() => { toast(`新建 ${o.label} 帖`); setComposeOpen(false); }} className="flex flex-col items-center gap-2 py-4 rounded-2xl bg-secondary">
                  <o.icon className="size-6 text-primary" />
                  <span className="text-[12px]">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicGroupDetail;
