"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getTopic } from "@/lib/topics";

type Book = {
  id: string;
  title: string;
  author: string;
  edition: string;
  cover: string;
  chapters: number;
  questions: number;
  tag: string;
};

const BOOKS_BY_TOPIC: Record<string, Book[]> = {
  cornea: [
    {
      id: "cornea-mannis",
      title: "Cornea: Fundamentals, Diagnosis and Management",
      author: "Mannis & Holland",
      edition: "5th Edition",
      cover: "/books/cornea-mannis.jpg",
      chapters: 0,
      questions: 0,
      tag: "Core Textbook",
    },
  ],
  retina: [
    {
      id: "ryans-retina",
      title: "Ryan's Retina",
      author: "Sadda, Sarraf, Freund et al.",
      edition: "7th Edition",
      cover: "/books/ryans-retina.jpg",
      chapters: 0,
      questions: 0,
      tag: "Core Textbook",
    },
    {
      id: "bcsc-retina",
      title: "BCSC Section 12: Retina and Vitreous",
      author: "American Academy of Ophthalmology",
      edition: "2023–2024",
      cover: "/books/bcsc-retina.jpg",
      chapters: 0,
      questions: 0,
      tag: "Board Review",
    },
  ],
};

export default function BooksPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "cornea";
  const topic = getTopic(id);
  const books = BOOKS_BY_TOPIC[topic.id] ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <Link href={`/topic/${topic.id}`} className="text-slate-400 hover:text-white transition-colors text-sm">
          ← {topic.name}
        </Link>
        <span className="text-slate-700">|</span>
        <h1 className="text-lg font-semibold">Choose a Book</h1>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-sm text-slate-400 mb-8">
          Select a textbook to start your recall session and build your kingdom.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <Link key={book.id} href={`/topic/${topic.id}/books/${book.id}`}>
              <div className="group cursor-pointer">
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 mb-3 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:shadow-slate-950/60 group-hover:border-slate-700`}>
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl mb-1">📖</span>
                    <span className={`text-xs ${topic.accentText} font-medium`}>Start Reading</span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs ${topic.badge} px-2 py-0.5 rounded-full backdrop-blur-sm`}>
                      {book.tag}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-semibold leading-tight">{book.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{book.author}</p>
                <p className="text-xs text-slate-600 mt-0.5">{book.edition}</p>
              </div>
            </Link>
          ))}

          <div className="group cursor-pointer opacity-40 hover:opacity-60 transition-opacity">
            <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 mb-3 flex flex-col items-center justify-center gap-2">
              <span className="text-3xl text-slate-600">+</span>
              <span className="text-xs text-slate-500">Add book</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
