import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { campuses } from '../data/campuses';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [currentCampusIndex, setCurrentCampusIndex] = useState(0);
  const displayCampuses = campuses.slice(0, 8); // Show 8 campuses in rotation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCampusIndex((prev) => (prev + 1) % displayCampuses.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [displayCampuses.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#0066CC] flex items-center justify-center">
              <span className="text-white text-2xl">E</span>
            </div>
            <h1 className="text-4xl" style={{ color: '#0066CC' }}>EpiConnect</h1>
          </div>
        </motion.div>

        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl mb-6" style={{ color: '#1A1A1A' }}>
            Connecting 17 Epitech campuses
            <br />
            <span className="inline-block mt-2">across Europe</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <motion.span
              key={currentCampusIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-2xl md:text-3xl"
              style={{ color: displayCampuses[currentCampusIndex].color }}
            >
              {displayCampuses[currentCampusIndex].flag} {displayCampuses[currentCampusIndex].city}
            </motion.span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {displayCampuses.map((campus, idx) => (
              <motion.div
                key={campus.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: idx === currentCampusIndex ? 1 : 0.5,
                  scale: idx === currentCampusIndex ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="px-3 py-1.5 rounded-full text-white text-sm"
                  style={{ backgroundColor: campus.color }}
                >
                  {campus.code}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="mb-2">Share Projects Across Campuses</h3>
            <p className="text-muted-foreground">
              Showcase your work and get inspired by projects from all 17 campuses
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="mb-2">Get Unstuck Faster</h3>
            <p className="text-muted-foreground">
              Ask questions and get help from experienced students across Europe
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="mb-2">Learn from 17 Communities</h3>
            <p className="text-muted-foreground">
              Connect with diverse perspectives and expand your network
            </p>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xl mb-6" style={{ color: '#1A1A1A' }}>
            Join <span style={{ color: '#FF6B35' }}>500+ students</span> already connected
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {campuses.map((campus) => (
              <span
                key={campus.code}
                className="text-2xl"
                title={`${campus.city}, ${campus.country}`}
              >
                {campus.flag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-8 py-6 text-lg"
            style={{ backgroundColor: '#FF6B35', color: '#fff' }}
          >
            Sign Up
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
            style={{ borderColor: '#0066CC', color: '#0066CC' }}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
