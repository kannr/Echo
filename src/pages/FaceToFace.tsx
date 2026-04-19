import SubTopBar from "@/components/echo/SubTopBar";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FaceToFace = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col">
      <SubTopBar title="面对面建群" />
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="size-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          <MapPin className="size-9" />
        </div>
        <div className="text-[15px] font-medium">输入相同的 2 位数字</div>
        <div className="text-[12px] text-armani mt-1">100m 范围内自动加入同一个群</div>

        <input
          inputMode="numeric"
          maxLength={2}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 2))}
          placeholder="00"
          className="mt-8 w-32 h-20 text-center text-4xl tracking-[1em] rounded-2xl bg-card ring-soft focus:outline-none"
        />

        <div className="mt-6 text-[12px] text-armani">附近正在等待：3 人</div>

        <button
          disabled={code.length !== 2}
          onClick={() => { toast("正在校验 GPS", { description: "100m 内的人将共同入群" }); setTimeout(() => navigate("/"), 700); }}
          className={`mt-6 w-full h-11 rounded-2xl text-[14px] ${code.length !== 2 ? "bg-secondary text-armani" : "bg-primary text-primary-foreground"}`}
        >
          入群 · 校验 GPS
        </button>
      </div>
    </div>
  );
};

export default FaceToFace;
