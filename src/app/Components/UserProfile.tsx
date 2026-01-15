import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Pencil, MessageCircle, UserPlus, MapPin, Calendar, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CampusBadge } from './CampusBadge';
import { PostCard } from './PostCard';
import { User, Post } from '../data/types';
import { mockPosts, getUserById } from '../data/mockData';
import { getCampusByCode } from '../data/campuses';

interface UserProfileProps {
  user: User;
  currentUser: User;
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onMessageClick: (userId: string) => void;
}

export function UserProfile({ user, currentUser, onBack, onPostClick, onMessageClick }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  const campus = getCampusByCode(user.campus);
  const isOwnProfile = user.id === currentUser.id;

  const userPosts = mockPosts.filter(post => post.authorId === user.id);
  const savedPosts = mockPosts.filter(post => post.savedBy.includes(user.id));
  const projectPosts = userPosts.filter(post => post.projectLinks.length > 0);

  const handleLike = (postId: string) => {
    // Handle like
  };

  const handleSave = (postId: string) => {
    // Handle save
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Cover & Profile */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Cover Image */}
          <div
            className="h-48 bg-gradient-to-r from-blue-500 to-orange-500"
            style={{
              backgroundImage: user.coverImage ? `url(${user.coverImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-20 mb-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div className="absolute bottom-2 right-2">
                  <CampusBadge campusCode={user.campus} size="md" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="mb-1">{user.name}</h2>
                <p className="text-muted-foreground">
                  {user.program} • Class of {user.graduationYear}
                </p>
              </div>

              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button variant="outline">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => onMessageClick(user.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      style={{
                        backgroundColor: isFollowing ? 'transparent' : '#0066CC',
                        color: isFollowing ? '#0066CC' : '#fff',
                        borderWidth: isFollowing ? '1px' : '0',
                        borderColor: isFollowing ? '#0066CC' : 'transparent'
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="mb-4">{user.bio}</p>
            )}

            {/* Info */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              {campus && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {campus.city}, {campus.country}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Skills */}
            {user.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4" />
                  <span className="font-medium">Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#0066CC] text-white rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {user.interests.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl mb-1">{user.stats.posts}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">{user.stats.likes}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">{user.stats.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white rounded-t-2xl">
            <TabsTrigger value="posts" className="flex-1">
              Posts ({userPosts.length})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">
              Projects ({projectPosts.length})
            </TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="saved" className="flex-1">
                Saved ({savedPosts.length})
              </TabsTrigger>
            )}
          </TabsList>

          <div className="mt-6 space-y-4">
            <TabsContent value="posts" className="mt-0 space-y-4">
              {userPosts.map(post => {
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
              {userPosts.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-muted-foreground">No posts yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="mt-0 space-y-4">
              {projectPosts.map(post => {
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
              {projectPosts.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-muted-foreground">No projects shared yet</p>
                </div>
              )}
            </TabsContent>

            {isOwnProfile && (
              <TabsContent value="saved" className="mt-0 space-y-4">
                {savedPosts.map(post => {
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
                {savedPosts.length === 0 && (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🔖</div>
                    <p className="text-muted-foreground">No saved posts yet</p>
                  </div>
                )}
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}