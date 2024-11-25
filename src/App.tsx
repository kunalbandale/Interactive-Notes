import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Trash2, Save } from 'lucide-react';
import { Note } from './types';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import AppIcon from './components/AppIcon';
import { generateNoteImage } from './utils/cardGenerator';

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentNote, setCurrentNote] = useState<Note>({
    id: '',
    content: '',
    color: '#FFD1DC',
    createdAt: new Date(),
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const colors = [
    '#FFD1DC', // Pastel Pink
    '#B4F8C8', // Mint Green
    '#A0E7E5', // Light Blue
    '#FFBE86', // Peach
    '#FBE7C6', // Cream
  ];

  const handleSave = () => {
    if (!currentNote.content.trim()) return;
    
    const newNote = {
      ...currentNote,
      id: currentNote.id || Date.now().toString(),
      createdAt: currentNote.id ? currentNote.createdAt : new Date(),
    };

    setNotes(prev => 
      currentNote.id 
        ? prev.map(note => note.id === currentNote.id ? newNote : note)
        : [newNote, ...prev]
    );
    setCurrentNote({
      id: '',
      content: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date(),
    });
  };

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
  };

  const handleDownload = async (note: Note) => {
    const imageUrl = await generateNoteImage(note);
    const link = document.createElement('a');
    link.download = `flashcard-${new Date(note.createdAt).toLocaleDateString().replace(/\//g, '-')}.png`;
    link.href = imageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AppIcon />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Interactive Notes</h1>
          <p className="text-gray-600">Capture your thoughts in beautiful flash cards</p>
        </div>

        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <textarea
            value={currentNote.content}
            onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
            placeholder="Start typing your note..."
            className="w-full h-32 p-4 mb-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{ backgroundColor: currentNote.color + '40' }}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setCurrentNote({...currentNote, color})}
                  className={`w-6 h-6 rounded-full ${currentNote.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              {currentNote.id ? 'Update' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;