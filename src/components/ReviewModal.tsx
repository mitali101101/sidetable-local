import type { Book } from '../types';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReviewModalProps {
  book: Book;
  tempReview: string;
  tempRating: number;
  onUpdateReview: (text: string) => void;  
  onUpdateRating: (rating: number) => void;
  onSave: () => void;
  onSkip: () => void;
  onClose: () => void;
}

export const ReviewModal = ({ book, tempReview, tempRating, onUpdateReview, onUpdateRating, onSave, onSkip }: ReviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-stone-100">
        <h3 className="text-2xl font-serif font-bold text-[#2C241E] mb-1">Finish "{book.title}"</h3>
        <p className="text-stone-500 text-sm mb-6">Capture a final thought for your shelf.</p>
        
        <div className="flex gap-2 mb-4 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onUpdateRating(star)}
              className={cn(
                "transition-all transform hover:scale-110",
                star <= tempRating ? "text-amber-400" : "text-stone-200"
              )}
            >
              <Star size={28} fill={star <= tempRating ? "currentColor" : "none"} />
            </button>
          ))}
        </div>

        <textarea 
          autoFocus
          className="w-full h-32 p-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-emerald-100 resize-none mb-6 outline-none text-stone-700"
          placeholder="What did you learn?..."
          value={tempReview}
          onChange={(e) => onUpdateReview(e.target.value)}
        />
        
        <div className="flex gap-3">
          <button onClick={onSkip} className="flex-1 py-3 rounded-xl font-semibold text-stone-400 hover:bg-stone-50 transition">
            Skip
          </button>
          <button onClick={onSave} className="flex-1 py-3 bg-[#2C241E] text-white rounded-xl font-semibold hover:bg-black transition shadow-lg">
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
};