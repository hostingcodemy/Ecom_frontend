import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

const ProductFilters = ({ filteredItems, onFilteredItemsChange, originalItems }) => {
  const [searchName, setSearchName] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchName(name);

    if (name === '') {
      onFilteredItemsChange(originalItems);
    } else {
      const filtered = originalItems.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );
      onFilteredItemsChange(filtered);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const max = Math.floor(value / 1000) * 1000 + 1000;
    setPriceRange({ min: value, max });


    const filtered = originalItems.filter(
      (item) => item.rp_price >= value && item.rp_price <= max
    );


    onFilteredItemsChange(filtered);
  };

  return (
    <div className="filters justify-between md:ml-2 md:gap-9 md:justify-start items-end flex gap-3">
      {/* Search input */}
      <div className='py-1 px-1 flex gap-2 items-center justify-between border-[0.01vw] border-yellow-400 rounded-full'>
        <div className='searchIcon p-1 flex items-center justify-center bg-yellow-100 rounded-full'>
          <IoIosSearch size={20} />
        </div>
        <input
          className='bg-transparent outline-none'
          type="text"
          placeholder="Search Products"
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>

      {/* Price range input */}
      <div className='flex flex-col justify-between items-center'>
        <input
          type="range"
          min={0}
          max={10000}
          value={priceRange.min}
          step={1000}
          onChange={handlePriceChange}
        />
        <p className='md:text-[1vw] text-[3vw] flex gap-3'>
          <span>₹{priceRange.min}</span> - <span>₹{priceRange.max}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;

