"use client";

import Link from "next/link";
import { ArrowLeft, Mail, User, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Configure axios defaults
axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const OTP_RESEND_TIMEOUT = 30;

interface LoginFlowProps {
  onLoginSuccess?: () => void;
  redirectPath?: string;
  showBackButton?: boolean;
}

export function LoginFlow({ 
  onLoginSuccess, 
  redirectPath = '/dashboard',
  showBackButton = true,
}: LoginFlowProps) {
  const { login } = useAuth();
  const [step, setStep] = useState('initialOptions');
  const [email, setEmail] = useState('');
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(4).fill(''));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(OTP_RESEND_TIMEOUT);
  const [isResendActive, setIsResendActive] = useState(false);
  const router = useRouter();
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push(redirectPath);
      }
    }
  }, [router, redirectPath, onLoginSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendActive(false);
      setCountdown(OTP_RESEND_TIMEOUT);
    }
    return () => clearTimeout(timer);
  }, [isResendActive, countdown]);

  const startResendTimer = () => {
    setCountdown(OTP_RESEND_TIMEOUT);
    setIsResendActive(true);
  };

  const handleInitiateOtp = async (currentEmail: string) => {
    if (!currentEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/initiate', { email: currentEmail });
      setStep('otpVerification');
      startResendTimer();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error sending OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    const currentOtp = otpInputs.join('');
    if (currentOtp.length !== 4 || !/^\d{4}$/.test(currentOtp)) {
      setError('Please enter a valid 4-digit OTP.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/verify-otp', { email, otp: currentOtp });
      
      if (response.data.isExistingUser) {
        login(email, response.data.token);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push(redirectPath);
        }
      } else {
        setStep('profileCompletion');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error verifying OTP. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCompleteProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      console.log('Sending complete profile request:', { email, firstName, lastName });
      const response = await axios.post('/api/auth/complete-profile', { 
        email, 
        firstName, 
        lastName 
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Complete profile response:', response.data);
      
      if (response.data.token) {
        login(email, response.data.token);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push(redirectPath);
        }
      } else {
        throw new Error('No token received from server');
      }
    } catch (err: any) {
      console.error('Complete profile error:', err.response || err);
      setError(err.response?.data?.message || 'Error completing profile. Please try again.');
    }
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    if (!isResendActive) {
      handleInitiateOtp(email);
    }
  };

  const handleOtpInputChange = (index: number, value: string) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value.replace(/\D/g, '').slice(0, 1);
    setOtpInputs(newOtpInputs);

    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpInputs[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur"></div>
        <div className="relative rounded-xl bg-zinc-800/50 backdrop-blur-md border border-zinc-700/50 p-6 shadow-lg sm:p-8">
          {showBackButton && (
            <Link href="/" className="flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          )}

          <div className="flex flex-col space-y-2 text-center mt-4">
            <div className="relative mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-sm"></div>
              <div className="relative bg-zinc-900/50 p-2 rounded-full">
                <User className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {step === 'profileCompletion' ? 'Complete Your Profile' : 
               step === 'otpVerification' ? 'Verify Your Email' :
               step === 'emailEntry' ? 'Enter Your Email' :
               'Parent Access'}
            </h1>
            {step === 'initialOptions' && (
              <p className="text-sm text-zinc-400">Monitor your child's progress and manage their account</p>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}

          <div className="mt-6">
            {step === 'initialOptions' && (
              <div className="space-y-4">
                <Button 
                  onClick={() => setStep('emailEntry')} 
                  className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Mail className="mr-2 h-4 w-4" /> Email Sign Up / Log In
                  </span>
                </Button>
              </div>
            )}

            {step === 'emailEntry' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-input" className="text-zinc-200">Email Address</Label>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                    <Input 
                      id="email-input" 
                      type="email" 
                      placeholder="parent@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleInitiateOtp(email)} 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => { setError(''); setStep('initialOptions');}} 
                  className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                >
                  Back
                </Button>
              </div>
            )}

            {step === 'otpVerification' && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400 text-center">
                  Enter the 4-digit OTP sent to <span className="font-medium text-white">{email}</span>
                </p>
                <div className="space-y-2">
                  <Label htmlFor="otp-input-0" className="text-zinc-200">OTP</Label>
                  <div className="flex justify-between space-x-2">
                    {otpInputs.map((digit, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                        <Input
                          id={`otp-input-${index}`}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpInputChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="relative w-12 h-12 text-center text-lg bg-zinc-900/50 border-zinc-700/50 text-white focus:border-purple-500 focus:ring-purple-500/20"
                          disabled={isLoading}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={handleVerifyOtp} 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0" 
                  disabled={isLoading || otpInputs.join('').length !== 4}
                >
                  {isLoading ? 'Verifying...' : 'Next'}
                </Button>
                <div className="flex justify-between items-center text-xs">
                  <Button 
                    variant="link" 
                    onClick={() => { setError(''); setOtpInputs(Array(4).fill('')); setStep('emailEntry');}} 
                    className="p-0 h-auto text-purple-400 hover:text-purple-300"
                  >
                    Back
                  </Button>
                  <Button 
                    variant="link" 
                    onClick={handleResendOtp} 
                    disabled={isResendActive || isLoading}
                    className="p-0 h-auto text-purple-400 hover:text-purple-300 disabled:opacity-50"
                  >
                    <RotateCcw className={`mr-1 h-3 w-3 ${isResendActive ? 'animate-spin' : ''}`} />
                    Resend OTP {isResendActive ? `(${countdown}s)` : ''}
                  </Button>
                </div>
              </div>
            )}

            {step === 'profileCompletion' && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-400 text-center">
                  Nice to meet you! Please complete your profile.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-zinc-200">Parent First Name *</Label>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                    <Input 
                      id="firstName" 
                      type="text" 
                      placeholder="Tai Man" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                      className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-zinc-200">Parent Last Name *</Label>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                    <Input 
                      id="lastName" 
                      type="text" 
                      placeholder="Chan" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                      className="relative bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleCompleteProfile} 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 border-0" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Continue'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 