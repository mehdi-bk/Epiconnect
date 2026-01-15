import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { PostCard } from './PostCard';
import { CampusBadge } from './CampusBadge';
import { Post, User, Comment } from '../data/types';
import { getUserById, getCommentsByPostId, mockComments, mockPosts } from '../data/mockData';

interface PostDetailProps {
  post: Post;
  currentUser: User;
  onBack: () => void;
  onProfileClick: (userId: string) => void;
}

export function PostDetail({ post, currentUser, onBack, onProfileClick }: PostDetailProps) {
  const [comments, setComments] = useState<Comment[]>(getCommentsByPostId(post.id));
  const [newComment, setNewComment] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const author = getUserById(post.authorId);
  if (!author) return null;

  const handleLike = () => {
    // Handle like
  };

  const handleSave = () => {
    // Handle save
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: String(comments.length + 1),
      postId: post.id,
      authorId: currentUser.id,
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Post Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Author Info */}
          <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onProfileClick(author.id)}
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{author.name}</span>
                <CampusBadge campusCode={author.campus} size="sm" />
              </div>
              <p className="text-sm text-muted-foreground">
                {formatTimestamp(post.timestamp)}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            <p className="whitespace-pre-wrap text-lg">{post.content}</p>
          </div>

          {/* Images Carousel */}
          {post.images.length > 0 && (
            <div className="relative">
              <img
                src={post.images[imageIndex]}
                alt={`Post image ${imageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
              {post.images.length > 1 && (
                <>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {post.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === imageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  {imageIndex > 0 && (
                    <button
                      onClick={() => setImageIndex(imageIndex - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
                    >
                      ‹
                    </button>
                  )}
                  {imageIndex < post.images.length - 1 && (
                    <button
                      onClick={() => setImageIndex(imageIndex + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2"
                    >
                      ›
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Project Links */}
          {post.projectLinks.length > 0 && (
            <div className="px-4 py-4 space-y-3 bg-gray-50">
              {post.projectLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <span>🔗</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{link.repoName}</p>
                      <p className="text-sm text-muted-foreground">View on GitHub →</p>
                    </div>
                  </div>
                  {link.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {link.description}
                    </p>
                  )}
                  {link.techStack && link.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {link.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-[#0066CC] text-white rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#E9ECEF', color: '#0066CC' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="px-4 py-3 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>{post.likes} likes</span>
              <span>{comments.length} comments • {post.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3>Comments</h3>
          </div>

          <div className="divide-y">
            {comments.map(comment => {
              const commentAuthor = getUserById(comment.authorId);
              if (!commentAuthor) return null;

              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4"
                >
                  <div className="flex gap-3">
                    <img
                      src={commentAuthor.avatar}
                      alt={commentAuthor.name}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={() => onProfileClick(commentAuthor.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium cursor-pointer hover:underline"
                          onClick={() => onProfileClick(commentAuthor.id)}
                        >
                          {commentAuthor.name}
                        </span>
                        <CampusBadge campusCode={commentAuthor.campus} size="sm" />
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-[#0066CC]">
                          Like ({comment.likes})
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-[#0066CC]">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {comments.length === 0 && (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-muted-foreground">No comments yet</p>
                <p className="text-sm text-muted-foreground">Be the first to comment!</p>
              </div>
            )}
          </div>

          {/* Add Comment */}
          <div className="p-4 border-t sticky bottom-0 bg-white">
            <div className="flex gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="resize-none"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  style={{ backgroundColor: '#FF6B35', color: '#fff' }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
