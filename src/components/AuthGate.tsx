import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface AuthGateProps {
  children: React.ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setIsAuthed(!!data.session);
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
    });

    init();

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Sign in to continue</h2>
          <button onClick={signInWithGoogle} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-3 right-3 z-50">
        <button onClick={signOut} className="px-3 py-2 text-sm bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30">
          Sign out
        </button>
      </div>
      {children}
    </div>
  );
}
