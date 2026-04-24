import React from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

// Components rendered inside MDX articles. Keeps content files to pure
// Markdown while letting us override built-in HTML tags for consistent
// styling (no inline style="" allowed in authored MDX).

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl font-bold text-slate-900 mt-10 mb-6 tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="text-3xl font-bold text-slate-900 mt-12 mb-5 tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = typeof children === "string" ? children : "";
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-slate-900 mt-8 mb-3 tracking-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-slate-700 leading-relaxed mb-5" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 text-slate-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 text-slate-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }) => {
    const isExternal =
      typeof href === "string" &&
      (href.startsWith("http") || href.startsWith("//"));
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-violet-600 hover:text-violet-700 underline underline-offset-2"
      >
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-violet-400 bg-violet-50/50 pl-5 pr-4 py-3 my-6 italic text-slate-700 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-slate-100 text-violet-700 px-1.5 py-0.5 rounded text-[0.9em] font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto my-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-slate-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-3 text-sm text-slate-700 border-t border-slate-100"
      {...props}
    >
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-slate-200" />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props}>
      {children}
    </strong>
  ),
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
