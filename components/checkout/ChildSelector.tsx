"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, User } from "lucide-react";
import { IChild } from "@/lib/db/models/child";
import axios from "axios";

interface ChildSelectorProps {
  onBack: () => void;
  onSelectChild: (child: IChild) => void;
  onAddNewChild: () => void;
}

interface ChildResponse extends Omit<IChild, '_id'> {
  _id: string;
}

export function ChildSelector({ onBack, onSelectChild, onAddNewChild }: ChildSelectorProps) {
  const [children, setChildren] = useState<ChildResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('/api/children');
        setChildren(response.data);
      } catch (err: any) {
        setError('Failed to load children');
        console.error('Error fetching children:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildren();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

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
            Select a Child
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Choose an existing child or add a new one
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-400 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child) => (
            <Button
              key={child._id}
              onClick={() => onSelectChild(child as unknown as IChild)}
              className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
              variant="ghost"
            >
              <div className="flex flex-col items-center space-y-2">
                <User className="h-8 w-8 text-purple-400" />
                <span className="text-lg font-medium">
                  {child.firstName} {child.lastName}
                </span>
                <p className="text-sm text-zinc-400">Age: {child.age}</p>
              </div>
            </Button>
          ))}

          <Button
            onClick={onAddNewChild}
            className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 border-dashed"
            variant="ghost"
          >
            <div className="flex flex-col items-center space-y-2">
              <Plus className="h-8 w-8 text-purple-400" />
              <span className="text-lg font-medium">Add New Child</span>
              <p className="text-sm text-zinc-400">Register a new child</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
} 