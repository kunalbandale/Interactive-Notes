import React from 'react';
import { Download, Trash2, Edit } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onDownload: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onDownload }) => {
  return (
    <div
      className="rounded-lg p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: note.color + '40' }}
    >
      <div className="mb-4 min-h-[100px]">
        <p className="whitespace-pre-wrap break-words text-gray-800">{note.content}</p>
      </div>
      <div className="flex justify-between items-center border-t pt-4 mt-2">
        <span className="text-sm text-gray-500">
          {new Date(note.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit note"
          >
            <Edit size={18} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDownload(note)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Download note"
          >
            <Download size={18} className="text-gray-600" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Delete note"
          >
            <Trash2 size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;