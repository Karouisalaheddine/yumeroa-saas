// This route is intentionally not exposed — redirect to admin dashboard
import { redirect } from 'next/navigation';
export async function GET() {
  redirect('/admin');
}
