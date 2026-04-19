// Centralized mock data for the Echo prototype.
import type { LucideIcon } from "lucide-react";

export type ChatCategory = "single" | "private" | "public" | "channel" | "agent";

export const chatCategories: { id: ChatCategory; label: string }[] = [
  { id: "single", label: "单聊" },
  { id: "private", label: "私群" },
  { id: "public", label: "公群" },
  { id: "channel", label: "频道" },
  { id: "agent", label: "智能体" },
];

export interface Conversation {
  id: string;
  category: ChatCategory;
  name: string;
  avatar: string; // emoji or initial
  preview: string;
  time: string;
  unread?: number;
  muted?: boolean;
  pinned?: boolean;
  isVoice?: boolean;
}

export const conversations: Conversation[] = [
  // single
  { id: "c1", category: "single", name: "三毛", avatar: "三", preview: "撒哈拉的星空真的很美", time: "刚刚", unread: 2, isVoice: true, pinned: true },
  { id: "c2", category: "single", name: "荷西", avatar: "荷", preview: "[语音] 0:14", time: "10:42", unread: 1, isVoice: true },
  { id: "c3", category: "single", name: "Maya Khalid", avatar: "M", preview: "Tomorrow in Marrakech?", time: "昨天" },
  { id: "c4", category: "single", name: "陈屿", avatar: "陈", preview: "照片已发送", time: "昨天" },
  { id: "c5", category: "single", name: "Lina", avatar: "L", preview: "翻译电话已结束 12:03", time: "周一" },

  // private
  { id: "p1", category: "private", name: "沙漠出行 · 6", avatar: "🏜", preview: "阿德: 明早7点集合", time: "09:21", unread: 5 },
  { id: "p2", category: "private", name: "家人", avatar: "🌿", preview: "妈: 多穿点", time: "昨天", muted: true },
  { id: "p3", category: "private", name: "读书会", avatar: "📖", preview: "今晚8点话题：撒哈拉故事", time: "周日" },

  // public
  { id: "g1", category: "public", name: "全球数字游民", avatar: "🌍", preview: "话题·里斯本: 有人共享办公吗", time: "11:02", unread: 21 },
  { id: "g2", category: "public", name: "AI Native 产品研究", avatar: "✨", preview: "话题·语音交互: Echo 的设计思考", time: "10:15" },
  { id: "g3", category: "public", name: "撒哈拉摄影", avatar: "📷", preview: "新精华帖 · 红土与月亮", time: "昨天" },

  // channel
  { id: "ch1", category: "channel", name: "Echo 官方", avatar: "E", preview: "v0.3 更新: 翻译电话延迟 -38%", time: "10:00" },
  { id: "ch2", category: "channel", name: "撒哈拉旅行手册", avatar: "🐪", preview: "10条: 避开沙暴的小窍门", time: "昨天" },
  { id: "ch3", category: "channel", name: "Lovable Weekly", avatar: "💡", preview: "本周精选 12 个 AI 项目", time: "周二" },

  // agent
  { id: "a1", category: "agent", name: "Sahara · 旅行助手", avatar: "🧭", preview: "想去哪儿？我来安排路线", time: "在线" },
  { id: "a2", category: "agent", name: "翻译官 · 阿拉伯语", avatar: "ع", preview: "随时为你翻译", time: "在线" },
  { id: "a3", category: "agent", name: "笔记精灵", avatar: "📝", preview: "已为你总结 3 段语音", time: "1小时前" },
];

export interface Message {
  id: string;
  from: "me" | "them";
  kind: "text" | "voice" | "image" | "system" | "translated";
  text?: string;
  textOriginal?: string;
  textTranslated?: string;
  duration?: number; // for voice
  imageUrl?: string;
  time: string;
}

export const sampleThread: Message[] = [
  { id: "m0", from: "them", kind: "system", text: "已通过好友验证", time: "" },
  { id: "m1", from: "them", kind: "voice", duration: 6, text: "今天的沙丘特别红，像被点燃了", time: "10:30" },
  { id: "m2", from: "me", kind: "text", text: "听起来像三毛书里的画面", time: "10:31" },
  { id: "m3", from: "them", kind: "translated", textOriginal: "ya jamil, ta'al hena", textTranslated: "好美，过来看看", time: "10:32" },
  { id: "m4", from: "me", kind: "voice", duration: 3, text: "马上到", time: "10:33" },
  { id: "m5", from: "them", kind: "image", imageUrl: "dune", time: "10:35" },
];

// Plus-button actions
import {
  Image as ImageIcon, FileText, Camera, Phone, Languages,
  Video, Mic, MapPin, Contact, Users2, Heart,
} from "lucide-react";

export interface PlusAction {
  id: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
}
export const plusActions: PlusAction[] = [
  { id: "photo",       label: "照片",     icon: ImageIcon, hint: "AI 查找 · 需确认" },
  { id: "file",        label: "文件",     icon: FileText },
  { id: "shoot",       label: "拍摄",     icon: Camera },
  { id: "call",        label: "电话",     icon: Phone },
  { id: "tcall",       label: "翻译电话", icon: Languages,  hint: "实时" },
  { id: "video",       label: "视频",     icon: Video },
  { id: "tvideo",      label: "翻译视频", icon: Languages,  hint: "实时" },
  { id: "voice",       label: "语音",     icon: Mic },
  { id: "loc",         label: "位置",     icon: MapPin },
  { id: "card",        label: "名片",     icon: Contact },
  { id: "irl",         label: "面基邀请", icon: Heart,      hint: "GPS 重合" },
  { id: "newgroup",    label: "建群",     icon: Users2 },
];

// Contacts
export const friends = [
  { id: "f1", name: "三毛",      letter: "S", tags: ["挚友", "撒哈拉"] },
  { id: "f2", name: "荷西",      letter: "H", tags: ["挚友"] },
  { id: "f3", name: "陈屿",      letter: "C", tags: ["同事"] },
  { id: "f4", name: "Lina",      letter: "L", tags: ["语言交换"] },
  { id: "f5", name: "Maya",      letter: "M", tags: ["旅伴"] },
  { id: "f6", name: "Adel",      letter: "A", tags: [] },
  { id: "f7", name: "苏阳",      letter: "S", tags: ["同事"] },
];

export const friendRequests = [
  { id: "r1", name: "Omar",  intro: "在马拉喀什认识，希望加你的 Echo", time: "刚刚" },
  { id: "r2", name: "林晚",  intro: "我也喜欢三毛，常驻里斯本",        time: "1小时前" },
];

// Discover
export const discoverPublicGroups = [
  { id: "dg1", name: "撒哈拉摄影",       members: 12480, topics: 6, desc: "公共资产 · 收益按贡献分配" },
  { id: "dg2", name: "数字游民 EU",      members: 8210,  topics: 4, desc: "里斯本 · 巴塞罗那 · 柏林" },
  { id: "dg3", name: "AI Native 产品",   members: 5320,  topics: 3, desc: "话题制 · 投票治理" },
];
export const discoverChannels = [
  { id: "dc1", name: "Echo 官方",        subs: 92010, by: "Echo Team" },
  { id: "dc2", name: "撒哈拉旅行手册",   subs: 12010, by: "Sahara Co." },
  { id: "dc3", name: "Lovable Weekly",   subs: 6320,  by: "Lovable" },
];
export const discoverAgents = [
  { id: "da1", name: "Sahara · 旅行助手",  skill: "路线 · 签证 · 当地文化" },
  { id: "da2", name: "翻译官 · 阿拉伯语",  skill: "实时口译 · 礼仪提示" },
  { id: "da3", name: "笔记精灵",            skill: "语音转写 · 摘要 · 待办" },
];
export const discoverDialects = [
  { id: "dd1", name: "粤语 · 广府",      size: "84MB" },
  { id: "dd2", name: "闽南语 · 厦门",    size: "76MB" },
  { id: "dd3", name: "阿拉伯语 · 摩洛哥", size: "112MB" },
  { id: "dd4", name: "西班牙语 · 加泰",   size: "68MB" },
];
export const discoverNearby = [
  { id: "n1", name: "阿德", distance: "82m",  status: "在咖啡馆" },
  { id: "n2", name: "Yui",  distance: "210m", status: "找人玩狼人杀" },
  { id: "n3", name: "苏阳", distance: "1.2km", status: "刚发了一条动态" },
];
export const nearbyRooms = [
  { id: "rm1", title: "狼人杀 · 6/9", host: "Yui",  tag: "🎲" },
  { id: "rm2", title: "你画我猜",     host: "Maya", tag: "🎨" },
];
