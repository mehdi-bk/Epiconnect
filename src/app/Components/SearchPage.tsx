import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search as SearchIcon, User, Hash, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CampusBadge } from './CampusBadge';
import { PostCard } from './PostCard';
import { mockPosts, mockUsers, getUserById } from '../data/mockData';
import { User as UserType, Post } from '../data/types';

interface SearchPageProps {
  currentUser: UserType;
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onProfileClick: (userId: string) => void;
}

export function SearchPage({ currentUser, onBack, onPostClick, onProfileClick }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const searchResults = {
    posts: mockPosts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    users: mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    tags: Array.from(new Set(
      mockPosts.flatMap(post => post.tags)
    )).filter(tag => 
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const totalResults = searchResults.posts.length + searchResults.users.length + searchResults.tags.length;

  const handleLike = (postId: string) => {
    // Handle like
  };

  const handleSave = (postId: string) => {
    // Handle save
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200">{part}</mark> : part
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search posts, users, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {searchQuery && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Found {totalResults} results for "{searchQuery}"
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white rounded-2xl mb-6">
            <TabsTrigger value="all" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              All ({totalResults})
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Posts ({searchResults.posts.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1">
              <User className="w-4 h-4 mr-2" />
              Users ({searchResults.users.length})
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex-1">
              <Hash className="w-4 h-4 mr-2" />
              Tags ({searchResults.tags.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Users Section */}
            {searchResults.users.length > 0 && (
              <div>
                <h3 className="mb-3">Users</h3>
                <div className="space-y-2">
                  {searchResults.users.slice(0, 3).map(user => (
                    <UserResultCard
                      key={user.id}
                      user={user}
                      currentUserId={currentUser.id}
                      query={searchQuery}
                      onClick={() => onProfileClick(user.id)}
                      highlightText={highlightText}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Posts Section */}
            {searchResults.posts.length > 0 && (
              <div>
                <h3 className="mb-3">Posts</h3>
                <div className="space-y-4">
                  {searchResults.posts.slice(0, 3).map(post => {
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
              </div>
            )}

            {/* Tags Section */}
            {searchResults.tags.length > 0 && (
              <div>
                <h3 className="mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {searchResults.tags.slice(0, 10).map(tag => (
                    <TagResultCard key={tag} tag={tag} highlightText={highlightText} query={searchQuery} />
                  ))}
                </div>
              </div>
            )}

            {totalResults === 0 && searchQuery && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {searchResults.posts.map(post => {
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
            {searchResults.posts.length === 0 && searchQuery && (
              <EmptyState icon="📝" message="No posts found" />
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-2">
            {searchResults.users.map(user => (
              <UserResultCard
                key={user.id}
                user={user}
                currentUserId={currentUser.id}
                query={searchQuery}
                onClick={() => onProfileClick(user.id)}
                highlightText={highlightText}
              />
            ))}
            {searchResults.users.length === 0 && searchQuery && (
              <EmptyState icon="👤" message="No users found" />
            )}
          </TabsContent>

          <TabsContent value="tags" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {searchResults.tags.map(tag => (
                <TagResultCard key={tag} tag={tag} highlightText={highlightText} query={searchQuery} />
              ))}
            </div>
            {searchResults.tags.length === 0 && searchQuery && (
              <EmptyState icon="#️⃣" message="No tags found" />
            )}
          </TabsContent>
        </Tabs>

        {!searchQuery && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="mb-2">Search EpiConnect</h3>
            <p className="text-muted-foreground">
              Find posts, users, and tags across all campuses
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function UserResultCard({ user, currentUserId, query, onClick, highlightText }: any) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div
      className="bg-white rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{highlightText(user.name, query)}</span>
            <CampusBadge campusCode={user.campus} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {user.bio}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {user.skills.slice(0, 3).map((skill: string) => (
              <span key={skill} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsFollowing(!isFollowing);
          }}
          style={{
            backgroundColor: isFollowing ? 'transparent' : '#0066CC',
            color: isFollowing ? '#0066CC' : '#fff'
          }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    </div>
  );
}

function TagResultCard({ tag, highlightText, query }: any) {
  const postCount = mockPosts.filter(post => post.tags.includes(tag)).length;

  return (
    <button className="bg-white rounded-xl px-4 py-3 hover:shadow-sm transition-shadow text-left">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-medium" style={{ color: '#0066CC' }}>
            #{highlightText(tag, query)}
          </span>
          <p className="text-xs text-muted-foreground mt-1">
            {postCount} posts
          </p>
        </div>
        <Button variant="ghost" size="sm">
          Follow
        </Button>
      </div>
    </button>
  );
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="bg-white rounded-2xl p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
