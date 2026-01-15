import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, EllipsisVertical, ExternalLink, Github } from 'lucide-react';
import { Post, User } from '../data/types';
import { CampusBadge } from './CampusBadge';
import { Button } from './ui/button';

interface PostCardProps {
  post: Post;
  author: User;
  currentUserId: string;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string) => void;
  onClick?: (postId: string) => void;
}

export function PostCard({ post, author, currentUserId, onLike, onSave, onComment, onClick }: PostCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const isLiked = post.likedBy.includes(currentUserId);
  const isSaved = post.savedBy.includes(currentUserId);

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffMs = now.getTime() - postDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return postDate.toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getPostTypeBadge = () => {
    const badges = {
      project: { label: 'Project Showcase', color: '#0066CC' },
      help: { label: 'Need Help', color: '#E74C3C' },
      tutorial: { label: 'Tutorial', color: '#2ECC71' },
      standard: null
    };
    const badge = badges[post.type];
    if (!badge) return null;

    return (
      <span
        className="text-xs px-2 py-1 rounded-full text-white"
        style={{ backgroundColor: badge.color }}
      >
        {badge.label}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick && onClick(post.id)}
    >
      {/* Author Info */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium truncate">{author.name}</span>
              <CampusBadge campusCode={author.campus} size="sm" />
              {getPostTypeBadge()}
            </div>
            <p className="text-sm text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap">
          {truncateContent(post.content)}
          {post.content.length > 200 && (
            <button className="text-[#0066CC] ml-1">Read more</button>
          )}
        </p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="relative">
          {post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="Post image"
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className={`grid gap-1 ${
              post.images.length === 2 ? 'grid-cols-2' :
              post.images.length === 3 ? 'grid-cols-2' :
              'grid-cols-2'
            }`}>
              {post.images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className={`relative ${
                    post.images.length === 3 && idx === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`Post image ${idx + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  {idx === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="text-white text-2xl">+{post.images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Links */}
      {post.projectLinks.length > 0 && (
        <div className="px-4 py-3 space-y-2">
          {post.projectLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{link.repoName}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                  {link.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {link.description}
                    </p>
                  )}
                  {link.techStack && link.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {link.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 bg-gray-100 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: '#E9ECEF', color: '#0066CC' }}
                onClick={(e) => e.stopPropagation()}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Bar */}
      <div className="px-4 py-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1.5 transition-colors group"
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'
              }`}
            />
            <span className="text-sm">{post.likes}</span>
          </button>

          <button
            className="flex items-center gap-1.5 hover:text-[#0066CC] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onComment(post.id);
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>

          <button
            className="flex items-center gap-1.5 hover:text-[#0066CC] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm">{post.shares}</span>
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(post.id);
          }}
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${
              isSaved ? 'fill-[#FF6B35] text-[#FF6B35]' : 'hover:text-[#FF6B35]'
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}