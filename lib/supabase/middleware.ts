import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAccessingProtected =
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/partner');

  if (!user && isAccessingProtected) {
    if (process.env.NODE_ENV !== 'production') {
      // Allow local dev access for previewing UI
    } else {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Fetch the role from our public users table
  let role = 'USER';
  if (user && user.email) {
    // Queries Next.js cache / Supabase REST for the user row
    const { data: dbUser } = await supabase
      .from('users')
      .select('role')
      .eq('email', user.email)
      .single();
    
    if (dbUser?.role) {
      role = dbUser.role;
    }
  }

  // Handle RBAC Routing
  if (user) {
    const isPartnerRoute = request.nextUrl.pathname.startsWith('/partner');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = request.nextUrl.pathname === '/login';

    const isPartnerRole = role === 'PARTNER';
    const isAdminRole = role === 'ADMIN' || role === 'EDITOR'; // Editors also get admin access

    // If logged in user hits /login, route them to their respective dashboard
    if (isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = isAdminRole ? '/admin' : isPartnerRole ? '/partner' : '/';
      return NextResponse.redirect(url);
    }

    // Block Partners from Admin
    if (isAdminRoute && !isAdminRole) {
      if (process.env.NODE_ENV === 'production') {
        const url = request.nextUrl.clone();
        url.pathname = isPartnerRole ? '/partner' : '/';
        return NextResponse.redirect(url);
      }
    }

    // Block Admins/Users from Partner unless they are Partners (Admins could arguably view it but we enforce strict separation)
    if (isPartnerRoute && !isPartnerRole && !isAdminRole) {
      if (process.env.NODE_ENV === 'production') {
        const url = request.nextUrl.clone();
        url.pathname = isAdminRole ? '/admin' : '/';
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
