// Centralized mock data for the Echo prototype.
import type { LucideIcon } from "lucide-react";

export type ChatCategory = "single" | "private" | "agent" | "public" | "channel";

export const chatCategories: { id: ChatCategory; label: string }[] = [
  { id: "single", label: "单聊" },
  { id: "private", label: "私群" },
  { id: "agent", label: "智能体" },
  { id: "public", label: "公群" },
  { id: "channel", label: "频道" },
];

export interface Conversation {
  id: string;
  category: ChatCategory;
  name: string;
  avatar: string;
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

  // agent
  { id: "a1", category: "agent", name: "Sahara · 旅行助手", avatar: "🧭", preview: "想去哪儿？我来安排路线", time: "在线" },
  { id: "a2", category: "agent", name: "翻译官 · 阿拉伯语", avatar: "ع", preview: "随时为你翻译", time: "在线" },
  { id: "a3", category: "agent", name: "笔记精灵", avatar: "📝", preview: "已为你总结 3 段语音", time: "1小时前" },

  // public
  { id: "g1", category: "public", name: "全球数字游民", avatar: "🌍", preview: "话题·里斯本: 有人共享办公吗", time: "11:02", unread: 21 },
  { id: "g2", category: "public", name: "AI Native 产品研究", avatar: "✨", preview: "话题·语音交互: Echo 的设计思考", time: "10:15" },
  { id: "g3", category: "public", name: "撒哈拉摄影", avatar: "📷", preview: "新精华帖 · 红土与月亮", time: "昨天" },

  // channel
  { id: "ch1", category: "channel", name: "Echo 官方", avatar: "E", preview: "v0.3 更新: 翻译电话延迟 -38%", time: "10:00" },
  { id: "ch2", category: "channel", name: "撒哈拉旅行手册", avatar: "🐪", preview: "10条: 避开沙暴的小窍门", time: "昨天" },
  { id: "ch3", category: "channel", name: "Lovable Weekly", avatar: "💡", preview: "本周精选 12 个 AI 项目", time: "周二" },
];

// ---------- Messages ----------
export type MessageKind =
  | "text" | "voice" | "image" | "video" | "link" | "file"
  | "call" | "transCall" | "videoCall" | "transVideoCall"
  | "location" | "contact" | "irl" | "translated" | "system";

export interface Message {
  id: string;
  from: "me" | "them";
  kind: MessageKind;
  text?: string;
  textOriginal?: string;
  textTranslated?: string;
  duration?: number;            // voice seconds
  callDuration?: string;        // "36:58"
  imageUrl?: string;
  videoThumb?: string;
  link?: { title: string; url: string; desc?: string };
  file?: { name: string; size: string; ext: string };
  location?: { name: string; addr: string };
  contact?: { name: string; echo: string };
  irl?: { place: string; when: string; confirmed?: boolean };
  time: string;
}

export const sampleThread: Message[] = [
  { id: "m0", from: "them", kind: "system", text: "已通过好友验证", time: "" },
  { id: "m1", from: "them", kind: "voice", duration: 6, text: "今天的沙丘特别红，像被点燃了", time: "10:30" },
  { id: "m2", from: "me",   kind: "text",  text: "听起来像三毛书里的画面", time: "10:31" },
  { id: "m3", from: "them", kind: "translated", textOriginal: "ya jamil, ta'al hena", textTranslated: "好美，过来看看", time: "10:32" },
  { id: "m4", from: "me",   kind: "voice", duration: 3, text: "马上到", time: "10:33" },
  { id: "m5", from: "them", kind: "image", imageUrl: "dune", time: "10:35" },
  { id: "m6", from: "me",   kind: "video", videoThumb: "camel", time: "10:38" },
  { id: "m7", from: "them", kind: "link",  link: { title: "撒哈拉的故事 · 豆瓣", url: "douban.com/subject/...", desc: "三毛 · 豆瓣 9.2" }, time: "10:40" },
  { id: "m8", from: "me",   kind: "file",  file: { name: "Sahara_route_2025.pdf", size: "2.4 MB", ext: "PDF" }, time: "10:41" },
  { id: "m9", from: "them", kind: "call",  callDuration: "36:58", time: "10:50" },
  { id: "m10", from: "me",  kind: "transCall", callDuration: "12:03", time: "11:02" },
  { id: "m11", from: "them", kind: "videoCall", callDuration: "08:21", time: "11:15" },
  { id: "m12", from: "me",  kind: "transVideoCall", callDuration: "22:40", time: "11:40" },
  { id: "m13", from: "them", kind: "location", location: { name: "Café Clock", addr: "Fes, Morocco" }, time: "11:42" },
  { id: "m14", from: "me",  kind: "contact", contact: { name: "Maya Khalid", echo: "echo_maya" }, time: "11:43" },
  { id: "m15", from: "them", kind: "irl", irl: { place: "Café Clock", when: "明天 18:00" }, time: "11:45" },
];

// ---------- Plus actions ----------
import {
  Image as ImageIcon, FileText, Camera, Phone, Languages,
  Video, Mic, MapPin, Contact, Heart,
} from "lucide-react";

export interface PlusAction {
  id: string;
  label: string;
  icon: LucideIcon;
  hint?: string;
}
export const plusActions: PlusAction[] = [
  { id: "photo",  label: "照片",     icon: ImageIcon, hint: "AI 查找 · 需确认" },
  { id: "file",   label: "文件",     icon: FileText },
  { id: "shoot",  label: "拍摄",     icon: Camera },
  { id: "call",   label: "电话",     icon: Phone },
  { id: "tcall",  label: "翻译电话", icon: Languages,  hint: "实时" },
  { id: "video",  label: "视频",     icon: Video },
  { id: "tvideo", label: "翻译视频", icon: Languages,  hint: "实时" },
  { id: "voice",  label: "语音",     icon: Mic },
  { id: "loc",    label: "位置",     icon: MapPin },
  { id: "card",   label: "名片",     icon: Contact },
  { id: "irl",    label: "面基邀请", icon: Heart,      hint: "GPS 重合" },
];

// ---------- Contacts ----------
export interface Friend {
  id: string;
  name: string;
  letter: string;
  tags: string[];
  nickname?: string;
  remark?: string;
  phone?: string;
  email?: string;
  language?: string;
  closeness?: number;   // 0-100
  fit?: number;         // 0-100
  graph?: Record<string, string[]>; // 标签图谱
}

export const friends: Friend[] = [
  { id: "f1", name: "三毛", letter: "S", tags: ["挚友", "撒哈拉"],
    nickname: "Echo", remark: "撒哈拉同行", phone: "+34 600 000 001", email: "sanmao@echo.app", language: "中文",
    closeness: 92, fit: 88,
    graph: {
      "能力": ["写作", "摄影"], "状态": ["旅居"], "特点": ["敏感", "浪漫"], "兴趣": ["沙漠", "天文"],
      "信任": ["挚友"], "学历": ["文化大学"], "出生": ["重庆"], "朋友": ["荷西"], "三观": ["自由主义"],
    } },
  { id: "f2", name: "荷西", letter: "H", tags: ["挚友"], language: "西班牙语", closeness: 95, fit: 90,
    graph: { "职业": ["潜水员"], "国籍": ["西班牙"], "恋人": ["三毛"] } },
  { id: "f3", name: "陈屿", letter: "C", tags: ["同事"], language: "中文", closeness: 60, fit: 55 },
  { id: "f4", name: "Lina", letter: "L", tags: ["语言交换"], language: "阿拉伯语", closeness: 40, fit: 70 },
  { id: "f5", name: "Maya", letter: "M", tags: ["旅伴"], language: "英语", closeness: 55, fit: 72 },
  { id: "f6", name: "Adel", letter: "A", tags: [], language: "阿拉伯语", closeness: 30, fit: 50 },
  { id: "f7", name: "苏阳", letter: "S", tags: ["同事"], language: "中文", closeness: 50, fit: 48 },
];

export const allFriendTags = ["挚友", "撒哈拉", "同事", "语言交换", "旅伴"];

export const friendRequests = [
  { id: "r1", name: "Omar", intro: "在马拉喀什认识，希望加你的 Echo", time: "刚刚" },
  { id: "r2", name: "林晚", intro: "我也喜欢三毛，常驻里斯本",        time: "1小时前" },
];

// ---------- Discover ----------
export const discoverPublicGroups = [
  { id: "g1",  name: "全球数字游民",   members: 12480, topics: 6, desc: "公共建设 · 投票治理 · 收益按贡献分配", rule: "1. 真名/昵称需稳定 2. 禁广告 3. 重大决策投票 ≥60% 通过" },
  { id: "g2",  name: "AI Native 产品", members: 5320,  topics: 4, desc: "话题制 · 投票治理", rule: "原则上不删帖；广告需投票" },
  { id: "g3",  name: "撒哈拉摄影",     members: 8210,  topics: 5, desc: "原片为主 · 精华周更", rule: "禁 AI 生成图未标注" },
];
export const discoverChannels = [
  { id: "ch1", name: "Echo 官方",       subs: 92010, by: "Echo Team", desc: "官方更新 · 设计思考 · 路线图" },
  { id: "ch2", name: "撒哈拉旅行手册",  subs: 12010, by: "Sahara Co.", desc: "签证 · 路线 · 装备" },
  { id: "ch3", name: "Lovable Weekly",  subs: 6320,  by: "Lovable",    desc: "AI 项目周报" },
];
export const discoverAgents = [
  { id: "da1", name: "Sahara · 旅行助手", skill: "路线 · 签证 · 当地文化", desc: "面向北非的旅行规划智能体，支持多步对话与邮件导出。" },
  { id: "da2", name: "翻译官 · 阿拉伯语", skill: "实时口译 · 礼仪提示",   desc: "支持 12 国阿语方言切换。" },
  { id: "da3", name: "笔记精灵",          skill: "语音转写 · 摘要 · 待办", desc: "把语音/会议转成结构化笔记。" },
];
export const discoverDialects = [
  { id: "dd1", name: "粤语 · 广府",       size: "84MB",  users: "120k", heat: 92 },
  { id: "dd2", name: "闽南语 · 厦门",     size: "76MB",  users: "58k",  heat: 71 },
  { id: "dd3", name: "阿拉伯语 · 摩洛哥", size: "112MB", users: "32k",  heat: 88 },
  { id: "dd4", name: "西班牙语 · 加泰",   size: "68MB",  users: "21k",  heat: 64 },
];

export interface NearbyPerson {
  id: string;
  name: string;
  distanceM: number;
  status: string;
  fit: number;
  language?: string;
}
export const nearbyPeople: NearbyPerson[] = [
  { id: "n1", name: "阿德", distanceM: 82,   status: "在咖啡馆", fit: 78, language: "阿拉伯语" },
  { id: "n2", name: "Yui",  distanceM: 210,  status: "找人玩狼人杀", fit: 64, language: "日语" },
  { id: "n3", name: "苏阳", distanceM: 1200, status: "刚发了一条动态", fit: 71, language: "中文" },
  { id: "n4", name: "Noor", distanceM: 350,  status: "在沙丘日落点", fit: 86, language: "阿拉伯语" },
];

export const nearbyRooms = [
  { id: "rm1", title: "狼人杀 · 6/9", host: "Yui",  tag: "🎲", nearestPersonM: 210 },
  { id: "rm2", title: "你画我猜",     host: "Maya", tag: "🎨", nearestPersonM: 540 },
];

export const nearbyPublicGroups = [
  { id: "ng1", name: "撒哈拉徒步今晚集合", members: 32, distanceM: 120 },
  { id: "ng2", name: "Fes 老城寻味",      members: 88, distanceM: 480 },
];

// ---------- Public group details ----------
export const publicTopics = [
  { id: "t-default", name: "默认" },
  { id: "t-lisbon",  name: "里斯本" },
  { id: "t-bcn",     name: "巴塞罗那" },
  { id: "t-berlin",  name: "柏林" },
];

export const publicHighlights = [
  { id: "h1", topic: "t-lisbon", author: "阿德", title: "里斯本 · 共享办公地图 v3", kind: "图文", time: "昨天" },
  { id: "h2", topic: "t-bcn",    author: "Maya", title: "巴塞罗那签证经验分享",     kind: "视频", time: "周一" },
  { id: "h3", topic: "t-berlin", author: "Lina", title: "柏林 · 数字游民税务",       kind: "语音", time: "上周" },
  { id: "h4", topic: "t-default", author: "三毛", title: "群规 v0.4 修订说明",       kind: "图文", time: "本月" },
];

export const publicMembers = [
  { id: "u1", name: "三毛", role: "群主" },
  { id: "u2", name: "阿德", role: "管理员" },
  { id: "u3", name: "Maya", role: "成员" },
  { id: "u4", name: "Lina", role: "成员" },
  { id: "u5", name: "苏阳", role: "成员" },
];

export const publicReports = [
  { id: "rp1", date: "2025-04-18", title: "AI 总结 · 里斯本话题", summary: "本日 142 条消息 · 3 个共识：①周三共享办公 ②签证攻略需更新 ③有人组织 Sintra 周末游。" },
  { id: "rp2", date: "2025-04-17", title: "AI 总结 · 默认话题",   summary: "群规修订投票通过 (78%)，将于本周生效。" },
];

// ---------- Moments / Stories ----------
export interface Moment {
  id: string;
  author: string;
  authorId?: string;
  text: string;
  time: string;
  visibility: "public" | "friends" | "tag";
  tag?: string;
  imageHint?: string;
}
export const myMoments: Moment[] = [
  { id: "mm1", author: "三毛", text: "撒哈拉的星空，像被打翻的盐罐。", time: "1h", visibility: "public", imageHint: "stars" },
  { id: "mm2", author: "三毛", text: "今天和荷西去看沙丘日落。",       time: "昨天", visibility: "friends" },
  { id: "mm3", author: "三毛", text: "新写了一段游记，挚友可见。",     time: "周二", visibility: "tag", tag: "挚友" },
];

// ---------- Channel posts ----------
export const channelPosts = [
  { id: "cp1", title: "Echo v0.3 · 翻译电话延迟降低 38%", excerpt: "我们重写了语音通道，延迟从 920ms 降至 570ms。", time: "10:00" },
  { id: "cp2", title: "设计思考：为什么 Echo 不要群二维码", excerpt: "私密性优先，私群只能从通讯录拉人。", time: "昨天" },
];

// ---------- Agent run sample ----------
export const agentRunSample = [
  { role: "agent", text: "你好！我是 Sahara 旅行助手。告诉我目的地、出行时间、人数，我来出方案。" },
  { role: "user",  text: "5 月底，2 人，摩洛哥 7 天，预算中等" },
  { role: "agent", text: "好的。我先确认 3 件事：①是否进沙漠 ②是否含费斯老城 ③是否需要中文向导？" },
  { role: "user",  text: "①是 ②是 ③不用" },
  { role: "agent", text: "已生成方案。要把详细行程发到邮箱，还是存到云端？" },
];
