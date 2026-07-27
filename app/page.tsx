import Link from "next/link";

const topics = [
  {
    id: "cornea",
    name: "Cornea",
    description: "Anatomy, disease & surgery of the cornea",
    books: 2,
    xp: 0,
    level: 1,
    gradient: "from-cyan-950 to-slate-900",
    accent: "text-cyan-300",
    border: "border-cyan-800/40",
    badge: "bg-cyan-900/50 text-cyan-300",
    bar: "bg-cyan-500/60",
    icon: "🔷",
    xpTarget: 150,
  },
  {
    id: "retina",
    name: "Retina",
    description: "Anatomy, disease & surgery of the retina",
    books: 2,
    xp: 0,
    level: 1,
    gradient: "from-amber-950 to-slate-900",
    accent: "text-amber-300",
    border: "border-amber-800/40",
    badge: "bg-amber-900/50 text-amber-300",
    bar: "bg-amber-500/60",
    icon: "🔶",
    xpTarget: 150,
  },
  {
    id: "basic-science",
    name: "Basic Science",
    description: "Anatomy, physiology, optics & pharmacology",
    books: 1,
    xp: 0,
    level: 1,
    gradient: "from-violet-950 to-slate-900",
    accent: "text-violet-300",
    border: "border-violet-800/40",
    badge: "bg-violet-900/50 text-violet-300",
    bar: "bg-violet-500/60",
    icon: "🔬",
    xpTarget: 150,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">P-Kingdom</h1>
          <p className="text-sm text-slate-400 mt-0.5">Study. Recall. Build your kingdom.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-1.5">
          <span className="text-yellow-400 text-sm">⚔</span>
          <span className="text-sm font-medium">0 XP</span>
        </div>
      </header>

      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6">
          Your Library
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/topic/${topic.id}`}>
              <div
                className={`group relative rounded-2xl border ${topic.border} bg-gradient-to-br ${topic.gradient} p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${topic.badge}`}>
                    Lv. {topic.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-1">{topic.name}</h3>
                <p className="text-sm text-slate-400 mb-5">{topic.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{topic.books} {topic.books === 1 ? "book" : "books"}</span>
                  <span className={topic.accent}>{topic.xp} XP</span>
                </div>

                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${topic.bar} transition-all duration-700`}
                    style={{ width: `${Math.min((topic.xp / topic.xpTarget) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-1.5">
                  {topic.xp} / {topic.xpTarget} XP to next level
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
