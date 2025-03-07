export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    createdAt: string;
    modifiedAt: string;
    isActive: boolean;
}

export interface BookTableProps {
  books: Book[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number) => void;
}

export interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: { title: string; author: string; category: string; isbn: string }) => void;
}