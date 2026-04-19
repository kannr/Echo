import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: ReactNode;
  right?: ReactNode;
  subtitle?: ReactNode;
  back?: boolean;
}

/** TopBar variant with a back-arrow on the left. */
const SubTopBar = ({ title, right, subtitle, back = true }: Props) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 glass border-b border-border">
      <div className="h-14 px-3 flex items-center gap-2">
        {back ? (
          <button onClick={() => navigate(-1)} className="size-9 rounded-full flex items-center justify-center text-armani-deep">
            <ChevronLeft className="size-6" />
          </button>
        ) : <span className="size-9" />}
        <div className="flex-1 text-[15px] font-medium truncate text-center">{title}</div>
        <div className="min-w-9 flex items-center justify-end gap-2">{right ?? <span className="size-9" />}</div>
      </div>
      {subtitle && <div className="px-4 pb-2 -mt-1">{subtitle}</div>}
    </header>
  );
};

export default SubTopBar;
