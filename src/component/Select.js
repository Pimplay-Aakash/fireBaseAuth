import React, { useState } from 'react';

const CustomSelect = ({ columns, onSelectionChange, renderOption, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='px-2 py-1 bg-white border rounded-md'
          onClick={toggleDropdown}
        >
          {label} &nbsp;{isOpen ? '\u2B9D' : '\u2B9F'}
        </button>
      </div>
      {isOpen && (
        <div className='absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            {columns.map((col) => (
              <label key={col.key} className='flex items-center px-4 py-2'>
                {renderOption(col)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
