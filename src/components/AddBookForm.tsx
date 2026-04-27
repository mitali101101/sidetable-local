import { Plus } from 'lucide-react';

interface AddBookFormProps {
  onAdd: (title: string) => void;
}

export const AddBookForm = ({ onAdd }: AddBookFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    
    if (title.trim()) {
      onAdd(title);
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <input 
        name="title" 
        placeholder="What are you reading next?" 
        className="flex-1 bg-transparent outline-none px-2"
      />
      <button type="submit" className="btn-primary p-2 rounded-xl">
        <Plus size={20} />
      </button>
    </form>
  );
};