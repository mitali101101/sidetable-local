import type { ReactNode } from 'react';
import type { Category } from '../types';
import { cn } from '../lib/utils';

interface ShelfProps {
  title: string;
  icon: ReactNode;
  category: Category;
  children: ReactNode;
}

const shelfVariants = {
  wishlist: "border-dashed border-stone-200 bg-transparent",
  reading: "bg-amber-50/30 border-amber-100/50 shadow-inner",
  finished: "bg-stone-100/40 border-stone-200/60"
};

export const Shelf = ({ title, icon, category, children }: ShelfProps) => {

  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 font-bold tracking-widest text-[10px] uppercase text-stone-400">
        {icon} {title}
      </h2>
        <div className={cn(
        "min-h-[450px] rounded-[2.5rem] border-2 p-5 transition-all duration-500",
        shelfVariants[category]
        )}>        
        {children}
      </div>
    </section>
  );
};