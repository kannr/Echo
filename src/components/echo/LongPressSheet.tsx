import { ReactNode } from "react";
import { X } from "lucide-react";

export interface SheetAction {
  id: string;
  label: string;
  hint?: string;
  icon?: ReactNode;
  destructive?: boolean;
  onClick?: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  actions: SheetAction[];
  children?: ReactNode;
}

const LongPressSheet = ({ open, onClose, title, subtitle, actions, children }: Props) => {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative bg-card rounded-t-3xl border-t border-border p-4 pb-[calc(env(safe-area-inset-bottom)+16px)] animate-in slide-in-from-bottom-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            {title && <div className="text-[15px] font-medium">{title}</div>}
            {subtitle && <div className="text-[12px] text-armani mt-0.5">{subtitle}</div>}
          </div>
          <button onClick={onClose} className="size-8 rounded-full bg-secondary flex items-center justify-center text-armani-deep">
            <X className="size-4" />
          </button>
        </div>
        {children}
        <div className="space-y-1.5">
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={() => { a.onClick?.(); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl bg-secondary/70 active:bg-secondary text-left ${a.destructive ? "text-destructive" : "text-armani-deep"}`}
            >
              {a.icon && <span className="size-8 rounded-xl bg-card flex items-center justify-center">{a.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className="text-[14px]">{a.label}</div>
                {a.hint && <div className="text-[11px] text-armani mt-0.5">{a.hint}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPressSheet;
