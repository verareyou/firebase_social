import React, { useState } from 'react';

interface DragDropProps {
  id: string;
  onDrop: (id: string) => void;
}

const Draggable: React.FC<DragDropProps> = ({ id, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // Set the drag data to the ID of the div being dragged
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Get the ID of the div being dragged from the drag data
    const draggedId = event.dataTransfer.getData('text/plain');
    // Call the onDrop function with the ID of the div being dragged
    onDrop(draggedId);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: isDragging ? '2px dashed blue' : '2px solid black',
        padding: '10px',
        margin: '10px',
      }}
    >
      {id}
    </div>
  );
};

export default Draggable;
