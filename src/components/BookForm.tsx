//This component handles the form for adding and editing a book

import React, { useState, useEffect } from 'react';
import { BookFormProps } from '../types/types';
import '../styles/bookForm.css'

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fill the form with previous data
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        category: initialData.category,
        isbn: initialData.isbn,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.isbn) newErrors.isbn = 'ISBN is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div>
        <label>Author</label>
        <input
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div>
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      <div>
        <label>ISBN</label>
        <input
          type="number"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        />
        {errors.isbn && <span className="error">{errors.isbn}</span>}
      </div>
      <button type="submit">{initialData ? 'Edit Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;