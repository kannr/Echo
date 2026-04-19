import { ReactNode } from "react";

interface Props {
  title?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  subtitle?: ReactNode;
}

const TopBar = ({ title, left, right, subtitle }: Props) => {
  return (
    <header className="sticky top-0 z-30 glass border-b border-border">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="min-w-0 flex items-center gap-2 flex-1">{left}</div>
        <div className="text-[15px] font-medium tracking-wide text-foreground truncate">
          {title}
        </div>
        <div className="min-w-0 flex items-center gap-2 flex-1 justify-end">{right}</div>
      </div>
      {subtitle && <div className="px-4 pb-2 -mt-1">{subtitle}</div>}
    </header>
  );
};

export default TopBar;
