import PhoneShell from "@/components/echo/PhoneShell";
import ChatRoom from "./ChatRoom";

// Chat detail uses the phone shell but no bottom tab feels nicer; we still keep tab bar for consistency.
const Page = () => (
  <PhoneShell>
    <ChatRoom />
  </PhoneShell>
);

export default Page;
