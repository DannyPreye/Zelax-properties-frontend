'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/animations';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // Add reading progress indicator
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

      const progressBar = document.getElementById('reading-progress');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-16 left-0 right-0 h-1 bg-muted z-50">
        <motion.div
          id="reading-progress"
          className="h-full bg-primary"
          initial={{ width: 0 }}
        />
      </div>
      <motion.div
        variants={scrollReveal}
        initial="hidden"
        animate="visible"
        dangerouslySetInnerHTML={{
          __html: content
            .split('\n')
            .map((line) => {
              if (line.startsWith('# ')) {
                return `<h1 class="text-4xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`;
              }
              if (line.startsWith('## ')) {
                return `<h2 class="text-3xl font-bold mt-6 mb-3">${line.slice(3)}</h2>`;
              }
              if (line.startsWith('### ')) {
                return `<h3 class="text-2xl font-semibold mt-4 mb-2">${line.slice(4)}</h3>`;
              }
              if (line.trim() === '') {
                return '<br />';
              }
              return `<p class="mb-4 leading-relaxed">${line}</p>`;
            })
            .join(''),
        }}
      />
    </>
  );
}








