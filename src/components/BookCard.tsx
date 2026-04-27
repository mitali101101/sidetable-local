import type { Book } from '../types';
import { ArrowRight, ArrowLeft, Trash2, GripVertical, MessageSquare, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onMoveForward?: () => void;
  onMoveBackward?: () => void;
  onDelete: () => void;
  onEditReview?: () => void;
}

export const BookCard = ({ 
  book, 
  onMoveForward, 
  onMoveBackward, 
  onDelete, 
  onEditReview
}: BookCardProps) => {
  
    const isFinished = book.category === 'finished';

    return (
    <div className="group bg-white p-5 rounded-2xl shadow-sm mb-3 border border-stone-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className="mt-1 text-stone-300 cursor-grab active:cursor-grabbing">
            <GripVertical size={16} />
        </div>
        <div>
          <p className={`font-semibold ${book.category === 'finished' ? 'text-stone-300 line-through' : 'text-[#2C241E]'}`}>
            {book.title}
          </p>

          {isFinished && book.rating ? (
              <div className="flex items-center gap-1 mt-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    fill={i < book.rating! ? "currentColor" : "none"} 
                    className={i >= book.rating! ? "text-stone-200" : ""}
                  />
                ))}
              </div>
            ) : null}

        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button 
          onClick={onDelete}
          className="action-btn hover:bg-red-50 text-red-300"
          title="Delete book"
          >
            <Trash2 size={14} />          
          </button>
          
          {/* Backward Navigation */}
            {onMoveBackward && (
              <button onClick={onMoveBackward} className="action-btn action-btn-move">
                <ArrowLeft size={14} />
              </button>
            )}
            
            {/* Forward Navigation */}
            {onMoveForward && (
              <button onClick={onMoveForward} className="action-btn hover:bg-stone-100 text-amber-600">
                <ArrowRight size={14} />
              </button>
            )}

            {isFinished && (
              <button 
              onClick={onEditReview} 
              className="action-btn hover:bg-amber-50 text-amber-600"
              title="Edit review"
              >
              < MessageSquare size={14} /> 
              </button>
            )}
        </div>
      </div>
      
      {/* REVIEW SNIPPET */}
        {isFinished && book.review && (
          <p className="review-box">
            "{book.review}"
          </p>
        )}
    </div>
  );
};