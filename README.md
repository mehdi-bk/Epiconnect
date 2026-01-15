# 🎓 EpiConnect - Uniting Epitech's 17 Campuses

<div align="center">

![EpiConnect Logo](./docs/assets/logo.png)

**The Revolutionary Social Network Built by Epitech Students, For Epitech Students**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](YOUR_VERCEL_URL)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase)](https://firebase.google.com/)

[Live Demo](YOUR_DEMO_URL) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 🌍 The Vision

Epitech's educational philosophy is built on **peer-to-peer learning** and **collaborative problem-solving**. With **17 campuses across Europe**—from Paris to Berlin, Barcelona to Brussels—thousands of students face the same challenges, build similar projects, and solve identical problems **every single day**.

Yet, we remain **isolated in our campus silos**.

**EpiConnect changes everything.**

---

## 💡 The Problem We're Solving

### The Reality of Epitech Today

Epitech students currently navigate a **fragmented ecosystem** of disconnected platforms:

| Platform | Purpose | The Problem |
|----------|---------|-------------|
| 🎮 **Discord** | Campus-specific communication | Conversations disappear in endless chat streams. Knowledge is lost. No cross-campus discovery. |
| 📸 **Instagram** | Social sharing | Not project-focused. No campus filtering. Algorithm prioritizes engagement over relevance. |
| 💼 **LinkedIn** | Professional networking | Too formal for peer learning. Not designed for current students. No collaborative features. |
| 📘 **Facebook Groups** | Campus communities | Outdated for Gen Z. Poor content organization. No project showcase capabilities. |
| 💬 **Slack** | Team communication | Limited to single campuses. Not built for visual content sharing. |

### The Critical Gap

**A student in Paris** spends 6 hours debugging a Docker networking issue.

**A student in Lyon** solved the exact same problem last week and shared the solution in their campus Discord.

**But they never connect.**

The knowledge exists. The community exists. **The platform doesn't.**

---

## ✨ Why EpiConnect is Revolutionary

EpiConnect isn't just another social network—it's the **first platform designed specifically for Epitech's unique educational model**.

### 🎯 What Makes Us Different

#### 1. **One Profile, Entire Epitech Network**
Stop juggling multiple Discord servers, WhatsApp groups, and LinkedIn profiles. **One account connects you to 17 campuses instantly.**

#### 2. **Campus-Aware Intelligence**
Every post, every user, every interaction is **campus-tagged**. Find that React expert in Brussels. See what Berlin students are building. Filter content by your campus or explore the entire network.

#### 3. **Project-Centric Design**
Built for what Epitech students actually do:
- **Visual project showcases** with multi-image galleries
- **Direct GitHub integration** with automatic repo previews
- **Rich media posts** that show your work, not just describe it
- **Technical tagging system** (#React, #Docker, #AI) for precise discovery

#### 4. **Revolutionary In-App Messaging**
Unlike scattered WhatsApp threads and Discord DMs:
- **Unified conversations** with students across all campuses
- **Share posts and projects** directly in messages
- **GitHub link previews** for instant code collaboration
- **Campus context** always visible—know who you're talking to

#### 5. **Built for Peer Learning**
- **"Need Help" post templates** for quick problem-solving
- **"Project Showcase" templates** to display your best work
- **"Tip/Tutorial" templates** for sharing knowledge
- **Smart search** that finds solutions, not just keywords

#### 6. **Cross-Campus Collaboration**
- Find project partners with **specific skills** (not just proximity)
- Discover students working on **similar technologies**
- Build **international teams** across European campuses
- Learn from **different campus approaches** to the same projects

---

## 🚀 Core Features

### 📱 For Every Student

#### **Intelligent Feed System**
- Chronological and trending views
- Filter by campus (your city or explore all 17)
- Filter by technical tags
- Search posts, users, and projects instantly

#### **Rich Content Creation**
- Text posts (500 characters)
- Upload 1-4 images per post
- GitHub repository integration with auto-previews
- Hashtag system for discoverability
- Visibility controls (My Campus / All Campuses)

#### **Engagement & Community**
- Like and comment on posts
- Real-time notifications
- Direct messaging system
- Campus badges on every profile
- Project collaboration requests

#### **Comprehensive Profiles**
- Display campus, program, and graduation year
- Showcase your technical skills
- List your projects with GitHub links
- Track your contributions (posts, likes, comments)
- Build your reputation across the network

### 🎨 Special Post Types

#### **Project Showcase**
Professional template for displaying completed work:
- Multi-image gallery
- GitHub repository link
- Tech stack visualization
- Live demo links
- Collaborator attribution

#### **Need Help**
Structured problem-solving format:
- Clear problem description
- Context (course, module, deadline)
- What you've already tried
- Code snippets or screenshots
- Tag relevant technologies

#### **Tip/Tutorial**
Share knowledge that helps everyone:
- Step-by-step instructions
- Visual examples
- Code snippets
- Related resources

---

## 🏗️ Technical Architecture

### **Frontend Stack**
```javascript
├── React 18             // Modern UI library
├── Vite                 // Lightning-fast build tool
├── Tailwind CSS         // Utility-first styling
├── React Router v6      // Client-side routing
├── Zustand              // Lightweight state management
├── React Query          // Server state & caching
├── Lucide React         // Beautiful icons
└── React Hook Form      // Performant form handling
```

### **Backend Stack**
```javascript
├── Firebase Auth        // Secure user authentication
├── Firestore            // Real-time NoSQL database
├── Firebase Storage     // Image and file hosting
└── Cloud Functions      // Serverless backend logic
```

### **Why This Stack?**

✅ **Rapid Development** - Firebase eliminates backend complexity  
✅ **Real-Time Capabilities** - Live updates for messages and notifications  
✅ **Scalability** - Handles 1000+ users on free tier, ready for 10,000+  
✅ **Security** - Built-in authentication and database rules  
✅ **Cost-Effective** - Generous free tier for student projects  
✅ **Modern** - React and Tailwind are industry-standard tools  

---

## 📊 Database Schema

### **Firestore Collections**

```javascript
users/
  ├── {userId}
  │   ├── email: string
  │   ├── name: string
  │   ├── campus: string (Paris, Lyon, Berlin, etc.)
  │   ├── program: string (Grande École, Bachelor, Master)
  │   ├── graduationYear: number
  │   ├── bio: string
  │   ├── skills: array<string>
  │   ├── interests: array<string>
  │   ├── profilePicture: string (URL)
  │   └── createdAt: timestamp

posts/
  ├── {postId}
  │   ├── authorId: string (ref to users)
  │   ├── content: string
  │   ├── images: array<string> (URLs, max 4)
  │   ├── projectLink: string (GitHub URL)
  │   ├── tags: array<string> (#React, #Docker)
  │   ├── type: string (standard, project, help, tutorial)
  │   ├── campus: string (author's campus)
  │   ├── visibility: string (campus, all)
  │   ├── likeCount: number
  │   ├── commentCount: number
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp

likes/
  ├── {postId}_{userId}
  │   ├── postId: string
  │   ├── userId: string
  │   └── createdAt: timestamp

comments/
  ├── {commentId}
  │   ├── postId: string
  │   ├── authorId: string
  │   ├── content: string (max 300 chars)
  │   └── createdAt: timestamp

messages/
  ├── {conversationId}
  │   ├── participants: array<string> (2 user IDs)
  │   ├── lastMessage: string
  │   ├── lastMessageTime: timestamp
  │   └── unreadCount: object {userId: count}
  │
  └── messages/
      ├── {messageId}
      │   ├── senderId: string
      │   ├── content: string
      │   ├── sharedPost: string (optional)
      │   ├── sharedProject: string (optional)
      │   ├── read: boolean
      │   └── createdAt: timestamp

notifications/
  ├── {userId}
  │   └── notifications/
  │       ├── {notificationId}
  │       │   ├── type: string (like, comment, mention, follow)
  │       │   ├── fromUserId: string
  │       │   ├── postId: string (optional)
  │       │   ├── read: boolean
  │       │   └── createdAt: timestamp
```

---

## 🎨 Design Philosophy

### **User-Centric Principles**

1. **Mobile-First** - 80% of students browse on their phones
2. **Speed** - Fast loading, instant feedback, smooth animations
3. **Clarity** - Clean layouts, obvious CTAs, no clutter
4. **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation
5. **Familiarity** - Inspired by Instagram and LinkedIn (Gen Z expectations)

### **Color System**

```css
/* Primary Colors */
--epitech-blue: #0066CC;    /* Trust, brand consistency */
--epitech-orange: #FF6B35;  /* Energy, CTAs */

/* Campus Badge Colors */
--paris: #0066CC;
--lyon: #FF6B35;
--berlin: #D35400;
--barcelona: #8E44AD;
/* ... 13 more unique colors */

/* Neutral Colors */
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-900: #1A1A1A;
```

### **Typography**

- **Headings**: Poppins Semi-Bold
- **Body**: Inter Regular
- **Code**: JetBrains Mono

---

## 🚦 Getting Started

### **Prerequisites**

```bash
Node.js >= 18.x
npm >= 9.x
Git
Firebase account (free tier)
```

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/epiconnect.git
cd epiconnect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project: `epiconnect`
- Enable Authentication (Email/Password)
- Create Firestore Database (start in test mode)
- Enable Storage
- Copy your Firebase config

4. **Configure environment variables**

Create `.env.local` in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🚀

---

## 📁 Project Structure

```
epiconnect/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Login, Signup, Onboarding
│   │   ├── feed/          # PostCard, Feed, Filters
│   │   ├── post/          # CreatePost, PostDetail
│   │   ├── profile/       # UserProfile, ProfileCard
│   │   ├── messaging/     # ChatList, ChatView
│   │   └── common/        # Button, Input, Badge, etc.
│   ├── pages/             # Route pages
│   │   ├── Landing.jsx
│   │   ├── Feed.jsx
│   │   ├── Profile.jsx
│   │   ├── Messages.jsx
│   │   └── Notifications.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── usePosts.js
│   │   ├── useComments.js
│   │   └── useMessages.js
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── lib/               # Configuration & utilities
│   │   ├── firebase.js
│   │   └── utils.js
│   ├── data/              # Static data
│   │   └── campuses.js    # All 17 Epitech campuses
│   ├── assets/            # Images, icons
│   └── App.jsx            # Main app component
├── docs/                  # Project documentation
│   ├── 01_research/
│   ├── 02_personas/
│   ├── 03_user_journey/
│   ├── 04_wireframes/
│   ├── 05_mockups/
│   └── 09_pitch/
├── .env.local             # Environment variables (not committed)
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🧪 Testing Strategy

### **Test Types**

```javascript
├── Unit Tests              // Component logic
├── Integration Tests       // Firebase interactions
├── Functional Tests        // User flows
├── E2E Tests              // Complete scenarios
├── Performance Tests      // Load times, responsiveness
└── Smoke Tests            // Critical paths
```

### **Testing Tools**
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **Lighthouse** - Performance auditing

### **Critical Paths to Test**
1. User signup → onboarding → first post
2. Search → find post → comment
3. Create post with image → upload to Firebase
4. Send message → receive notification
5. Filter feed by campus → by tag

---

## 🌐 Deployment

### **Production Deployment (Vercel)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel Dashboard
```

### **Firebase Security Rules**

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read all profiles
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts are public (read) but only author can edit
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Comments
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Messages (private)
    match /messages/{conversationId} {
      allow read, write: if request.auth.uid in resource.data.participants;
    }
  }
}
```

---

## 📈 Roadmap

### **Version 1.0 (MVP)** ✅ *Current*
- ✅ User authentication
- ✅ Post creation with images
- ✅ Campus-filtered feed
- ✅ Like and comment system
- ✅ User profiles
- ✅ Direct messaging

### **Version 1.1** 🚧 *In Progress*
- 🔨 Advanced search (users, posts, tags)
- 🔨 Trending posts algorithm
- 🔨 Push notifications
- 🔨 Follow/unfollow users
- 🔨 Bookmark posts

### **Version 2.0** 📅 *Planned*
- 📋 Event posting (hackathons, meetups)
- 📋 Project collaboration board
- 📋 Skill endorsements
- 📋 Campus leaderboards
- 📋 AI-powered content recommendations

### **Version 3.0** 🔮 *Future*
- 🌟 Alumni network integration
- 🌟 Internship/job board
- 🌟 Video content support
- 🌟 Live streaming for workshops
- 🌟 Mobile apps (iOS/Android)

---

## 👥 The Team

Built with ❤️ by Epitech students who were tired of fragmented communication.

**[Your Name]** - Product Designer & Full-Stack Developer  
📧 your.email@epitech.eu  
🔗 [LinkedIn](your_linkedin) | [GitHub](your_github)

---

## 🤝 Contributing

EpiConnect is **open-source** and built for the Epitech community. We welcome contributions!

### **How to Contribute**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 EpiConnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- **Epitech** - For fostering a culture of peer learning
- **Firebase** - For the incredible free tier
- **React Community** - For the amazing ecosystem
- **All beta testers** - Students from Paris, Lyon, Berlin, and Barcelona who provided invaluable feedback

---

## 📞 Support

Having issues? Want to suggest a feature?

- 🐛 [Report a Bug](../../issues)
- 💡 [Request a Feature](../../issues)
- 💬 Join our Discord: [EpiConnect Community](YOUR_DISCORD_LINK)
- 📧 Email: support@epiconnect.eu

---

## 🌟 Star Us!

If EpiConnect helped you connect with other Epitech students or solve a problem faster, **give us a star** ⭐

It helps other students discover the platform!

---

<div align="center">

**Built by Epitech students, for Epitech students**

🇫🇷 🇩🇪 🇧🇪 🇪🇸

*Connecting 17 campuses, one post at a time*

[Website](YOUR_URL) • [Documentation](./docs) • [Figma](YOUR_FIGMA) • [Pitch Deck](./docs/09_pitch)

</div>