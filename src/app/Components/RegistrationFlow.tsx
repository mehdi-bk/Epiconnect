import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { campuses } from '../data/campuses';
import { RegistrationData } from '../data/types';
import { ArrowLeft, Check } from 'lucide-react';

interface RegistrationFlowProps {
  onComplete: (data: RegistrationData) => void;
  onBack: () => void;
}

export function RegistrationFlow({ onComplete, onBack }: RegistrationFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    techInterests: [],
    languages: [],
    goals: []
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const techInterestOptions = [
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'AI/ML', 'Game Dev',
    'Cybersecurity', 'Data Science', 'Cloud', 'Blockchain'
  ];

  const languageOptions = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#',
    'Go', 'Rust', 'Swift', 'Kotlin', 'PHP', 'Ruby'
  ];

  const goalOptions = [
    'Help with projects',
    'Share my work',
    'Find collaborators',
    'Learn new skills',
    'Network with peers',
    'Get career advice'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData as RegistrationData);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={step === 1 ? onBack : handlePrevious}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2>Create Your Profile</h2>
              <span className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl p-8 shadow-sm"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-6">Account Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@epitech.eu"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password || ''}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  At least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {/* Google sign up */}}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-6">Campus & Program</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <Select
                  value={formData.campus}
                  onValueChange={(value) => setFormData({ ...formData, campus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your campus" />
                  </SelectTrigger>
                  <SelectContent>
                    {campuses.map((campus) => (
                      <SelectItem key={campus.code} value={campus.code}>
                        {campus.flag} {campus.city}, {campus.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value: any) => setFormData({ ...formData, program: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grande École">Grande École</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Graduation Year</Label>
                <Select
                  value={formData.graduationYear?.toString()}
                  onValueChange={(value) => setFormData({ ...formData, graduationYear: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-6">Tell us about yourself</h3>
              </div>

              <div className="space-y-2">
                <Label>What are your main tech interests?</Label>
                <div className="flex flex-wrap gap-2">
                  {techInterestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        techInterests: toggleArrayItem(formData.techInterests || [], interest)
                      })}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        formData.techInterests?.includes(interest)
                          ? 'bg-[#0066CC] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {formData.techInterests?.includes(interest) && (
                        <Check className="w-3 h-3 inline mr-1" />
                      )}
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current skill level?</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, skillLevel: level as any })}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        formData.skillLevel === level
                          ? 'bg-[#0066CC] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Favorite programming languages?</Label>
                <div className="flex flex-wrap gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        languages: toggleArrayItem(formData.languages || [], lang)
                      })}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        formData.languages?.includes(lang)
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>What are you hoping to find on EpiConnect?</Label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        goals: toggleArrayItem(formData.goals || [], goal)
                      })}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        formData.goals?.includes(goal)
                          ? 'bg-[#2ECC71] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  maxLength={150}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio?.length || 0}/150
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                style={{ backgroundColor: '#FF6B35', color: '#fff' }}
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                style={{ backgroundColor: '#2ECC71', color: '#fff' }}
              >
                Complete Registration
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
