import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Bell, Plus, ListFilter, TrendingUp } from 'lucide-react';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { CampusBadge } from './CampusBadge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Post, User } from '../data/types';
import { mockPosts, mockUsers, getUserById } from '../data/mockData';
import { campuses } from '../data/campuses';

interface FeedProps {
  currentUser: User;
  onPostClick: (postId: string) => void;
  onProfileClick: (userId: string) => void;
  onNotificationsClick: () => void;
  onSearchClick: () => void;
}

export function Feed({ currentUser, onPostClick, onProfileClick, onNotificationsClick, onSearchClick }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'trending'>('recent');
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const trendingTags = ['React', 'Docker', 'Help', 'AI', 'Python', 'WebDev'];

  const filteredPosts = posts
    .filter(post => selectedCampus === 'all' || post.visibility === 'all' || getUserById(post.authorId)?.campus === selectedCampus)
    .filter(post => !selectedTag || post.tags.includes(selectedTag))
    .sort((a, b) => {
      if (sortBy === 'trending') {
        return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(currentUser.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked
            ? post.likedBy.filter(id => id !== currentUser.id)
            : [...post.likedBy, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isSaved = post.savedBy.includes(currentUser.id);
        return {
          ...post,
          savedBy: isSaved
            ? post.savedBy.filter(id => id !== currentUser.id)
            : [...post.savedBy, currentUser.id]
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (newPost: Partial<Post>) => {
    const post: Post = {
      id: String(posts.length + 1),
      authorId: currentUser.id,
      type: newPost.type || 'standard',
      content: newPost.content || '',
      images: newPost.images || [],
      projectLinks: newPost.projectLinks || [],
      tags: newPost.tags || [],
      visibility: newPost.visibility || 'all',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      likedBy: [],
      savedBy: []
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#0066CC] flex items-center justify-center">
                <span className="text-white">E</span>
              </div>
              <span className="hidden sm:inline" style={{ color: '#0066CC' }}>
                EpiConnect
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts, users, tags..."
                  className="pl-9 pr-4"
                  onClick={onSearchClick}
                  readOnly
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={onNotificationsClick}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              <button onClick={() => onProfileClick(currentUser.id)}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* Feed */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Campus Filter */}
                <div className="flex-1 w-full sm:w-auto">
                  <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <ListFilter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campuses</SelectItem>
                      {campuses.map(campus => (
                        <SelectItem key={campus.code} value={campus.code}>
                          {campus.flag} {campus.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <Tabs value={sortBy} onValueChange={(v: any) => setSortBy(v)} className="flex-1">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="recent" className="flex-1 sm:flex-none">
                      Recent
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="flex-1 sm:flex-none">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Trending
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Tag Filter Chips */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    !selectedTag
                      ? 'bg-[#0066CC] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#0066CC] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map(post => {
                const author = getUserById(post.authorId);
                if (!author) return null;
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    author={author}
                    currentUserId={currentUser.id}
                    onLike={handleLike}
                    onSave={handleSave}
                    onComment={onPostClick}
                    onClick={onPostClick}
                  />
                );
              })}
            </div>

            {filteredPosts.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share something!
                </p>
                <Button
                  onClick={() => setIsCreatePostOpen(true)}
                  style={{ backgroundColor: '#FF6B35', color: '#fff' }}
                >
                  Create Post
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{currentUser.name}</p>
                  <CampusBadge campusCode={currentUser.campus} size="sm" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onProfileClick(currentUser.id)}
              >
                View Profile
              </Button>
            </div>

            {/* Trending Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="mb-4">Trending Tags</h4>
              <div className="space-y-2">
                {trendingTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-sm" style={{ color: '#0066CC' }}>#{tag}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 50) + 10} posts
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Campus Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="mb-4">Your Campus</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active users</span>
                  <span>47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts today</span>
                  <span>23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Projects shared</span>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-40"
        style={{ backgroundColor: '#FF6B35' }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
        campusCode={currentUser.campus}
      />
    </div>
  );
}