"use client";

import { notFound, useRouter } from "next/navigation";
import { Clock, Book, Wrench, User, CreditCard, Banknote } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LoginFlow } from "@/components/auth/LoginFlow";
import { useAuth } from "@/contexts/AuthContext";
import { PurchaseTypeSelector } from "@/components/checkout/PurchaseTypeSelector";
import { ChildSelector } from "@/components/checkout/ChildSelector";
import { AddChildForm } from "@/components/checkout/AddChildForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { IChild } from "@/lib/db/models/child";

interface Props {
  params: { courseSlug: string };
}

type CheckoutStep = 'login' | 'purchaseType' | 'ageInput' | 'childSelection' | 'addChild' | 'confirmation' | 'payment';

export default function CheckoutPage({ params }: Props) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<CheckoutStep>('login');
  const [age, setAge] = useState<string>('');
  const [selectedChild, setSelectedChild] = useState<IChild | null>(null);
  const [error, setError] = useState<string>('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const router = useRouter();
  const { isAuthenticated, userEmail } = useAuth();

  useEffect(() => {
    async function loadCourse() {
      try {
        const response = await fetch(`/api/courses/${params.courseSlug}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const courseData = await response.json();
        setCourse(courseData);
      } catch (error) {
        console.error("Error loading course:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [params.courseSlug]);

  useEffect(() => {
    if (isAuthenticated) {
      setStep('purchaseType');
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setStep('purchaseType');
  };

  const handlePurchaseTypeSelect = (type: 'myself' | 'child') => {
    if (type === 'myself') {
      setStep('ageInput');
    } else {
      setStep('childSelection');
    }
  };

  const handleAgeSubmit = () => {
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum)) {
      setError('Please enter a valid age');
      return;
    }
    if (ageNum < 13 || ageNum > 120) {
      setError('Please enter an age between 13 and 120');
      return;
    }
    setError('');
    setStep('confirmation');
  };

  const handleChildSelect = (child: IChild) => {
    setSelectedChild(child);
    setStep('confirmation');
  };

  const handleChildAdded = (child: IChild) => {
    setSelectedChild(child);
    setStep('childSelection');
  };

  const handlePaymentMethodSelect = async (method: 'card' | 'fps') => {
    try {
      setPaymentLoading(true);
      setPaymentError('');

      console.log('Selected payment method:', method, {
        courseSlug: params.courseSlug,
        purchaseType: selectedChild ? 'child' : 'myself',
        age: selectedChild ? selectedChild.age : parseInt(age),
        childId: selectedChild?._id,
      });

    } catch (err: any) {
      setPaymentError('Failed to process payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading || !course) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-20">
        <div className="container px-4 mx-auto py-12">
          <div className="max-w-4xl mx-auto text-center">
            Loading...
          </div>
        </div>
      </main>
    );
  }

  const renderStep = () => {
    if (!isAuthenticated) {
      return (
        <LoginFlow 
          onLoginSuccess={handleLoginSuccess}
          redirectPath={`/checkout/${params.courseSlug}`}
          showBackButton={false}
        />
      );
    }

    switch (step) {
      case 'purchaseType':
        return <PurchaseTypeSelector onSelectType={handlePurchaseTypeSelect} />;
      
      case 'ageInput':
        return (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setStep('purchaseType')}
              className="text-purple-400 hover:text-purple-300 -ml-4"
            >
              Back
            </Button>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  What's your age?
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  We use this to personalize your learning experience
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-400 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="age" className="text-zinc-200">Age</Label>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your age"
                    className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              <Button
                onClick={handleAgeSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
              >
                Confirm Details
              </Button>
            </div>
          </div>
        );
      
      case 'childSelection':
        return (
          <ChildSelector
            onBack={() => setStep('purchaseType')}
            onSelectChild={handleChildSelect}
            onAddNewChild={() => setStep('addChild')}
          />
        );
      
      case 'addChild':
        return (
          <AddChildForm
            onBack={() => setStep('childSelection')}
            onChildAdded={handleChildAdded}
          />
        );
      
      case 'confirmation':
        return (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setStep(selectedChild ? 'childSelection' : 'purchaseType')}
              className="text-purple-400 hover:text-purple-300 -ml-4"
            >
              Back
            </Button>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Confirm Purchase
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {selectedChild 
                    ? `Purchasing for ${selectedChild.firstName} ${selectedChild.lastName} (Age: ${selectedChild.age})`
                    : `Purchasing for yourself (Age: ${age})`}
                </p>
              </div>

              <Button
                onClick={() => setStep('payment')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setStep('confirmation')}
              className="text-purple-400 hover:text-purple-300 -ml-4"
            >
              Back
            </Button>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Select Payment Method
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Choose how you'd like to pay
                </p>
              </div>

              {paymentError && (
                <p className="text-sm text-red-400 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {paymentError}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => handlePaymentMethodSelect('card')}
                  disabled={paymentLoading}
                  className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
                  variant="ghost"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <CreditCard className="h-8 w-8 text-purple-400" />
                    <span className="text-lg font-medium">Credit Card</span>
                    <p className="text-sm text-zinc-400">Pay with Visa, Mastercard, etc.</p>
                  </div>
                </Button>

                <Button
                  onClick={() => handlePaymentMethodSelect('fps')}
                  disabled={paymentLoading}
                  className="relative h-auto py-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
                  variant="ghost"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Banknote className="h-8 w-8 text-purple-400" />
                    <span className="text-lg font-medium">FPS</span>
                    <p className="text-sm text-zinc-400">Pay with Hong Kong FPS</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pb-20">
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Checkout Summary
          </h1>

          {/* Course Summary Card */}
          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-500/20 mb-8">
            <div className="flex gap-6">
              {/* Course Image */}
              <div className="relative w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 hidden md:block">
                <Image
                  src={course.cardImage || '/placeholder-course.jpg'}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="text-zinc-400 mb-4 line-clamp-2">{course.overviewDescription}</p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-zinc-300">{course.totalHours} Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-zinc-300">{course.totalClasses} Classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-zinc-300">{course.toolUsed}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-purple-300">${course.price}</span>
                  <span className="text-zinc-400">USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login/Purchase Flow Section */}
          <div className="bg-zinc-900/50 rounded-2xl p-8 border border-purple-500/20">
            {isAuthenticated && userEmail && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-zinc-300">Logged in as: <span className="text-purple-300">{userEmail}</span></span>
                </div>
                {renderStep()}
              </div>
            )}
            {!isAuthenticated && renderStep()}
          </div>
        </div>
      </div>
    </main>
  );
}