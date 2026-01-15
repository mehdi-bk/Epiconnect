import React, { useState } from 'react';
import { LandingPage } from './Components/LandingPage.tsx';
import { RegistrationFlow } from './Components/RegistrationFlow.tsx';
import { Feed } from './Components/Feed.tsx';
import { UserProfile } from './Components/UserProfile.tsx';
import { PostDetail } from './Components/PostDetail.tsx';
import { SearchPage } from './Components/SearchPage.tsx';
import { MessagingPage } from './Components/MessagingPage.tsx';
import { NotificationsPage } from "./Components/NotificationPage.tsx";
import { User, RegistrationData } from './data/types.ts';
import { mockUsers, getUserById, getPostById } from './data/mockData.ts';

type AppScreen = 
  | { type: 'landing' }
  | { type: 'registration' }
  | { type: 'feed' }
  | { type: 'profile'; userId: string }
  | { type: 'post'; postId: string }
  | { type: 'search' }
  | { type: 'messages'; selectedUserId?: string }
  | { type: 'notifications' };

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>({ type: 'landing' });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen({ type: 'registration' });
  };

  const handleRegistrationComplete = (data: RegistrationData) => {
    // Create a new user based on registration data
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: data.email.split('@')[0], // Use email prefix as name
      email: data.email,
      campus: data.campus,
      program: data.program,
      graduationYear: data.graduationYear,
      avatar: data.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400`,
      bio: data.bio || '',
      skills: data.languages,
      interests: data.goals,
      joinDate: new Date().toISOString(),
      stats: {
        posts: 0,
        likes: 0,
        followers: 0
      }
    };

    setCurrentUser(newUser);
    setCurrentScreen({ type: 'feed' });
  };

  const handleBackToLanding = () => {
    setCurrentScreen({ type: 'landing' });
  };

  const handlePostClick = (postId: string) => {
    setCurrentScreen({ type: 'post', postId });
  };

  const handleProfileClick = (userId: string) => {
    setCurrentScreen({ type: 'profile', userId });
  };

  const handleSearchClick = () => {
    setCurrentScreen({ type: 'search' });
  };

  const handleNotificationsClick = () => {
    setCurrentScreen({ type: 'notifications' });
  };

  const handleMessageClick = (userId: string) => {
    setCurrentScreen({ type: 'messages', selectedUserId: userId });
  };

  const handleBackToFeed = () => {
    setCurrentScreen({ type: 'feed' });
  };

  // For demo purposes, use first mock user if no current user
  const activeUser = currentUser || mockUsers[0];

  return (
    <div className="min-h-screen">
      {currentScreen.type === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentScreen.type === 'registration' && (
        <RegistrationFlow
          onComplete={handleRegistrationComplete}
          onBack={handleBackToLanding}
        />
      )}

      {currentScreen.type === 'feed' && (
        <Feed
          currentUser={activeUser}
          onPostClick={handlePostClick}
          onProfileClick={handleProfileClick}
          onNotificationsClick={handleNotificationsClick}
          onSearchClick={handleSearchClick}
        />
      )}

      {currentScreen.type === 'profile' && (
        <UserProfile
          user={getUserById(currentScreen.userId) || activeUser}
          currentUser={activeUser}
          onBack={handleBackToFeed}
          onPostClick={handlePostClick}
          onMessageClick={handleMessageClick}
        />
      )}

      {currentScreen.type === 'post' && (() => {
        const post = getPostById(currentScreen.postId);
        if (!post) return null;
        return (
          <PostDetail
            post={post}
            currentUser={activeUser}
            onBack={handleBackToFeed}
            onProfileClick={handleProfileClick}
          />
        );
      })()}

      {currentScreen.type === 'search' && (
        <SearchPage
          currentUser={activeUser}
          onBack={handleBackToFeed}
          onPostClick={handlePostClick}
          onProfileClick={handleProfileClick}
        />
      )}

      {currentScreen.type === 'messages' && (
        <MessagingPage
          currentUser={activeUser}
          onBack={handleBackToFeed}
          onProfileClick={handleProfileClick}
          selectedUserId={currentScreen.selectedUserId}
        />
      )}

      {currentScreen.type === 'notifications' && (
        <NotificationsPage
          currentUser={activeUser}
          onBack={handleBackToFeed}
          onPostClick={handlePostClick}
          onProfileClick={handleProfileClick}
        />
      )}
    </div>
  );
}

export default App;
