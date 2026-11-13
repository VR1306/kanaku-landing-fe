import { Fragment, type ReactNode } from "react";

/**
 * Restricted rich text for admin-written copy (FAQ answers): **bold**, [label](https://link, /path or #anchor) and
 * "- " bullet lists. Rendered as React nodes, never as HTML, and only https://, relative or anchor links are
 * allowed, so stored content can't inject markup or `javascript:` URLs.
 */
const SAFE_LINK = /^(https:\/\/|\/(?!\/)|#|mailto:)/i;

function inline(text: string, key: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={`${key}-${i++}`}>{m[1]}</strong>);
    else if (SAFE_LINK.test(m[3]))
      parts.push(
        <a
          key={`${key}-${i++}`}
          href={m[3]}
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          {m[2]}
        </a>,
      );
    else parts.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: number) => {
    if (!list.length) return;
    out.push(
      <ul key={`u${k}`} className="ml-5 list-disc space-y-1">
        {list.map((item, i) => (
          <li key={i}>{inline(item, `l${k}-${i}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const lines = text.split("\n");
  lines.forEach((line, k) => {
    if (/^- /.test(line)) list.push(line.slice(2));
    else {
      flush(k);
      if (line.trim()) out.push(<p key={`p${k}`}>{inline(line, `p${k}`)}</p>);
    }
  });
  flush(lines.length);
  return (
    <div className={className ?? "space-y-2"}>
      {out.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </div>
  );
}
