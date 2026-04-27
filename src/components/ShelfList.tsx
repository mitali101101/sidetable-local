import { Reorder } from "framer-motion";
import { SHELF_CONFIG } from '../constants';
import { Shelf } from './Shelf';
import { BookCard } from './BookCard';
import type { Book, Category } from '../types';
import type { BookActions } from "../hooks/useBooks";

interface ShelfListProps {
  booksByCategory: Record<Category, Book[]>;
  actions: BookActions; 
}

export const ShelfList = ({ booksByCategory, actions }: ShelfListProps) => {
  return (
    <main className="main-grid">
        {SHELF_CONFIG.map(({ id, label, icon : Icon }) => (
          <Shelf key={id} title={label} category={id} icon={<Icon size={14} />}>
            <Reorder.Group 
              axis="y" 
              values={booksByCategory[id] || []}
              onReorder={(newOrder) => actions.reorderCategory(id, newOrder)}
              className="space-y-3"
            >
              {(booksByCategory[id] || []).map(book => (
                <Reorder.Item key={book.id} value={book}>
                  <BookCard 
                    book={book} 
                    onMoveForward={id !== 'finished' ? () => actions.moveForward(book.id) : undefined}                    onMoveBackward={id !== 'wishlist' ? () => actions.moveBackward(book.id) : undefined}                    onDelete={() => actions.deleteBook(book.id)}
                    onEditReview={() => actions.editReview(book.id)}                     
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Shelf>
        ))}
      </main> 
  );
};