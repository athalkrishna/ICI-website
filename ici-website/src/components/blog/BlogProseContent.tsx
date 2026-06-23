'use client';

import { useEffect, useRef } from 'react';

type BlogProseContentProps = {
  html: string;
  lead?: string;
};

export default function BlogProseContent({ html, lead }: BlogProseContentProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const blocks = article.querySelectorAll('pre');
    const cleanups: (() => void)[] = [];

    blocks.forEach((pre) => {
      if (pre.querySelector('.blog-code-copy')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'blog-code-block';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'blog-code-copy allow-copy';
      button.setAttribute('aria-label', 'Copy code');
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

      const onCopy = async () => {
        const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
        await navigator.clipboard.writeText(code);
        button.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
        window.setTimeout(() => {
          button.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        }, 2000);
      };

      button.addEventListener('click', onCopy);
      wrapper.appendChild(button);
      cleanups.push(() => button.removeEventListener('click', onCopy));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <article ref={articleRef} className="blog-prose">
      {lead && <p className="blog-lead">{lead}</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
