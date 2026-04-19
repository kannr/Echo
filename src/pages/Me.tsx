import TopBar from "@/components/echo/TopBar";
import Avatar from "@/components/echo/Avatar";
import { myMoments } from "@/data/echo";
import {
  ChevronRight, QrCode, Languages, Mic2, Shield, LogOut, Settings as SettingsIcon,
  Phone, Video, EyeOff, Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Row = ({ icon: Icon, label, value, onClick }: { icon: any; label: string; value?: string; onClick?: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 active:bg-secondary/60">
    <Icon className="size-[18px] text-armani-deep" />
    <span className="flex-1 text-left text-[14px]">{label}</span>
    {value && <span className="text-[12px] text-armani">{value}</span>}
    <ChevronRight className="size-4 text-armani" />
  </button>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card ring-soft rounded-2xl overflow-hidden divide-y divide-border">{children}</div>
);

const RecordPicker = ({ label, icon: Icon }: { label: string; icon: any }) => {
  const [v, setV] = useState<"cloud" | "24h" | "off">("24h");
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <Icon className="size-[18px] text-armani-deep" />
        <span className="flex-1 text-[14px]">{label}</span>
      </div>
      <div className="mt-2.5 ml-7 inline-flex rounded-full bg-secondary p-1 text-[12px]">
        {([
          { id: "cloud", label: "云端永久" },
          { id: "24h",   label: "24h" },
          { id: "off",   label: "不录制" },
        ] as const).map((o) => (
          <button key={o.id} onClick={() => setV(o.id)}
            className={`px-3 py-1 rounded-full ${v === o.id ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}>
            {o.label}
          </button>
        ))}
      </div>
      {v === "cloud" && <div className="ml-7 mt-1.5 text-[11px] text-armani">已添加：三毛 / 荷西 (示例联系人)</div>}
    </div>
  );
};

const Me = () => {
  const [tDisplay, setTDisplay] = useState<"only" | "both">("both");
  const [hideNearby, setHideNearby] = useState(false);

  return (
    <>
      <TopBar title="我" />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile */}
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-4">
          <Avatar name="三毛" emoji="三" size={64} />
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-medium">三毛</div>
            <div className="text-[12px] text-armani mt-0.5">Echo 号 · echo_sanmao</div>
            <div className="text-[12px] text-armani">母语 · 中文</div>
          </div>
          <button className="size-9 rounded-full bg-secondary flex items-center justify-center text-armani-deep" aria-label="二维码">
            <QrCode className="size-5" />
          </button>
        </div>

        {/* My Moments */}
        <Link to="/moments" className="block">
          <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-accent/40 text-primary flex items-center justify-center"><ImageIcon className="size-5" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">我的展示</div>
              <div className="text-[11px] text-armani">{myMoments.length} 条 · 公开 / 好友 / 标签可见</div>
            </div>
            <ChevronRight className="size-4 text-armani" />
          </div>
        </Link>

        {/* Settings */}
        <div>
          <div className="text-[11px] text-armani px-1 mb-1.5 uppercase tracking-wider">语言与翻译</div>
          <Card>
            <Row icon={Languages} label="母语" value="中文" />
            <Row icon={Languages} label="目标语言" value="阿拉伯语" />
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Languages className="size-[18px] text-armani-deep" />
                <span className="flex-1 text-[14px]">翻译显示</span>
              </div>
              <div className="mt-2.5 ml-7 inline-flex rounded-full bg-secondary p-1 text-[12px]">
                <button onClick={() => setTDisplay("only")} className={`px-3 py-1 rounded-full ${tDisplay === "only" ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}>仅译文</button>
                <button onClick={() => setTDisplay("both")} className={`px-3 py-1 rounded-full ${tDisplay === "both" ? "bg-card ring-soft text-foreground" : "text-armani-deep"}`}>译文 + 原文</button>
              </div>
            </div>
            <Row icon={Mic2} label="语音克隆" value="未开启" />
          </Card>
        </div>

        <div>
          <div className="text-[11px] text-armani px-1 mb-1.5 uppercase tracking-wider">通话录制</div>
          <Card>
            <RecordPicker label="电话录制" icon={Phone} />
            <RecordPicker label="视频录制" icon={Video} />
          </Card>
        </div>

        <div>
          <div className="text-[11px] text-armani px-1 mb-1.5 uppercase tracking-wider">隐私</div>
          <Card>
            <button onClick={() => setHideNearby(!hideNearby)} className="w-full flex items-center gap-3 px-4 py-3">
              <EyeOff className="size-[18px] text-armani-deep" />
              <span className="flex-1 text-left text-[14px]">不出现在附近</span>
              <span className={`w-9 h-5 rounded-full p-0.5 transition ${hideNearby ? "bg-primary" : "bg-secondary"}`}>
                <span className={`block size-4 rounded-full bg-card transition ${hideNearby ? "translate-x-4" : ""}`} />
              </span>
            </button>
            <Row icon={Shield} label="黑名单" value="0" />
            <Row icon={SettingsIcon} label="通用" />
          </Card>
        </div>

        <button className="w-full h-12 rounded-2xl bg-card ring-soft text-destructive text-[14px] flex items-center justify-center gap-2">
          <LogOut className="size-4" /> 登出
        </button>

        <p className="text-center text-[11px] text-armani pt-2 pb-6">Echo · 像三毛一样写信 · 沙漠回声</p>
      </div>
    </>
  );
};

export default Me;
