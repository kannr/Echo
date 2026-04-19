import { plusActions } from "@/data/echo";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Hide actions that don't apply to certain rooms (e.g. drop "建群" inside 1-1). */
  exclude?: string[];
}

const PlusPanel = ({ open, onClose, exclude = [] }: Props) => {
  if (!open) return null;
  const items = plusActions.filter((a) => !exclude.includes(a.id));
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/20" />
      <div
        className="relative bg-card rounded-t-3xl border-t border-border p-5 pb-[calc(env(safe-area-inset-bottom)+20px)] animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[15px] font-medium">更多</div>
            <div className="text-[12px] text-armani">可以说："发送一张照片"</div>
          </div>
          <button onClick={onClose} className="size-8 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
            <X className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-y-5">
          {items.map(({ id, label, icon: Icon, hint }) => (
            <button
              key={id}
              onClick={() => { toast(label, { description: hint ?? "已选择 (原型演示)" }); onClose(); }}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span className="size-14 rounded-2xl bg-secondary group-active:scale-95 transition-transform flex items-center justify-center text-armani-deep">
                <Icon className="size-6" strokeWidth={1.7} />
              </span>
              <span className="text-[12px] text-foreground">{label}</span>
              {hint && <span className="text-[10px] text-primary -mt-1">{hint}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlusPanel;
