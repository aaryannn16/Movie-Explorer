import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FaTrashAlt } from 'react-icons/fa';

const Watchlist = ({ list, onRemove, onReorder }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(list);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    onReorder(reordered);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">📺 My Watchlist</h2>

      {list.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No movies added yet.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="watchlist">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {list.map((movie, index) => (
                  <Draggable key={movie.imdbID} draggableId={movie.imdbID} index={index}>
                    {(provided) => (
                      <div
                        className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded shadow"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x110?text=No+Image'} 
                          alt={movie.Title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-md">{movie.Title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{movie.Year}</p>
                        </div>
                        <button
                          onClick={() => onRemove(movie.imdbID)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

Watchlist.propTypes = {
  list: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReorder: PropTypes.func.isRequired,
};

export default Watchlist;
