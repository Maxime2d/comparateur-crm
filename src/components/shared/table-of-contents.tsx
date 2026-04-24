"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Sticky Table of Contents — scans the article for h2/h3 headings and
 * highlights the current one as the user scrolls.
 */
export function TableOfContents({ contentRef }: { contentRef?: string }) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = contentRef
      ? document.querySelector(contentRef)
      : document.querySelector("article");
    if (!container) return;
    const headings = container.querySelectorAll("h2, h3");
    const collected: TOCItem[] = [];
    headings.forEach((h) => {
      const id = h.id;
      if (!id) return;
      collected.push({
        id,
        text: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      });
    });
    setItems(collected);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [contentRef]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Sommaire"
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3">
        <List size={14} />
        Sommaire
      </div>
      <ul className="space-y-1 border-l border-slate-200">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
              <a
                href={`#${item.id}`}
                className={`block text-sm pl-3 -ml-px border-l-2 py-1 transition-colors ${
                  isActive
                    ? "border-violet-600 text-violet-700 font-medium"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
