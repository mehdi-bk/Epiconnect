import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, AtSign, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CampusBadge } from './CampusBadge';
import { User, Notification } from '../data/types';
import { mockNotifications, getUserById, getPostById } from '../data/mockData';

interface NotificationsPageProps {
  currentUser: User;
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onProfileClick: (userId: string) => void;
}

export function NotificationsPage({ currentUser, onBack, onPostClick, onProfileClick }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeTab);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notifDate = new Date(timestamp);
    const diffMs = now.getTime() - notifDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return notifDate.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500 fill-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'mention':
        return <AtSign className="w-5 h-5 text-green-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={onBack} size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-white rounded-2xl mb-6">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="like" className="flex-1">
              Likes
            </TabsTrigger>
            <TabsTrigger value="comment" className="flex-1">
              Comments
            </TabsTrigger>
            <TabsTrigger value="mention" className="flex-1">
              Mentions
            </TabsTrigger>
            <TabsTrigger value="follow" className="flex-1">
              Follows
            </TabsTrigger>
          </TabsList>

          <div className="space-y-2">
            {filteredNotifications.map(notification => {
              const fromUser = getUserById(notification.fromUserId);
              if (!fromUser) return null;

              const post = notification.postId ? getPostById(notification.postId) : null;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer ${
                    !notification.read ? 'border-l-4 border-[#0066CC]' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.postId) {
                      onPostClick(notification.postId);
                    } else if (notification.type === 'follow') {
                      onProfileClick(notification.fromUserId);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={fromUser.avatar}
                        alt={fromUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className="font-medium cursor-pointer hover:underline"
                              onClick={(e) => {
                                e.stopPropagation();
                                onProfileClick(fromUser.id);
                              }}
                            >
                              {fromUser.name}
                            </span>
                            <CampusBadge campusCode={fromUser.campus} size="sm" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>

                        {post && post.images.length > 0 && (
                          <img
                            src={post.images[0]}
                            alt="Post thumbnail"
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'all'
                    ? "You're all caught up!"
                    : `No ${activeTab} notifications`}
                </p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
