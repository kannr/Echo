import SubTopBar from "@/components/echo/SubTopBar";
import Avatar from "@/components/echo/Avatar";
import { friends } from "@/data/echo";
import { useNavigate, useParams } from "react-router-dom";
import { Phone, Mail, Languages, MessageCircle, Trash2, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
    <Icon className="size-4 text-armani-deep" />
    <span className="text-[12px] text-armani w-16">{label}</span>
    <span className="text-[13px] flex-1 text-right">{value || "—"}</span>
  </div>
);

const FriendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const f = friends.find((x) => x.id === id) ?? friends[0];

  const onDelete = () => {
    if (confirm("删除好友会清除双方所有聊天记录、文件、通话等所有内容，且不可恢复。确认删除？")) {
      toast("已删除好友", { description: "所有数据已清除" });
      navigate("/contacts");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-secondary/40 overflow-y-auto">
      <SubTopBar title="好友资料" />
      <div className="p-4 space-y-3">
        <div className="bg-card ring-soft rounded-2xl p-4 flex items-center gap-3">
          <Avatar name={f.name} size={64} />
          <div className="flex-1 min-w-0">
            <div className="text-[16px] font-medium">{f.name}</div>
            <div className="text-[12px] text-armani">{f.nickname && `昵称 · ${f.nickname}`}{f.remark ? ` · 备注 ${f.remark}` : ""}</div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {f.tags.map((t) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent/40 text-primary">{t}</span>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card ring-soft rounded-2xl p-3 text-center">
            <div className="text-[11px] text-armani flex items-center justify-center gap-1"><Heart className="size-3 text-primary" /> 亲密度</div>
            <div className="text-[20px] font-medium text-primary mt-1">{f.closeness ?? "—"}</div>
          </div>
          <div className="bg-card ring-soft rounded-2xl p-3 text-center">
            <div className="text-[11px] text-armani flex items-center justify-center gap-1"><Sparkles className="size-3 text-primary" /> 契合度</div>
            <div className="text-[20px] font-medium text-primary mt-1">{f.fit ?? "—"}</div>
          </div>
        </div>

        <div className="bg-card ring-soft rounded-2xl overflow-hidden">
          <InfoRow icon={Phone}     label="电话"   value={f.phone} />
          <InfoRow icon={Mail}      label="邮箱"   value={f.email} />
          <InfoRow icon={Languages} label="母语"   value={f.language} />
        </div>

        {f.graph && Object.keys(f.graph).length > 0 && (
          <div className="bg-card ring-soft rounded-2xl p-3.5">
            <div className="text-[12px] text-armani mb-2">标签图谱</div>
            <div className="space-y-2">
              {Object.entries(f.graph).map(([k, vs]) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="text-[11px] text-armani w-12 shrink-0 mt-1">{k}</span>
                  <div className="flex flex-wrap gap-1">
                    {vs.map((v) => (
                      <span key={v} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-armani-deep">{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              {["能力","状态","特点","社会","兴趣","交集","信任","阶层","学历","荣誉","公司","出生","资产","同事","同学","朋友","家人","恋人","书籍","情感","ego","三观","性格","常用地理"].map((s) => (
                <button key={s} className="text-[10px] py-1 rounded-md bg-secondary text-armani-deep">+ {s}</button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(`/chat/c1`)}
          className="w-full h-11 rounded-2xl bg-primary text-primary-foreground text-[14px] flex items-center justify-center gap-2"
        ><MessageCircle className="size-4" /> 发消息</button>

        <button onClick={onDelete}
          className="w-full h-11 rounded-2xl bg-card ring-soft text-destructive text-[14px] flex items-center justify-center gap-2">
          <Trash2 className="size-4" /> 删除好友 (清除所有记录)
        </button>
      </div>
    </div>
  );
};

export default FriendDetail;
