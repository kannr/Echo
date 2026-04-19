import { NavLink } from "react-router-dom";
import { MessageCircle, Contact, Compass, User } from "lucide-react";

const tabs = [
  { to: "/",          label: "聊天",    icon: MessageCircle },
  { to: "/contacts",  label: "通讯录",  icon: Contact },
  { to: "/discover",  label: "发现",    icon: Compass },
  { to: "/me",        label: "我",      icon: User },
];

const TabBar = () => (
  <nav className="sticky bottom-0 z-30 glass border-t border-border pb-[env(safe-area-inset-bottom)]">
    <ul className="grid grid-cols-4">
      {tabs.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] transition-colors ${
                isActive ? "text-primary" : "text-armani"
              }`
            }
          >
            <Icon className="size-[22px]" strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default TabBar;
