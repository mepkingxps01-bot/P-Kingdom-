"use client";

import { useAuth } from "./AuthProvider";

export function AccountBadge() {
  const { user, signOut } = useAuth();
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:inline text-xs text-slate-400 max-w-[14rem] truncate" title={user.email ?? ""}>
        {user.email}
      </span>
      <button
        onClick={signOut}
        className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-full px-3 py-1.5 transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}
