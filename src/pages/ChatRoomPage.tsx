import ChatRoom from "./ChatRoom";

const Page = () => (
  <div className="h-[100dvh] w-full flex items-stretch justify-center bg-secondary/60 overflow-hidden">
    <div className="w-full max-w-[440px] flex flex-col bg-background shadow-[0_0_0_1px_hsl(var(--border)),0_30px_60px_-30px_hsl(25_30%_25%/0.25)] h-[100dvh]">
      <ChatRoom />
    </div>
  </div>
);

export default Page;
