import { login, signup } from '@/app/login/actions';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col justify-center items-center p-4">
      
      {/* Card */}
      <div className="w-full max-w-[420px] bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-[#c2703e] via-[#d4864e] to-[#c2703e]" />
        
        <div className="p-8 sm:p-10">
          {/* Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
                <span className="text-white font-serif text-sm font-bold leading-none">Y</span>
              </div>
              <span className="font-serif text-2xl text-stone-900 tracking-tight font-medium">Yumeroa</span>
            </Link>
            <h1 className="text-xl font-serif text-stone-900">Welcome back</h1>
            <p className="text-sm text-stone-400 mt-1.5">Sign in to your partner or admin dashboard</p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-[#c2703e] hover:text-[#a85d32] transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white focus:border-transparent transition-all text-sm"
              />
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                formAction={login}
                className="w-full bg-stone-900 text-white font-semibold py-3 rounded-lg hover:bg-stone-800 transition-all text-sm shadow-sm"
              >
                Sign In
              </button>
              <button
                formAction={signup}
                className="w-full bg-white text-stone-600 border border-stone-200 font-medium py-3 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all text-sm"
              >
                Request Partner Access
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Back to site */}
      <Link
        href="/"
        className="mt-6 text-xs text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1.5"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Yumeroa.com
      </Link>
    </div>
  );
}
