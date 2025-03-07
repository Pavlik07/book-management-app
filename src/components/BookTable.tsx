//This component displays the table of books and handles actions like edit, delete, and deactivate

import React from 'react';
import { format } from 'date-fns';
import { BookTableProps } from '../types/types';
import '../styles/bookTable.css'

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete, onToggleActive }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created At</th>
          <th>Modified At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} style={{ opacity: book.isActive ? 1 : 0.5 }}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.isbn}</td>
            <td>{format(new Date(book.createdAt), 'dd MMMM yyyy, h:mm a')}</td>
            <td>
              {book.modifiedAt ? format(new Date(book.modifiedAt), 'dd MMMM yyyy, h:mm a') : '--'}
            </td>
            <td>
              <button onClick={() => onEdit(book.id)}>Edit</button>
              <button onClick={() => onToggleActive(book.id)}>
                {book.isActive ? 'Deactivate' : 'Re-Activate'}
              </button>
              {!book.isActive && <button onClick={() => onDelete(book.id)}>Delete</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;