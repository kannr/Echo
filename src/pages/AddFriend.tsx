import SubTopBar from "@/components/echo/SubTopBar";
import Avatar from "@/components/echo/Avatar";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddFriend = () => {
  const [q, setQ] = useState("");
  return (
    <div className="flex-1 flex flex-col">
      <SubTopBar
        title="添加好友"
        subtitle={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-armani" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="输入 Echo 号 / 手机号"
              className="w-full h-10 pl-9 rounded-xl bg-secondary text-[13px] placeholder:text-armani focus:outline-none"
            />
          </div>
        }
      />
      <div className="flex-1 overflow-y-auto p-4">
        {q.length === 0 ? (
          <div className="text-center text-[12px] text-armani mt-12">
            通过 Echo 号搜索，找到后可发送好友申请<br />申请时可附带一段自我介绍
          </div>
        ) : (
          <div className="bg-card ring-soft rounded-2xl p-3.5 flex items-center gap-3">
            <Avatar name={q} size={48} />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">用户 · {q}</div>
              <div className="text-[11px] text-armani">Echo 号 · echo_{q}</div>
            </div>
            <button onClick={() => toast("已发送好友申请", { description: "可附带自我介绍" })} className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-[12px]">添加</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
