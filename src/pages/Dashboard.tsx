//This page displays the table and filter functionality

import React, { useState, useEffect } from 'react';
import BookTable from '../components/BookTable';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Book } from '../types/types';
import '../styles/dashboard.css'

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState('active');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  // Clear the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      setMessage('Failed to fetch books.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/books/${id}`, { method: 'DELETE' });
      setMessage('Book deleted successfully.');
      fetchBooks();
    } catch (error) {
      setMessage('Failed to delete book.');
    }
  };

  const handleToggleActive = async (id: number) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      try {
        await fetch(`http://localhost:3001/books/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: !book.isActive, modifiedAt: new Date().toISOString() }),
        });
        setMessage(`Book ${book.isActive ? 'deactivated' : 'reactivated'} successfully.`);
        fetchBooks();
      } catch (error) {
        setMessage('Failed to update book status.');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const filteredBooks = books.filter((book) => {
    if (filter === 'all') return true;
    if (filter === 'active') return book.isActive;
    if (filter === 'deactivated') return !book.isActive;
    return true;
  });

  const totalNumberOfRecordsInDB = books.length;
  const numberOfRecordsWhichAreShowingBasedOnFilterSelection = filteredBooks.length;

  return (
    <div className="container">
      <h1 className='title'>Dashboard</h1>
      <Link to="/add" className='addABook'>Add a Book</Link>
      <div className='filterAndInfo'>
        <select className='selection' value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="deactivated">Show Deactivated</option>
        </select>
        <span className='showingInfo'>
          Showing {numberOfRecordsWhichAreShowingBasedOnFilterSelection} of {totalNumberOfRecordsInDB}
        </span>
      </div>
      <BookTable
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
      {message && <div className="message">{message}</div>}
      <Footer />
    </div>
  );
};

export default Dashboard;