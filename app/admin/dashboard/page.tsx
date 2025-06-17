'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface PendingEnrollment {
  _id: string;
  courseId: {
    title: string;
    _id: string;
  };
  studentId: {
    firstName: string;
    lastName: string;
    _id: string;
  };
  paymentId: {
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    _id: string;
  };
}

export default function AdminDashboardPage() {
  const [pendingEnrollments, setPendingEnrollments] = useState<PendingEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingEnrollments();
  }, []);

  const fetchPendingEnrollments = async () => {
    try {
      const response = await axios.get('/api/admin/pending-enrollments');
      setPendingEnrollments(response.data.enrollments);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/admin');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch pending enrollments',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (paymentId: string) => {
    setProcessingId(paymentId);
    try {
      await axios.post('/api/payments/fps/verify', { paymentId });
      toast({
        title: 'Success',
        description: 'Payment verified successfully',
      });
      fetchPendingEnrollments(); // Refresh the list
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to verify payment',
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
        <div className="container px-4 sm:px-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white pt-24 sm:pt-28 pb-20">
      <div className="container px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Pending FPS Enrollments
          </h1>

          {pendingEnrollments.length === 0 ? (
            <div className="bg-zinc-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 text-center">
              <p className="text-zinc-400">No pending enrollments to verify</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingEnrollments.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="bg-zinc-900/50 backdrop-blur-md border border-purple-500/20 rounded-xl p-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-purple-400">
                        {enrollment.courseId.title}
                      </h3>
                      <p className="text-zinc-400">
                        Student: {enrollment.studentId.firstName} {enrollment.studentId.lastName}
                      </p>
                      <p className="text-zinc-400">
                        Amount: {enrollment.paymentId.currency} {enrollment.paymentId.amount}
                      </p>
                      <p className="text-zinc-400">
                        Created: {formatDate(enrollment.paymentId.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        onClick={() => handleVerify(enrollment.paymentId._id)}
                        disabled={processingId === enrollment.paymentId._id}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        {processingId === enrollment.paymentId._id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                        )}
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 