import { Campus } from './campuses';

export interface User {
  id: string;
  name: string;
  email: string;
  campus: string; // Campus code
  program: 'Grande École' | 'Bachelor' | 'Master';
  graduationYear: number;
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  joinDate: string;
  stats: {
    posts: number;
    likes: number;
    followers: number;
  };
  coverImage?: string;
}

export interface Post {
  id: string;
  authorId: string;
  type: 'standard' | 'project' | 'help' | 'tutorial';
  content: string;
  images: string[];
  projectLinks: ProjectLink[];
  tags: string[];
  visibility: 'campus' | 'all';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  likedBy: string[];
  savedBy: string[];
}

export interface ProjectLink {
  url: string;
  platform: 'github' | 'gitlab' | 'other';
  repoName: string;
  description?: string;
  techStack?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  sharedPost?: string;
  sharedProject?: ProjectLink;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'mention' | 'follow';
  fromUserId: string;
  targetUserId: string;
  postId?: string;
  timestamp: string;
  read: boolean;
  message: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  campus: string;
  program: 'Grande École' | 'Bachelor' | 'Master';
  graduationYear: number;
  techInterests: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  languages: string[];
  goals: string[];
  avatar?: string;
  bio?: string;
}
