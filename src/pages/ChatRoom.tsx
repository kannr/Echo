import { useNavigate, useParams } from "react-router-dom";
import { conversations, sampleThread, type Message } from "@/data/echo";
import Avatar from "@/components/echo/Avatar";
import { ChevronLeft, MoreHorizontal, Mic, Plus, Keyboard, Send, Phone, Video, Play } from "lucide-react";
import { useMemo, useState } from "react";
import PlusPanel from "@/components/echo/PlusPanel";
import { toast } from "sonner";

const VoiceBubble = ({ duration, mine, transcript }: { duration: number; mine?: boolean; transcript?: string }) => (
  <div className={`flex flex-col gap-1 ${mine ? "items-end" : "items-start"}`}>
    <button className={`flex items-center gap-2 px-3 py-2 rounded-2xl min-w-[120px] ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
      <Play className="size-4" />
      <div className="flex items-end gap-[2px] h-5">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`echo-bar w-[2px] rounded-full ${mine ? "bg-primary-foreground/80" : "bg-primary/70"}`} style={{ height: 6 + (i % 5) * 3, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      <span className="text-[11px] opacity-80 ml-1">{duration}″</span>
    </button>
    {transcript && <span className={`text-[11px] text-armani max-w-[240px] ${mine ? "text-right" : "text-left"}`}>“{transcript}”</span>}
  </div>
);

const Bubble = ({ m }: { m: Message }) => {
  if (m.kind === "system") {
    return <div className="text-center text-[11px] text-armani my-2">{m.text}</div>;
  }
  const mine = m.from === "me";
  return (
    <div className={`flex gap-2 mb-3 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <Avatar name="三毛" size={32} />}
      <div className="max-w-[78%]">
        {m.kind === "text" && (
          <div className={`px-3.5 py-2 rounded-2xl text-[14px] leading-snug ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            {m.text}
          </div>
        )}
        {m.kind === "voice" && <VoiceBubble duration={m.duration ?? 1} mine={mine} transcript={m.text} />}
        {m.kind === "translated" && (
          <div className={`px-3.5 py-2 rounded-2xl text-[14px] leading-snug ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <div>{m.textTranslated}</div>
            <div className={`text-[11px] mt-1 ${mine ? "text-primary-foreground/70" : "text-armani"}`}>
              原文 · {m.textOriginal}
            </div>
          </div>
        )}
        {m.kind === "image" && (
          <div className="w-44 h-32 rounded-2xl bg-gradient-to-br from-[hsl(22_55%_62%)] via-[hsl(28_55%_72%)] to-[hsl(38_55%_82%)] ring-soft flex items-end p-2">
            <span className="text-[11px] text-primary-foreground/90">沙丘 · 黄昏</span>
          </div>
        )}
        <div className={`text-[10px] text-armani mt-1 ${mine ? "text-right" : "text-left"}`}>{m.time}</div>
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const conv = useMemo(() => conversations.find((c) => c.id === id) ?? conversations[0], [id]);

  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [plusOpen, setPlusOpen] = useState(false);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-secondary/40">
      {/* header */}
      <header className="glass border-b border-border h-14 px-3 flex items-center gap-2 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="size-9 rounded-full flex items-center justify-center text-armani-deep">
          <ChevronLeft className="size-6" />
        </button>
        <Avatar name={conv.name} emoji={conv.avatar.length > 1 ? conv.avatar : undefined} size={34} />
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium truncate">{conv.name}</div>
          <div className="text-[11px] text-armani">在线 · 母语 阿拉伯语</div>
        </div>
        <button onClick={() => toast("翻译电话", { description: "实时翻译 (原型)" })} className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep"><Phone className="size-[18px]" /></button>
        <button onClick={() => toast("视频通话")} className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep"><Video className="size-[18px]" /></button>
        <button className="size-9 rounded-full flex items-center justify-center text-armani-deep"><MoreHorizontal className="size-5" /></button>
      </header>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {sampleThread.map((m) => <Bubble key={m.id} m={m} />)}
      </div>

      {/* composer */}
      <div className="glass border-t border-border px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] flex items-end gap-2">
        <button
          onClick={() => setMode(mode === "voice" ? "text" : "voice")}
          className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep"
          aria-label="切换输入"
        >
          {mode === "voice" ? <Keyboard className="size-5" /> : <Mic className="size-5" />}
        </button>

        {mode === "voice" ? (
          <button
            onMouseDown={() => setRecording(true)}
            onMouseUp={() => { setRecording(false); toast("已发送 · 0:02", { description: "语音和文字将一起呈现" }); }}
            onTouchStart={() => setRecording(true)}
            onTouchEnd={() => { setRecording(false); toast("已发送 · 0:02"); }}
            className={`flex-1 h-10 rounded-full text-[13px] flex items-center justify-center transition-all select-none ${
              recording ? "bg-primary text-primary-foreground" : "bg-card ring-soft text-armani-deep"
            }`}
          >
            {recording ? (
              <span className="flex items-center gap-2">
                <span className="flex items-end gap-[2px] h-4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="echo-bar w-[2px] rounded-full bg-primary-foreground" style={{ height: 4 + (i % 5) * 3, animationDelay: `${i * 60}ms` }} />
                  ))}
                </span>
                松开发送
              </span>
            ) : "按住 说话 · 抬起即发"}
          </button>
        ) : (
          <div className="flex-1 flex items-center bg-card rounded-2xl ring-soft px-3 min-h-10">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="说点什么…"
              className="flex-1 bg-transparent text-[14px] placeholder:text-armani focus:outline-none py-2"
            />
          </div>
        )}

        {mode === "text" && text.trim() ? (
          <button onClick={() => { toast("已发送", { description: text }); setText(""); }} className="size-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Send className="size-5" />
          </button>
        ) : (
          <button onClick={() => setPlusOpen(true)} className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
            <Plus className="size-5" />
          </button>
        )}
      </div>

      <PlusPanel open={plusOpen} onClose={() => setPlusOpen(false)} />
    </div>
  );
};

export default ChatRoom;
