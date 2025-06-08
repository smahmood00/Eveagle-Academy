"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { IChild } from "@/lib/db/models/child";

interface AddChildFormProps {
  onBack: () => void;
  onChildAdded: (child: IChild) => void;
}

export function AddChildForm({ onBack, onChildAdded }: AddChildFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validate inputs
    if (!firstName.trim() || !lastName.trim() || !age) {
      setError('Please fill in all fields');
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 4 || ageNum > 25) {
      setError('Please enter a valid age between 5 and 30');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/children', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: ageNum
      });

      onChildAdded(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add child');
      console.error('Error adding child:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-purple-400 hover:text-purple-300 -ml-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Add New Child
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Enter your child's details
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-zinc-200">First Name</Label>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                disabled={isLoading}
                className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-zinc-200">Last Name</Label>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                disabled={isLoading}
                className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="childAge" className="text-zinc-200">Age</Label>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
              <Input
                id="childAge"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                min="5"
                max="18"
                disabled={isLoading}
                className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
        >
          {isLoading ? 'Adding Child...' : 'Add Child'}
        </Button>
      </div>
    </div>
  );
} 