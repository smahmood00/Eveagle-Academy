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
  const { isAuthenticated, userEmail, userId } = useAuth();

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

      if (method === 'card') {
        // Create Stripe checkout session
        const response = await axios.post('/api/payments/stripe/create-session', {
          courseSlug: params.courseSlug,
          purchaseType: selectedChild ? 'child' : 'myself',
          studentId: selectedChild ? selectedChild._id : userId,
        });

        // Redirect to Stripe checkout
        window.location.href = response.data.sessionUrl;
      } else {
        // Handle FPS payment
        console.log('FPS payment selected', {
          courseSlug: params.courseSlug,
          purchaseType: selectedChild ? 'child' : 'myself',
          studentId: selectedChild ? selectedChild._id : userId,
        });
      }
    } catch (err: any) {
      setPaymentError(err.response?.data?.message || 'Failed to process payment. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading || !course) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-purple-500/20 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-zinc-800 rounded w-2/3 mx-auto"></div>
            </div>
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

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Payment Method
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Select your preferred payment method
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-zinc-900/50 rounded-xl p-4 border border-purple-500/20">
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex justify-between">
                    <span>Course:</span>
                    <span className="text-white">{course.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>For:</span>
                    <span className="text-white">
                      {selectedChild 
                        ? `${selectedChild.firstName} ${selectedChild.lastName}`
                        : 'Yourself'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-800 mt-2 pt-2 text-base">
                    <span>Total:</span>
                    <span className="text-white font-medium">HKD {course.price}</span>
                  </div>
                </div>
              </div>

              {paymentError && (
                <p className="text-sm text-red-400 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  {paymentError}
                </p>
              )}

              {/* Payment Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => handlePaymentMethodSelect('fps')}
                  disabled={paymentLoading}
                  className="w-full h-auto py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
                  variant="ghost"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Banknote className="h-5 w-5 text-purple-400" />
                    <span className="text-base font-medium">Pay with FPS</span>
                  </div>
                </Button>

                <Button
                  onClick={() => handlePaymentMethodSelect('card')}
                  disabled={paymentLoading}
                  className="w-full h-auto py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20"
                  variant="ghost"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <CreditCard className="h-5 w-5 text-purple-400" />
                    <span className="text-base font-medium">Pay with Card</span>
                  </div>
                </Button>
              </div>

              {/* Payment Notes */}
              <div className="text-xs text-zinc-500 space-y-1">
                <p>• All payments are processed securely</p>
                <p>• FPS payments are processed in HKD</p>
                <p>• Card payments are processed in HKD</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Course Info */}
          <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20 mb-6 sm:mb-8">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative aspect-video sm:aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                <Image
                  src={course.cardImage || '/placeholder-course.jpg'}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {course.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {course.totalHours} Hours
                  </span>
                  <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs sm:text-sm">
                    <Book className="w-3 h-3 sm:w-4 sm:h-4" />
                    {course.totalClasses} Classes
                  </span>
                  <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm">
                    <Wrench className="w-3 h-3 sm:w-4 sm:h-4" />
                    {course.toolUsed}
                  </span>
                </div>

                <div className="pt-2 sm:pt-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    HKD {course.price}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    One-time payment • Lifetime access
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Steps */}
          <div className="bg-zinc-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
            {renderStep()}
          </div>
        </div>
      </div>
    </main>
  );
}