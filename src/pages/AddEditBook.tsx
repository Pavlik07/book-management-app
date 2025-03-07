//This page handles adding or editing a book

import React, { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Book } from '../types/types';
import Footer from '../components/Footer';

const AddEditBook: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch book data for editing
      fetch(`http://localhost:3001/books/${id}`)
        .then((res) => res.json())
        .then((data) => setInitialData(data))
        .catch(() => setMessage('Failed to fetch book details.'));
    }
  }, [id]);

  const handleSubmit = async (data: { title: string; author: string; category: string; isbn: string }) => {
    try {
      const url = id ? `http://localhost:3001/books/${id}` : 'http://localhost:3001/books';
      const method = id ? 'PUT' : 'POST';

      // Check if the book is being edited and if there are changes
      const hasChanges =
        id &&
        initialData &&
        (data.title !== initialData.title ||
          data.author !== initialData.author ||
          data.category !== initialData.category ||
          data.isbn !== initialData.isbn);

      const body = {
        ...data,
        createdAt: id ? initialData?.createdAt : new Date().toISOString(), // Preserve createdAt for edits
        modifiedAt: hasChanges ? new Date().toISOString() : initialData?.modifiedAt, // Update modifiedAt only if there are changes
        isActive: true,
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(id ? 'Book updated successfully!' : 'Book added successfully!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('Failed to save book.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Book' : 'Add a Book'}</h1>
      <Link to="/">Back to Dashboard</Link>
      {message && <div className="message">{message}</div>}
      <BookForm onSubmit={handleSubmit} initialData={initialData || undefined} />
      <Footer />
    </div>
  );
};

export default AddEditBook;