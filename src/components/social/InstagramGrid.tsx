"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { InstagramPost } from "@/types";

interface InstagramGridProps {
  posts: InstagramPost[];
  handle?: string;
}

/**
 * Instagram-style grid. Renders a branded "Follow us" prompt when empty.
 * Designed to gracefully handle the transition from placeholder to real content.
 */
export function InstagramGrid({ posts, handle = "@solviacrystals" }: InstagramGridProps) {
  if (posts.length === 0) {
    return (
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <Camera className="w-8 h-8 text-brand-gold/60 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-white mb-3">Follow the Journey</h2>
          <p className="text-brand-silver/60 text-sm mb-6">
            See how our community wears Solvia.
          </p>
          <a
            href={`https://instagram.com/${handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-gold hover:text-white transition-colors uppercase tracking-widest font-medium"
          >
            {handle} &rarr;
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Camera className="w-6 h-6 text-brand-gold/60 mx-auto mb-3" />
          <h2 className="text-2xl font-serif text-white mb-2">On the Wrist</h2>
          <a
            href={`https://instagram.com/${handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-gold hover:text-white transition-colors"
          >
            {handle}
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-sm group"
            >
              <Image
                src={post.image}
                alt={post.caption || "Instagram post"}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
