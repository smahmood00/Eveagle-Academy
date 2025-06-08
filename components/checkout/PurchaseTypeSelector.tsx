"use client";

import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface PurchaseTypeSelectorProps {
  onSelectType: (type: 'myself' | 'child') => void;
}

export function PurchaseTypeSelector({ onSelectType }: PurchaseTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Who is this course for?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() => onSelectType('myself')}
          className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
          variant="ghost"
        >
          <div className="flex flex-col items-center space-y-2">
            <User className="h-8 w-8 text-purple-400" />
            <span className="text-lg font-medium">Buy for Myself</span>
            <p className="text-sm text-zinc-400">I want to take this course</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelectType('child')}
          className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
          variant="ghost"
        >
          <div className="flex flex-col items-center space-y-2">
            <Users className="h-8 w-8 text-purple-400" />
            <span className="text-lg font-medium">Buy for Child</span>
            <p className="text-sm text-zinc-400">I'm purchasing for my child</p>
          </div>
        </Button>
      </div>
    </div>
  );
} 