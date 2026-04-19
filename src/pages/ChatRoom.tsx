import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { conversations, sampleThread, type Message } from "@/data/echo";
import Avatar from "@/components/echo/Avatar";
import {
  ChevronLeft, MoreHorizontal, Mic, Plus, Keyboard, Send, Phone, Video, Play,
  FileText, MapPin, Contact as ContactIcon, Heart, Languages, PhoneCall, VideoIcon, Link as LinkIcon,
  Vote, Radio,
} from "lucide-react";
import { useMemo, useState } from "react";
import PlusPanel from "@/components/echo/PlusPanel";
import LongPressSheet, { SheetAction } from "@/components/echo/LongPressSheet";
import { useLongPress } from "@/hooks/useLongPress";
import { toast } from "sonner";

/* ---------------- Bubbles ---------------- */

const VoiceBubble = ({ duration, mine, transcript }: { duration: number; mine?: boolean; transcript?: string }) => (
  <div className={`flex flex-col gap-1 ${mine ? "items-end" : "items-start"}`}>
    <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl min-w-[120px] ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
      <Play className="size-4" />
      <div className="flex items-end gap-[2px] h-5">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`echo-bar w-[2px] rounded-full ${mine ? "bg-primary-foreground/80" : "bg-primary/70"}`} style={{ height: 6 + (i % 5) * 3, animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      <span className="text-[11px] opacity-80 ml-1">{duration}″</span>
    </div>
    {transcript && <span className={`text-[11px] text-armani max-w-[240px] ${mine ? "text-right" : "text-left"}`}>"{transcript}"</span>}
  </div>
);

const CallBubble = ({
  m, mine, label, Icon,
}: { m: Message; mine?: boolean; label: string; Icon: any }) => (
  <div className={`px-3.5 py-2.5 rounded-2xl flex items-center gap-2 ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
    <Icon className="size-4" />
    <span className="text-[13px]">{label}</span>
    <span className={`text-[12px] ${mine ? "opacity-90" : "text-armani"}`}>{m.callDuration}</span>
  </div>
);

interface BubbleProps {
  m: Message;
  fromName?: string;
  onLongPress: (m: Message) => void;
  onLinkClick?: (m: Message) => void;
  onIRLConfirm?: (m: Message) => void;
}

const Bubble = ({ m, fromName, onLongPress, onLinkClick, onIRLConfirm }: BubbleProps) => {
  const longPress = useLongPress(() => onLongPress(m));
  if (m.kind === "system") {
    return <div className="text-center text-[11px] text-armani my-2">{m.text}</div>;
  }
  const mine = m.from === "me";
  return (
    <div className={`flex gap-2 mb-3 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <Avatar name={fromName ?? "对方"} size={32} />}
      <div className="max-w-[78%]" {...longPress}>
        {m.kind === "text" && (
          <div className={`px-3.5 py-2 rounded-2xl text-[14px] leading-snug ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            {m.text}
          </div>
        )}
        {m.kind === "voice" && <VoiceBubble duration={m.duration ?? 1} mine={mine} transcript={m.text} />}
        {m.kind === "translated" && (
          <div className={`px-3.5 py-2 rounded-2xl text-[14px] leading-snug ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <div>{m.textTranslated}</div>
            <div className={`text-[11px] mt-1 ${mine ? "text-primary-foreground/70" : "text-armani"}`}>原文 · {m.textOriginal}</div>
          </div>
        )}
        {m.kind === "image" && (
          <div className="w-44 h-32 rounded-2xl bg-gradient-to-br from-[hsl(22_55%_62%)] via-[hsl(28_55%_72%)] to-[hsl(38_55%_82%)] ring-soft flex items-end p-2">
            <span className="text-[11px] text-primary-foreground/90">沙丘 · 黄昏</span>
          </div>
        )}
        {m.kind === "video" && (
          <div className="relative w-44 h-32 rounded-2xl ring-soft overflow-hidden bg-gradient-to-br from-[hsl(28_45%_45%)] to-[hsl(36_55%_75%)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="size-11 rounded-full bg-foreground/45 backdrop-blur flex items-center justify-center">
                <Play className="size-5 text-primary-foreground" />
              </span>
            </div>
            <span className="absolute bottom-1.5 right-2 text-[10px] text-primary-foreground/90">0:42</span>
          </div>
        )}
        {m.kind === "link" && m.link && (
          <button onClick={() => onLinkClick?.(m)} className={`block text-left w-60 rounded-2xl overflow-hidden ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <div className="p-3">
              <div className="flex items-center gap-1.5 text-[11px] opacity-70 mb-1"><LinkIcon className="size-3" /> 链接</div>
              <div className="text-[13.5px] font-medium leading-snug">{m.link.title}</div>
              {m.link.desc && <div className={`text-[11px] mt-0.5 ${mine ? "opacity-80" : "text-armani"}`}>{m.link.desc}</div>}
              <div className={`text-[10px] mt-1 truncate ${mine ? "opacity-70" : "text-armani"}`}>{m.link.url}</div>
            </div>
          </button>
        )}
        {m.kind === "file" && m.file && (
          <div className={`w-60 px-3 py-2.5 rounded-2xl flex items-center gap-3 ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <span className="size-10 rounded-xl bg-card text-primary flex items-center justify-center font-medium text-[11px]">{m.file.ext}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] truncate">{m.file.name}</div>
              <div className={`text-[11px] ${mine ? "opacity-80" : "text-armani"}`}>{m.file.size}</div>
            </div>
            <FileText className="size-4 opacity-70" />
          </div>
        )}
        {m.kind === "call"          && <CallBubble m={m} mine={mine} label="语音电话"   Icon={PhoneCall} />}
        {m.kind === "transCall"     && <CallBubble m={m} mine={mine} label="翻译电话"   Icon={Languages} />}
        {m.kind === "videoCall"     && <CallBubble m={m} mine={mine} label="视频通话"   Icon={VideoIcon} />}
        {m.kind === "transVideoCall"&& <CallBubble m={m} mine={mine} label="翻译视频"   Icon={Languages} />}
        {m.kind === "location" && m.location && (
          <div className={`w-60 rounded-2xl overflow-hidden ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <div className="h-20 bg-gradient-to-br from-[hsl(38_45%_72%)] to-[hsl(34_30%_85%)] flex items-center justify-center">
              <MapPin className="size-6 text-primary" />
            </div>
            <div className="p-2.5">
              <div className="text-[13px]">{m.location.name}</div>
              <div className={`text-[11px] ${mine ? "opacity-80" : "text-armani"}`}>{m.location.addr}</div>
            </div>
          </div>
        )}
        {m.kind === "contact" && m.contact && (
          <div className={`w-60 px-3 py-2.5 rounded-2xl flex items-center gap-3 ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <Avatar name={m.contact.name} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px]">{m.contact.name}</div>
              <div className={`text-[11px] ${mine ? "opacity-80" : "text-armani"}`}>Echo · {m.contact.echo}</div>
            </div>
            <ContactIcon className="size-4 opacity-70" />
          </div>
        )}
        {m.kind === "irl" && m.irl && (
          <div className={`w-64 rounded-2xl overflow-hidden ${mine ? "bg-bubble-out text-bubble-out-foreground" : "bg-bubble-in text-bubble-in-foreground ring-soft"}`}>
            <div className="px-3 pt-3 pb-2 flex items-center gap-2">
              <Heart className="size-4 text-primary" />
              <span className="text-[13px] font-medium">面基邀请</span>
            </div>
            <div className={`px-3 text-[12px] ${mine ? "opacity-90" : "text-armani-deep"}`}>{m.irl.place} · {m.irl.when}</div>
            <button
              onClick={() => onIRLConfirm?.(m)}
              className="mt-2.5 mb-2 mx-3 h-8 rounded-full bg-card text-primary text-[12px] font-medium flex items-center justify-center"
            >
              {m.irl.confirmed ? "已确认 · 校验 GPS 中" : "确认参加 · 校验 GPS"}
            </button>
          </div>
        )}
        <div className={`text-[10px] text-armani mt-1 ${mine ? "text-right" : "text-left"}`}>{m.time}</div>
      </div>
    </div>
  );
};

/* ---------------- ChatRoom ---------------- */

const ChatRoom = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const conv = useMemo(() => conversations.find((c) => c.id === id) ?? conversations[0], [id]);
  const isPublic  = conv.category === "public";
  const isChannel = conv.category === "channel";
  // 频道：默认我是粉丝；通过 ?as=owner 模拟频道主
  const isOwner = isChannel && params.get("as") === "owner";
  const fanInChannel = isChannel && !isOwner;

  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [plusOpen, setPlusOpen] = useState(false);
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [active, setActive] = useState<Message | null>(null);
  const [topic, setTopic] = useState("t-default");
  const [voiceRoomOpen, setVoiceRoomOpen] = useState(false);

  /** Per-message-kind action sheet builders */
  const sheetActions = (m: Message): SheetAction[] => {
    const base: SheetAction[] = [];
    switch (m.kind) {
      case "image":
        return [
          { id: "ocr",   label: "提取文字",     hint: "识别图中文字", onClick: () => toast("已提取", { description: "原图与文字对照已生成" }) },
          { id: "trans", label: "翻译图片文字", hint: "上下对照展示", onClick: () => toast("翻译完成", { description: "原图 ↔ 译文上下对照" }) },
          { id: "save",  label: "保存到相册" },
          { id: "fwd",   label: "转发" },
        ];
      case "video":
        return [
          { id: "trans", label: "翻译字幕", onClick: () => toast("字幕已翻译") },
          { id: "save",  label: "保存到相册" },
          { id: "fwd",   label: "转发" },
        ];
      case "link":
        return [
          { id: "open",  label: "直接打开",   onClick: () => toast("打开链接") },
          { id: "topen", label: "翻译后打开", hint: "页面正文实时翻译", onClick: () => toast("翻译并打开") },
          { id: "copy",  label: "复制链接" },
        ];
      case "file":
        return [
          { id: "trans", label: "翻译文件",   hint: "翻译后可发送译版", onClick: () => toast("翻译版已生成", { description: "可发送给对方" }) },
          { id: "send",  label: "发送译版给…", onClick: () => toast("已选择联系人发送") },
          { id: "save",  label: "保存到本地" },
        ];
      case "call":
      case "transCall":
        return [
          { id: "report", label: "通话总结报告", hint: "AI 提取要点 / 待办", onClick: () => toast("通话报告", { description: "5 个要点 · 2 个待办" }) },
          { id: "redial", label: "回拨" },
        ];
      case "videoCall":
      case "transVideoCall":
        return [
          { id: "report", label: "视频总结报告", hint: "画面 + 语音综合摘要", onClick: () => toast("视频报告", { description: "已生成章节摘要" }) },
          { id: "redial", label: "重新视频" },
        ];
      case "voice":
        return [
          { id: "raw",   label: "查看原始消息", onClick: () => toast("原始语音波形") },
          { id: "trans", label: "原文 / 翻译切换", onClick: () => toast("原文 ↔ 译文已切换") },
          { id: "fwd",   label: "转发" },
        ];
      case "text":
      case "translated":
        return [
          { id: "copy",  label: "复制" },
          { id: "trans", label: "翻译", onClick: () => toast("已翻译") },
          { id: "fwd",   label: "转发" },
        ];
      case "location":
        return [
          { id: "nav",   label: "导航前往", onClick: () => toast("已发送到地图") },
          { id: "copy",  label: "复制地址" },
        ];
      case "contact":
        return [
          { id: "add",   label: "加为好友", onClick: () => toast("已发送好友请求") },
          { id: "fwd",   label: "转发名片" },
        ];
      case "irl":
        return [
          { id: "edit",  label: "修改时间地点" },
          { id: "cancel",label: "取消邀请", destructive: true },
        ];
      default: return base;
    }
  };

  const callBtn = (kind: "phone" | "video") => {
    if (fanInChannel) {
      toast("仅频道主可发起", { description: "粉丝不能向频道发起电话/视频" });
      return;
    }
    toast(kind === "phone" ? "翻译电话" : "视频通话", { description: "实时翻译 (原型)" });
  };

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
          <div className="text-[11px] text-armani truncate">
            {isPublic ? "公群 · 话题制" : isChannel ? (isOwner ? "频道主视角" : "频道 · 仅与频道主对话") : "在线 · 母语 阿拉伯语"}
          </div>
        </div>
        <button
          onClick={() => callBtn("phone")}
          className={`size-9 rounded-full flex items-center justify-center ${fanInChannel ? "bg-secondary/60 text-armani" : "bg-secondary text-armani-deep"}`}
        ><Phone className="size-[18px]" /></button>
        <button
          onClick={() => callBtn("video")}
          className={`size-9 rounded-full flex items-center justify-center ${fanInChannel ? "bg-secondary/60 text-armani" : "bg-secondary text-armani-deep"}`}
        ><Video className="size-[18px]" /></button>
        <button
          onClick={() => isPublic ? navigate(`/group/${conv.id}`) : toast("更多")}
          className="size-9 rounded-full flex items-center justify-center text-armani-deep"
        ><MoreHorizontal className="size-5" /></button>
      </header>

      {/* public group: topic strip */}
      {isPublic && (
        <div className="px-3 py-2 border-b border-border flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "t-default", name: "全部" },
            { id: "t-lisbon", name: "里斯本" },
            { id: "t-bcn", name: "巴塞罗那" },
            { id: "t-berlin", name: "柏林" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTopic(t.id)}
              className={`shrink-0 h-7 px-3 rounded-full text-[12px] ${topic === t.id ? "bg-primary text-primary-foreground" : "bg-secondary text-armani-deep"}`}
            >
              # {t.name}
            </button>
          ))}
        </div>
      )}

      {/* fan-in-channel hint */}
      {fanInChannel && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-accent/40 text-[12px] text-armani-deep">
          你是粉丝身份。仅能与频道主单聊；电话 / 视频按钮已置灰。
        </div>
      )}

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* public group rule-vote sample */}
        {isPublic && (
          <div className="mb-3 mx-auto max-w-[280px] bg-card ring-soft rounded-2xl p-3">
            <div className="flex items-center gap-2 text-[12px] text-primary mb-1.5">
              <Vote className="size-4" /> 群规则投票 · 由 三毛 发起
            </div>
            <div className="text-[13px] mb-2">是否禁止纯转发广告类内容？</div>
            <div className="flex gap-2">
              <button className="flex-1 h-8 rounded-full bg-primary text-primary-foreground text-[12px]">同意 62%</button>
              <button className="flex-1 h-8 rounded-full bg-secondary text-armani-deep text-[12px]">反对 38%</button>
            </div>
          </div>
        )}
        {sampleThread.map((m) => (
          <Bubble
            key={m.id}
            m={m}
            fromName={conv.name}
            onLongPress={(mm) => setActive(mm)}
            onLinkClick={(mm) => setActive(mm)}
            onIRLConfirm={() => toast("校验 GPS 中…", { description: "确认面基后将开放评价（评分私密不可见）" })}
          />
        ))}
      </div>

      {/* public group voice-room banner */}
      {isPublic && voiceRoomOpen && (
        <div className="mx-3 mb-2 rounded-2xl bg-primary text-primary-foreground p-3 flex items-center gap-3">
          <Radio className="size-5" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium">语音房 · 群主开麦中</div>
            <div className="text-[11px] opacity-80">3 人上麦 · 142 人收听</div>
          </div>
          <button onClick={() => setVoiceRoomOpen(false)} className="text-[12px] underline">退出</button>
        </div>
      )}

      {/* composer */}
      <div className="glass border-t border-border px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] flex items-end gap-2">
        <button
          onClick={() => setMode(mode === "voice" ? "text" : "voice")}
          className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep"
        >
          {mode === "voice" ? <Keyboard className="size-5" /> : <Mic className="size-5" />}
        </button>

        {mode === "voice" ? (
          <button
            onMouseDown={() => setRecording(true)}
            onMouseUp={() => { setRecording(false); toast("已发送 · 0:02"); }}
            onTouchStart={() => setRecording(true)}
            onTouchEnd={() => { setRecording(false); toast("已发送 · 0:02"); }}
            className={`flex-1 h-10 rounded-full text-[13px] flex items-center justify-center transition-all select-none ${
              recording ? "bg-primary text-primary-foreground" : "bg-card ring-soft text-armani-deep"
            }`}
          >
            {recording ? "松开发送" : "按住 说话 · 抬起即发"}
          </button>
        ) : (
          <div className="flex-1 flex items-center bg-card rounded-2xl ring-soft px-3 min-h-10">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="说点什么…"
              className="flex-1 bg-transparent text-[14px] placeholder:text-armani focus:outline-none py-2" />
          </div>
        )}

        {mode === "text" && text.trim() ? (
          <button onClick={() => { toast("已发送", { description: text }); setText(""); }} className="size-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Send className="size-5" />
          </button>
        ) : (
          <>
            {isPublic && (
              <button onClick={() => setVoiceRoomOpen(true)} title="开语音房" className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
                <Radio className="size-5" />
              </button>
            )}
            {isPublic && (
              <button onClick={() => toast("发起群规则投票", { description: "已生成投票草稿" })} title="发起投票" className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
                <Vote className="size-5" />
              </button>
            )}
            <button onClick={() => setPlusOpen(true)} className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
              <Plus className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* +号 单聊去掉"建群" */}
      <PlusPanel open={plusOpen} onClose={() => setPlusOpen(false)} exclude={["newgroup"]} />

      <LongPressSheet
        open={!!active}
        onClose={() => setActive(null)}
        title="消息操作"
        subtitle={active ? `类型：${active.kind}` : undefined}
        actions={active ? sheetActions(active) : []}
      />
    </div>
  );
};

export default ChatRoom;
