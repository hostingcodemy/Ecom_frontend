import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";

const ProductFilters = ({ filteredItems, onFilteredItemsChange, originalItems }) => {
  const [searchName, setSearchName] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const applyFilters = () => {

    let filtered = [...originalItems];

    if (searchName !== '') {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (item) => item.wsp >= priceRange.min && item.wsp <= priceRange.max
    );

    onFilteredItemsChange(filtered);
  };

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchName(name);

  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [searchName, priceRange, originalItems]);

  return (
    <div className="filters justify-between md:ml-2 md:gap-9 md:justify-start items-end flex gap-3">
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

      <div className='flex flex-col justify-between items-center'>
        <div className="flex md:flex-row  items-center flex-col gap-2 md:gap-3">

          <input
            type="range"
            name="min"
            min={0}
            max={priceRange.max}
            value={priceRange.min}
            step={1000}
            onChange={handlePriceRangeChange}
          />
          <input
            type="range"
            name="max"
            min={priceRange.min}
            max={10000}
            value={priceRange.max}
            step={1000}
            onChange={handlePriceRangeChange}
          />
        </div>
        <p className='md:text-[1vw] text-[3vw] flex gap-3'>
          <span>₹{priceRange.min}</span> - <span>₹{priceRange.max}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductFilters;
