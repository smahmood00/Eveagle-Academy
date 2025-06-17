import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { connectToDB } from '@/lib/db/connect';
import { Admin } from '@/lib/db/models/admin';

export async function verifyAdminAuth(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token');

    if (!token) {
      return null;
    }

    const decoded = verify(token.value, process.env.JWT_SECRET!) as { id: string };
    
    await connectToDB();
    
    // Verify admin exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return null;
    }

    return decoded.id;
  } catch (error) {
    return null;
  }
} 