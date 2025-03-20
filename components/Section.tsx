import React from 'react';

// Define the types for the props
interface SectionProps {
  items: string[]; // Array of items in the section
  sectionName: 'new' | 'cooking' | 'ready'; // Section name must be one of these values
  moveItem: (item: string, from: 'new' | 'cooking' | 'ready', to: 'new' | 'cooking' | 'ready' | null) => void; // Function to move an item
}

const Section: React.FC<SectionProps> = ({ items, sectionName, moveItem }) => {
  // Define the next section mapping
  const nextSection: Record<'new' | 'cooking' | 'ready', 'new' | 'cooking' | 'ready' | null> = {
    new: 'cooking',
    cooking: 'ready',
    ready: null
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold text-gray-800 capitalize mb-4">
        {sectionName} Section
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No items in this section.</p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <span className="text-gray-700 font-medium">{item}</span>
            {nextSection[sectionName] && (
              <button
                onClick={() => moveItem(item, sectionName, nextSection[sectionName])}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Move to {nextSection[sectionName]?.toUpperCase()}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Section;