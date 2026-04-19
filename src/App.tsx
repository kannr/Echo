import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PhoneShell from "@/components/echo/PhoneShell";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactsPage from "./pages/ContactsPage";
import DiscoverPage from "./pages/DiscoverPage";
import MePage from "./pages/MePage";
import ChatRoomPage from "./pages/ChatRoomPage";

import NewGroup from "./pages/NewGroup";
import FaceToFace from "./pages/FaceToFace";
import AddFriend from "./pages/AddFriend";
import Scan from "./pages/Scan";
import FriendDetail from "./pages/FriendDetail";
import PublicGroupDetail from "./pages/PublicGroupDetail";
import ChannelDetail from "./pages/ChannelDetail";
import AgentDetail from "./pages/AgentDetail";
import NearbyProfile from "./pages/NearbyProfile";
import Match from "./pages/Match";
import Moments from "./pages/Moments";

const queryClient = new QueryClient();

/** Sub-pages don't show the bottom Tab bar — wrap with this. */
const SubShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen w-full flex items-stretch justify-center bg-secondary/60">
    <div className="w-full max-w-[440px] flex flex-col bg-background shadow-[0_0_0_1px_hsl(var(--border)),0_30px_60px_-30px_hsl(25_30%_25%/0.25)] min-h-screen relative overflow-hidden">
      {children}
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/chat/:id" element={<ChatRoomPage />} />

          <Route path="/new-group"        element={<SubShell><NewGroup /></SubShell>} />
          <Route path="/face-to-face"     element={<SubShell><FaceToFace /></SubShell>} />
          <Route path="/add-friend"       element={<SubShell><AddFriend /></SubShell>} />
          <Route path="/scan"             element={<SubShell><Scan /></SubShell>} />
          <Route path="/friend/:id"       element={<SubShell><FriendDetail /></SubShell>} />
          <Route path="/public-group/:id" element={<SubShell><PublicGroupDetail /></SubShell>} />
          <Route path="/channel/:id"      element={<SubShell><ChannelDetail /></SubShell>} />
          <Route path="/agent/:id"        element={<SubShell><AgentDetail /></SubShell>} />
          <Route path="/nearby/:id"       element={<SubShell><NearbyProfile /></SubShell>} />
          <Route path="/match"            element={<SubShell><Match /></SubShell>} />
          <Route path="/moments"          element={<SubShell><Moments /></SubShell>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
