import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/types';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: 'default' | 'featured';
}

export function BlogCard({ post, index = 0, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <motion.a
      href={post.link || 'https://medium.com/@jono_12764'}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group cursor-pointer block',
        isFeatured && 'md:grid md:grid-cols-5 md:gap-8 items-center'
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cover image */}
      <div className={cn(
        'relative aspect-[16/9] rounded-2xl overflow-hidden mb-5',
        isFeatured && 'md:aspect-[4/3] md:col-span-2 md:mb-0'
      )}>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-100 to-warm-200">
            <span className="text-6xl font-light text-ink-200 select-none">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isFeatured && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-copper-600 text-white text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className={cn('flex flex-col', isFeatured && 'md:col-span-3')}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-caption uppercase tracking-[0.1em] text-copper-600">
            {post.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-ink-300" />
          <span className="flex items-center gap-1 text-xs text-ink-400">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          'font-semibold text-ink-900 tracking-tight mb-3 group-hover:text-copper-700 transition-colors duration-300',
          isFeatured ? 'text-2xl lg:text-3xl' : 'text-lg'
        )}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-ink-500 text-body-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Read more */}
        <div className="mt-auto flex items-center gap-2 text-sm font-medium text-ink-700 
                        group-hover:text-copper-600 transition-colors duration-300">
          <span>Read article</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        {/* Date */}
        <div className="mt-4 pt-4 border-t border-ink-100">
          <span className="text-xs text-ink-400">
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
