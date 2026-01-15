import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Link as LinkIcon, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Post } from '../data/types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: Partial<Post>) => void;
  campusCode: string;
}

export function CreatePostModal({ isOpen, onClose, onCreatePost, campusCode }: CreatePostModalProps) {
  const [postType, setPostType] = useState<'standard' | 'project' | 'help' | 'tutorial'>('standard');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [projectLink, setProjectLink] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<'campus' | 'all'>('all');

  const maxChars = 500;

  const handleClose = () => {
    // Reset form
    setPostType('standard');
    setContent('');
    setImages([]);
    setProjectLink('');
    setTags([]);
    setTagInput('');
    setVisibility('all');
    onClose();
  };

  const handleSubmit = () => {
    const projectLinks = projectLink ? [{
      url: projectLink,
      platform: 'github' as const,
      repoName: projectLink.split('/').pop() || 'Repository'
    }] : [];

    onCreatePost({
      type: postType,
      content,
      images,
      projectLinks,
      tags,
      visibility
    });

    handleClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const suggestedTags = ['React', 'Python', 'Docker', 'Help', 'Tutorial', 'Project', 'AI', 'WebDev'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h3>Create Post</h3>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Post Type */}
            <Tabs value={postType} onValueChange={(v: any) => setPostType(v)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="standard">Post</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Content Input */}
            <div className="space-y-2">
              <Label>What's on your mind?</Label>
              <Textarea
                placeholder="Share your thoughts, projects, or questions..."
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {content.length}/{maxChars}
              </p>
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <Label>Images (Optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0066CC] transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Up to 4 images
                </p>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img src={img} alt="" className="w-full h-20 object-cover rounded" />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Link */}
            {(postType === 'project' || postType === 'tutorial') && (
              <div className="space-y-2">
                <Label>Project Link (GitHub, GitLab, etc.)</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="https://github.com/username/repo"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags (Max 5)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  disabled={tags.length >= 5}
                />
                <Button
                  onClick={handleAddTag}
                  disabled={tags.length >= 5 || !tagInput.trim()}
                  style={{ backgroundColor: '#0066CC', color: '#fff' }}
                >
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#0066CC] text-white rounded-full text-sm"
                    >
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Suggested:</span>
                {suggestedTags.filter(t => !tags.includes(t)).slice(0, 5 - tags.length).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => tags.length < 5 && setTags([...tags, tag])}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    disabled={tags.length >= 5}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  {visibility === 'campus' ? `Only ${campusCode} campus` : 'All campuses'}
                </p>
              </div>
              <Switch
                checked={visibility === 'all'}
                onCheckedChange={(checked) => setVisibility(checked ? 'all' : 'campus')}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex items-center justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
              style={{ backgroundColor: '#FF6B35', color: '#fff' }}
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
