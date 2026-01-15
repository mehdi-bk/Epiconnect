import { User, Post, Comment, Message, Conversation, Notification } from './types';
import { campuses } from './campuses';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@epitech.eu',
    campus: 'PAR',
    program: 'Grande École',
    graduationYear: 2025,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Full-stack developer passionate about React & Node.js 🚀',
    skills: ['React', 'Node.js', 'TypeScript', 'Docker'],
    interests: ['Looking for collaborators', 'Open to help'],
    joinDate: '2024-09-01',
    stats: {
      posts: 24,
      likes: 156,
      followers: 42
    }
  },
  {
    id: '2',
    name: 'Lucas Dubois',
    email: 'lucas.dubois@epitech.eu',
    campus: 'LYO',
    program: 'Master',
    graduationYear: 2026,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'DevOps enthusiast | K8s certified',
    skills: ['Kubernetes', 'AWS', 'Python', 'Terraform'],
    interests: ['Share my work', 'Learn new skills'],
    joinDate: '2024-08-15',
    stats: {
      posts: 18,
      likes: 203,
      followers: 67
    }
  },
  {
    id: '3',
    name: 'Emma Schmidt',
    email: 'emma.schmidt@epitech.eu',
    campus: 'BER',
    program: 'Bachelor',
    graduationYear: 2027,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'AI/ML researcher exploring neural networks',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
    interests: ['Find collaborators', 'Share my work'],
    joinDate: '2024-10-01',
    stats: {
      posts: 12,
      likes: 89,
      followers: 34
    }
  },
  {
    id: '4',
    name: 'Carlos García',
    email: 'carlos.garcia@epitech.eu',
    campus: 'BAR',
    program: 'Grande École',
    graduationYear: 2025,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Game dev & Unity wizard 🎮',
    skills: ['Unity', 'C#', 'Blender', '3D Modeling'],
    interests: ['Looking for collaborators'],
    joinDate: '2024-09-10',
    stats: {
      posts: 31,
      likes: 278,
      followers: 89
    }
  },
  {
    id: '5',
    name: 'Marie Lefevre',
    email: 'marie.lefevre@epitech.eu',
    campus: 'PAR',
    program: 'Bachelor',
    graduationYear: 2026,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bio: 'Mobile developer | iOS & Android',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    interests: ['Help with projects', 'Learn new skills'],
    joinDate: '2024-08-20',
    stats: {
      posts: 15,
      likes: 124,
      followers: 45
    }
  }
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    type: 'project',
    content: 'Just finished my microservices project! Built a scalable e-commerce platform with React frontend and Node.js backend. Check it out! 🚀',
    images: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    projectLinks: [
      {
        url: 'https://github.com/sophie/ecommerce-microservices',
        platform: 'github',
        repoName: 'ecommerce-microservices',
        description: 'Full-stack e-commerce platform with microservices architecture',
        techStack: ['React', 'Node.js', 'Docker', 'MongoDB']
      }
    ],
    tags: ['React', 'Node.js', 'Docker', 'Microservices'],
    visibility: 'all',
    likes: 47,
    comments: 12,
    shares: 8,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likedBy: ['2', '3', '4'],
    savedBy: ['2']
  },
  {
    id: '2',
    authorId: '2',
    type: 'help',
    content: 'Need help with Kubernetes networking! Having issues with pod-to-pod communication across different namespaces. Anyone experienced with network policies? 🤔',
    images: [],
    projectLinks: [],
    tags: ['Kubernetes', 'DevOps', 'Help', 'Networking'],
    visibility: 'all',
    likes: 23,
    comments: 8,
    shares: 2,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likedBy: ['1', '5'],
    savedBy: []
  },
  {
    id: '3',
    authorId: '3',
    type: 'tutorial',
    content: 'Quick tutorial: How to implement a simple neural network from scratch in Python! No frameworks, just NumPy. Great for understanding the fundamentals. Thread below 👇',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'
    ],
    projectLinks: [
      {
        url: 'https://github.com/emma/neural-network-tutorial',
        platform: 'github',
        repoName: 'neural-network-tutorial',
        techStack: ['Python', 'NumPy']
      }
    ],
    tags: ['Python', 'AI', 'MachineLearning', 'Tutorial'],
    visibility: 'all',
    likes: 89,
    comments: 24,
    shares: 34,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likedBy: ['1', '2', '4', '5'],
    savedBy: ['1', '5']
  },
  {
    id: '4',
    authorId: '4',
    type: 'project',
    content: 'My latest Unity game is live! A 3D puzzle platformer with procedurally generated levels. Would love your feedback! 🎮✨',
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800'
    ],
    projectLinks: [
      {
        url: 'https://github.com/carlos/puzzle-platformer',
        platform: 'github',
        repoName: 'puzzle-platformer',
        description: '3D puzzle platformer with procedural generation',
        techStack: ['Unity', 'C#', 'Shader Graph']
      }
    ],
    tags: ['Unity', 'GameDev', 'CSharp', 'IndieGame'],
    visibility: 'all',
    likes: 124,
    comments: 31,
    shares: 18,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likedBy: ['1', '2', '3', '5'],
    savedBy: ['3', '5']
  },
  {
    id: '5',
    authorId: '5',
    type: 'standard',
    content: 'Anyone going to the React Conference in Amsterdam next month? Looking for travel buddies from Paris campus! 🚄',
    images: [],
    projectLinks: [],
    tags: ['React', 'Conference', 'Amsterdam'],
    visibility: 'campus',
    likes: 15,
    comments: 6,
    shares: 1,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    likedBy: ['1'],
    savedBy: []
  }
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorId: '2',
    content: 'This looks amazing! How did you handle the service discovery?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 5
  },
  {
    id: '2',
    postId: '1',
    authorId: '3',
    content: 'Great architecture! Would love to collaborate on something similar.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    likes: 3
  },
  {
    id: '3',
    postId: '3',
    authorId: '1',
    content: 'This is exactly what I needed to understand backpropagation! Thanks!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 8
  }
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: {
      id: 'm1',
      conversationId: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Thanks for the help with React hooks!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false
    },
    unreadCount: 1
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: 'm2',
      conversationId: '2',
      senderId: '1',
      receiverId: '3',
      content: 'Sure, let\'s meet up tomorrow!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    unreadCount: 0
  }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    fromUserId: '2',
    targetUserId: '1',
    postId: '1',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false,
    message: 'liked your post'
  },
  {
    id: '2',
    type: 'comment',
    fromUserId: '3',
    targetUserId: '1',
    postId: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    message: 'commented on your post'
  },
  {
    id: '3',
    type: 'follow',
    fromUserId: '4',
    targetUserId: '1',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    message: 'started following you'
  }
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(u => u.id === id);
};

export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(p => p.id === id);
};

export const getCommentsByPostId = (postId: string): Comment[] => {
  return mockComments.filter(c => c.postId === postId);
};
