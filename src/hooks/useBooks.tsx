import { useState, useMemo, useEffect } from 'react';
import type { Book, Category } from '../types';
import { CATEGORY_SEQUENCE } from '../constants';

export type BookActions = ReturnType<typeof useBooks>['actions'];

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('sidetable-books');
    return saved ? JSON.parse(saved) : [];
  });
  const [reviewingBook, setReviewingBook] = useState<Book | null>(null);
  const [tempReview, setTempReview] = useState('');
  const [tempRating, setTempRating] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('sidetable-books', JSON.stringify(books));
  }, [books]);

  // OPTIMIZATION: Filter books by category once per render
  const booksByCategory = useMemo(() => {
    // We reduce the main array into a "Map" of categories
    return books.reduce((acc, book) => {
      if (!acc[book.category]) acc[book.category] = [];
      acc[book.category].push(book);
      return acc;
    }, {} as Record<Category, Book[]>);
  }, [books]);

  // --- ACTIONS API ---
  const actions = {

    addBook: (title: string) => {
      const newBook: Book = { id: crypto.randomUUID(), title, category: 'wishlist' };
      setBooks(prev => [newBook, ...prev]);
    },

    moveForward: (id: string) => {
      const book = books.find(b => b.id === id);
      if (book?.category === 'reading') {
        setReviewingBook(book); // Opens modal automatically
      } else {
        updateCategory(id, 'forward');
      }
    },

    moveBackward: (id: string) => updateCategory(id, 'backward'),

    reorderCategory: (category: Category, newOrder: Book[]) => {
      setBooks(prev => [
        ...newOrder,
        ...prev.filter(b => b.category !== category)
      ]);
    },

    updateReview: (text: string) => setTempReview(text),
    updateRating: (rating: number) => setTempRating(rating),

    submitReview: (isSkip: boolean = false) => {
      if (!reviewingBook) return;
      setBooks(prev => prev.map(b => 
        b.id === reviewingBook.id 
          ? { ...b, category: 'finished', review: isSkip ? '' : tempReview, rating: isSkip ? 0 : tempRating } 
          : b
      ));
      setReviewingBook(null);
      setTempReview('');
      setTempRating(0);
    },

    editReview: (id: string) => {
      const book = books.find(b => b.id === id);
      if (book) {
        setReviewingBook(book);
        setTempReview(book.review || ''); // Load existing text into the editor
      }
    },

    closeReviewModal: () => {
      setReviewingBook(null);
      setTempReview('');
      setTempRating(0);
    },

    deleteBook: (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  },
  };

  // Helper function (private to the hook)
  function updateCategory(id: string, dir: 'forward' | 'backward') {
    setBooks(prev => prev.map(book => {
      if (book.id !== id) return book;
      const currentIndex = CATEGORY_SEQUENCE.indexOf(book.category);
      const nextIndex = dir === 'forward' ? currentIndex + 1 : currentIndex - 1;
      const nextCategory = CATEGORY_SEQUENCE[nextIndex];
      return nextCategory ? { ...book, category: nextCategory } : book;
    }));
  }

  /*
  // --- PERSISTENCE ---
  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem('sidetable-books');
    if (saved) setBooks(JSON.parse(saved));
  }, []);

  // Save on every change
  useEffect(() => {
    localStorage.setItem('sidetable-books', JSON.stringify(books));
  }, [books]);*/


  return {
    booksByCategory,
    reviewingBook,
    tempReview,
    tempRating,
    actions
  };
};