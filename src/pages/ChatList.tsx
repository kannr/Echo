import { conversations, chatCategories, type ChatCategory } from "@/data/echo";
import Avatar from "@/components/echo/Avatar";
import TopBar from "@/components/echo/TopBar";
import VoiceWakeOverlay from "@/components/echo/VoiceWakeOverlay";
import { Search, Mic, Plus, BellOff, Pin } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users2, UserPlus2, ScanLine, MapPin } from "lucide-react";
import { toast } from "sonner";

const ChatList = () => {
  const [cat, setCat] = useState<ChatCategory>("single");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const list = useMemo(
    () => conversations.filter((c) => c.category === cat && (q === "" || c.name.includes(q) || c.preview.includes(q))),
    [cat, q],
  );

  return (
    <>
      <TopBar
        title={<span className="text-base">Echo</span>}
        left={
          <button onClick={() => setVoiceOpen(true)} className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep" aria-label="语音唤醒">
            <Mic className="size-[18px]" />
          </button>
        }
        right={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep" aria-label="更多">
                <Plus className="size-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => toast("发起群聊", { description: "从通讯录添加好友 (原型)" })}>
                <Users2 className="size-4 mr-2" /> 发起群聊
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("面对面建群", { description: "100m 范围内 (原型)" })}>
                <MapPin className="size-4 mr-2" /> 面对面建群
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("添加好友", { description: "搜索 Echo 号" })}>
                <UserPlus2 className="size-4 mr-2" /> 添加好友
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast("扫一扫", { description: "二维码 (原型)" })}>
                <ScanLine className="size-4 mr-2" /> 扫一扫
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        subtitle={
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-armani" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索 · 试试说 “搜索三毛”"
                className="w-full h-9 pl-9 pr-9 rounded-xl bg-secondary text-[13px] placeholder:text-armani focus:outline-none"
              />
              <button onClick={() => setVoiceOpen(true)} className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-lg flex items-center justify-center text-primary">
                <Mic className="size-4" />
              </button>
            </div>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1">
              {chatCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={`shrink-0 h-7 px-3 rounded-full text-[12px] transition ${
                    cat === c.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-armani-deep"
                  }`}
                >
                  {c.label}
                  {c.id === "public" && <span className="ml-1 opacity-70">加入</span>}
                  {c.id === "channel" && <span className="ml-1 opacity-70">订阅</span>}
                  {c.id === "agent" && <span className="ml-1 opacity-70">订阅</span>}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto">
        {list.length === 0 && (
          <div className="text-center text-armani text-sm mt-20">这里还没有内容</div>
        )}
        <ul className="divide-y divide-border">
          {list.map((c) => (
            <li key={c.id}>
              <Link to={`/chat/${c.id}`} className="flex items-center gap-3 px-4 py-3 active:bg-secondary/70">
                <Avatar name={c.name} emoji={c.avatar.length > 1 ? c.avatar : undefined} size={48} ring={c.category === "agent"} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[15px] truncate">{c.name}</span>
                    {c.pinned && <Pin className="size-3 text-armani" />}
                    {c.muted && <BellOff className="size-3 text-armani" />}
                  </div>
                  <div className="text-[13px] text-armani-deep truncate flex items-center gap-1">
                    {c.isVoice && <span className="text-primary">●</span>}
                    {c.preview}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[11px] text-armani">{c.time}</span>
                  {c.unread ? (
                    <span className="min-w-[18px] h-[18px] px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                      {c.unread > 99 ? "99+" : c.unread}
                    </span>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <VoiceWakeOverlay open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
};

export default ChatList;
