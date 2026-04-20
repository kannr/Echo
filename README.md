# Echo - AI Native Messaging

[English] | [简体中文](./README_zh.md)

**Echo** is an AI-native instant messaging tool designed to create a globalized natural communication experience. Its core philosophy is "Nature"—letting everything follow the laws of nature, where communication occurs in the most natural human way, focusing on the communication itself while iterating on real needs before, during, and after the interaction. The name Echo is inspired by the English name of the writer San Mao, who was a very natural soul. The visual identity adopts **Sahara Desert tones**, symbolizing the search for and transmission of love across vast landscapes, helping users understand themselves, find people they love, and do the things they love together.

---

## I. Chat

Echo provides dual modes: **Voice Control** and **Manual Input**. The Voice Control mode is activated by calling out "Echo," suitable for exercise, driving, bathing, and specific groups (the elderly, the blind, and children); Manual Input mode adopts and optimizes existing interaction habits. The primary challenge lies in the accurate recognition of different languages and dialects. In the early stages, a "confirmation of understanding" will be performed, with real-time adjustments if the interpretation is incorrect. Once accuracy improves, actions will be executed directly without confirmation. Manual Input exists primarily to accommodate current habits; although not the most natural way, it will persist for a long time due to established behaviors. We do not need to break habits, but rather embrace them while providing a superior interaction alternative.

### 1.1 Core Interaction Features

On the main interface for Private Chats/Group Chats/Channels/Agents, clicking the "+" button enables the following:

  - **Send Photo**: AI searches for and selects photos based on voice commands; requires manual confirmation before sending.
  - **Send File**: Supports any file transfer; supports opening PDF, TXT, ZIP, Office, EPUB, Keynote, Numbers, Pages, etc.
  - **Camera**: Take and send a video or photo.
  - **Call**: Make a VoIP voice call.
  - **Video**: Make a video call.
  - **Translated Call**: Real-time translated voice calls with less than 200ms latency.
  - **Translated Video**: Real-time translated video calls where the audio is automatically translated.
  - **Voice**: Hold to send a voice message.
  - **Location**: Send locations from Amap/Google/Apple Maps.
  - **Meetup Invitation**: For first-time meetings between strangers.
      - Once met, click to confirm. This requires the real-time GPS of both parties (or group members) to overlap for confirmation.
      - After confirmation, an "Implicit Evaluation" can be performed (a few multiple-choice questions + text description). Scores are invisible and recorded only by the system, slightly affecting the person's ecological reputation and strongly influencing mutual affinity metrics.

### 1.2 Message Display Formats

Within Private Chats/Group Chats/Channels/Agents, demo messages for each type are displayed as follows:

  - **Photo Message**: A photo placeholder. Long-press to extract text, translate, and view the original versus comparison side-by-side or top-to-bottom.
  - **Video Message**: Similar to photos but with a play button. Supports automatic translation subtitles for both source and native languages.
  - **Link Message**: Two ways to open: Translated view or Direct view.
  - **File Message**: Supports PDF, TXT, ZIP, Office, EPUB, Keynote, Numbers, Pages, etc. Long-press to translate; translated versions are stored in the cloud and can be sent to others.
  - **Call Message**: Displays duration (e.g., 12:12) + call icon. Long-press after the call for an AI summary report. The caller can initiate recording; the receiver can answer directly (reject recording) or confirm and record.
  - **Translated Call Message**: Duration (e.g., 12:12) + translated call icon. Long-press after the call for an AI summary report. Supports recording permissions as above.
  - **Video Message**: Duration (e.g., 12:12) + video icon. Long-press after the call for an AI summary report. Supports recording permissions as above.
  - **Translated Video Message**: Duration (e.g., 12:12) + translated video icon. Long-press after the call for an AI summary report. Supports recording permissions as above.
  - **Voice Message**: Displays Voice or Voice + Text. Long-press to view the original message or show original text + translated text.
  - **Location Message**: Sends a location.
  - **Contact Card**: Sends a contact. Nickname + Echo ID.
  - **Meetup Invitation Message**: Includes a confirmation button. Clicking it triggers a GPS verification. After confirmation, evaluations can be submitted (invisible to the user, impacting system reputation).

### 1.3 Private Groups

One topic by default; multiple topics can be created.

### 1.4 Top-Right "+" Menu in Chat

  - **Start Group Chat**: Jump to contacts, select members, and create a group. The name is composed of nicknames (within 30 characters).
  - **Face-to-Face Group**: Enter a 2-digit number to join. System verifies that the GPS of the applicant is within 100 meters.
  - **Add Friend**: Enter the search page, input an Echo ID, and become friends upon approval.
  - **Scan**: Pop up the QR code scanner to add friends.

### 1.5 Agents

Agents subscribed to via the "Discover" tab.

  - **Official Agents**: Pay for official resources, talent, etc.
  - **Avatar Agent**: The user's personal agent used to manage other agents.
  - **Subscription Agents**: Agents subscribed to from the Discover tab.
  - **Interaction Logic**: Agent automatically generates multiple-choice questions for confirmation; once clarified, tasks are executed. Results are interacted with for secondary corrections if they don't meet expectations.
  - **Output**: Final products can be sent to email or stored in the cloud.

### 1.6 Public Groups

Communities joined via the "Discover" tab.

  - **Upgrade Rule**: Automatically upgrades to a "Topic Group" once members exceed 500 and heat reaches a certain level. Members can switch topics to chat.
  - **Rule Updates**: Updates trigger automatic voting. Votes are weighted by contribution rather than being equal. Approved terms take effect.
  - **More Sections**: The "three dots" menu reveals four columns: Members, Featured Posts, Rules, and AI Summary Reports. Featured posts and AI reports are categorized by topic. A "+" button allows for creating multimedia posts.
  - **Voice Rooms**: Owners can start voice rooms with a limited number of speakers on stage; others listen. Members can apply to speak, approved by admins.

### 1.7 Channels

Channels subscribed to via the "Discover" tab.

  - **Perspective Difference**: Appears as a private chat for fans, but as a group with infinite topics for the owner. Supports AI automated replies and agent training.
  - **Permission Limits**: Only the channel owner can initiate calls or videos.

### 1.8 Input Method

  - **Voice First**: Defaults to voice; sent directly. Manual text mode is also available. Remembers the last used mode. Supports dialect plugins (users can create and publish their own).
  - **Voice Display**: Text Mode / Voice Mode / Voice + Text Mode.

### 1.9 Sort Order

Private Chat, Private Group, Agent, Public Group, Channel.

---

## II. Contacts

### 2.1 Friend Requests

  - **Private Chat**: 1v1 chat; introductions can be included during the request.
  - **Private Group**: Created via contacts or invites; QR codes or group IDs are not supported for propagation.
  - **Quota Rules**: Cumulative total quota of 30 per day for outgoing requests (Card, Contact, Search, Scan, Private Group). Receiving quota is 50 per day total.

### 2.2 Contact List

  - **Friends Tab**: Label Graph | Alphabetical. Filter by letters or labels. View details like Nickname, Name, Remarks, Phone, Email, Native Language, and custom Label Graphs (capabilities, status, traits, interests, trust, company, assets, school, personality, etc.), Affinity, and Compatibility. A delete button removes all chat history for both parties.
  - **Private Group Tab**: One topic by default; multiple topics can be created.
  - **Request Tab**: List of friend requests.

---

## III. Discover

### 3.1 Nearby

5 columns: People, Moments, Game Rooms, Local Public Groups, Local Channels.

  - **People**: Sorted by Comprehensive, Distance, or Compatibility. One outgoing request per day; five receiving spots. View their moments.
  - **Moments**: Displays nearby dynamic posts.
  - **Game Rooms**: Create exclusive groups for players after a game. Displays the distance of the nearest player to facilitate meetups.
  - **Local Public Groups**: Nearby public groups focused on offline meetings.
  - **Local Channels**: Nearby channels focused on local merchant advertisements.

### 3.2 Public Groups

Built by the public; rules are decided by voting. These are public assets with revenue shared based on contribution (Owner, Admin, Creators, Consumers, Platform).

  - **Topics**: One default topic; multiple can be created to switch between.
  - **AI Summary Report**: Daily summaries of chat highlights posted under topics, reviewed by admins.
  - **Details & Joining**: View rules and 10 featured posts before applying to join.
  - **Blacklist**: Groups can block people, and people can block groups to stop recommendations.
  - **Entering**: Automatically remembers the last selected topic.

### 3.3 Channels

100% production by the creator (merchants); users act as customers.

  - View intro and subscribe. Supports mutual blacklisting.

### 3.4 Agents: Skills

  - View intro and subscribe. Users can publish agents and earn revenue based on token consumption.

### 3.5 Language Packs: Dialect LoRA

  - Displays user count and heat/popularity.

### 3.6 Sort Order

Nearby, Public Group, Channel, Agent, Language Pack.

---

## IV. Me

### 4.1 Personal Info

Nickname, Avatar, Echo ID, QR Code, Background Image, Personal Description.

### 4.2 Settings

  - **Native Language**: Language preference settings.
  - **Translation**: Target language. Display: Translation Only / Translation + Original. Voice Cloning.
  - **Call**: Save to Cloud/Local permanently; Auto-record (24h); Do not record. Valid for added contacts.
  - **Video**: Save to Cloud/Local permanently; Auto-record (24h); Do not record. Valid for added contacts.
  - **Nearby Visibility**: Toggle appearance in "Nearby."
  - **Moments**: Set visibility (Public, Friends, Specific Labels). View your own posts filtered by scope; others see only what they have permission to see.
  - **Blacklist**: Manage blocked entities.
  - **Logout**: Sign out of the account.

---
