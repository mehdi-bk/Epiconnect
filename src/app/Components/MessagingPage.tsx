import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Paperclip, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CampusBadge } from './CampusBadge';
import { User, Message, Conversation } from '../data/types';
import { mockConversations, mockUsers, getUserById } from '../data/mockData';

interface MessagingPageProps {
  currentUser: User;
  onBack: () => void;
  onProfileClick: (userId: string) => void;
  selectedUserId?: string;
}

export function MessagingPage({ currentUser, onBack, onProfileClick, selectedUserId }: MessagingPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    selectedUserId ? conversations.find(c => c.participants.includes(selectedUserId))?.id || null : null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const currentConversation = conversations.find(c => c.id === selectedConversation);
  const otherUserId = currentConversation?.participants.find(id => id !== currentUser.id);
  const otherUser = otherUserId ? getUserById(otherUserId) : null;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffHours = diff / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !otherUserId) return;

    const message: Message = {
      id: `m${Date.now()}`,
      conversationId: selectedConversation,
      senderId: currentUser.id,
      receiverId: otherUserId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Generate mock messages for selected conversation
  React.useEffect(() => {
    if (selectedConversation && otherUserId) {
      const mockMessages: Message[] = [
        {
          id: 'm1',
          conversationId: selectedConversation,
          senderId: otherUserId,
          receiverId: currentUser.id,
          content: 'Hey! I saw your post about the React project. Really impressive work!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: true
        },
        {
          id: 'm2',
          conversationId: selectedConversation,
          senderId: currentUser.id,
          receiverId: otherUserId,
          content: 'Thanks! I spent a lot of time on the architecture.',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
          read: true
        },
        {
          id: 'm3',
          conversationId: selectedConversation,
          senderId: otherUserId,
          receiverId: currentUser.id,
          content: 'Would you be interested in collaborating on a similar project? I have some ideas.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          read: true
        },
        {
          id: 'm4',
          conversationId: selectedConversation,
          senderId: currentUser.id,
          receiverId: otherUserId,
          content: 'Definitely! Let\'s set up a call to discuss.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read: true
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation, otherUserId, currentUser.id]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Conversations List */}
      <div className={`w-full lg:w-96 bg-white border-r flex flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h3>Messages</h3>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => {
            const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
            const participant = otherParticipantId ? getUserById(otherParticipantId) : null;
            if (!participant) return null;

            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b ${
                  selectedConversation === conversation.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{participant.name}</span>
                    <CampusBadge campusCode={participant.campus} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </p>
                </div>
              </button>
            );
          })}

          {conversations.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Start a conversation!</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat View */}
      {selectedConversation && otherUser ? (
        <div className={`flex-1 flex flex-col bg-white ${!selectedConversation ? 'hidden' : 'flex'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedConversation(null)}
                className="lg:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => onProfileClick(otherUser.id)}
              />
              <div className="cursor-pointer" onClick={() => onProfileClick(otherUser.id)}>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{otherUser.name}</span>
                  <CampusBadge campusCode={otherUser.campus} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">{otherUser.program}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Video className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => {
              const isSent = message.senderId === currentUser.id;
              const sender = getUserById(message.senderId);

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${isSent ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isSent && sender && (
                    <img
                      src={sender.avatar}
                      alt={sender.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isSent
                        ? 'bg-[#FF6B35] text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${isSent ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{ backgroundColor: '#FF6B35', color: '#fff' }}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">
              Choose a conversation from the left to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
