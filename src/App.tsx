import { ReviewModal } from './components/ReviewModal';
import { useBooks } from './hooks/useBooks';
import { Header } from './components/Header';
import { AddBookForm } from './components/AddBookForm';
import { ShelfList } from './components/ShelfList';

export default function App() {
  const { 
    booksByCategory, reviewingBook, tempReview, tempRating, actions 
  } = useBooks();


return (
    <div className="app-container">

      <Header />

      <AddBookForm onAdd={actions.addBook} /> 

      <ShelfList 
        booksByCategory={booksByCategory} 
        actions={actions} 
      />

      {reviewingBook && ( 
        <ReviewModal 
          book={reviewingBook}
          tempReview={tempReview}
          tempRating={tempRating}
          onUpdateReview={actions.updateReview}
          onUpdateRating={actions.updateRating}
          onSave={() => actions.submitReview(false)}
          onSkip={() => actions.submitReview(true)}
          onClose={actions.closeReviewModal}
        />
      )}
    </div>
  );
}

