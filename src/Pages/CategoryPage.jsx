

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import Sidebar from '../Components/Sidebar';

const CategoryPage = () => {
  const location = useLocation();
  const subCategories = location.state?.subCategories || [];

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedItemCd, setSelectedItemCd] = useState(null);
  const [allCategoriesClosed, setAllCategoriesClosed] = useState(false); 
  const { category, subcategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = subCategories.find((data) => data.item_name === category);
    if (filtered) {
      let items = filtered.items;
      if (subcategory) {
        items = items.filter((item) => item.subcategory === subcategory);
      }
      setFilteredProducts(items);
    }
  }, [category, subcategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedItemCd(null);
  };

  const handleItemSelect = (itemCd) => {
    setSelectedItemCd(itemCd);
  };

  return (
    <div className='categoryPage flex flex-col sm:flex-row w-[100%] min-h-[100vh] justify-start items-start md:justify-between'>
      <div className="categoryPageLeft w-[100%] md:w-[30%] border-r-2 border-zinc-200 flex flex-col gap-5 p-5 ">
        <h2 className='text-[2vw] '>{category} {subcategory && ` - ${subcategory}`}</h2>
        <Sidebar
          subCategories={subCategories}
          onCategorySelect={handleCategorySelect}
          onItemSelect={handleItemSelect}
          setAllCategoriesClosed={setAllCategoriesClosed} 
        />
      </div>

      <div className="categoryPageRight w-[100%] md:w-[69%]  p-5">
        <div className="product-list  w-[100%]">
          <ProductCard
            subCategories={subCategories}
            selectedCategoryId={selectedCategoryId}
            selectedItemCd={selectedItemCd}
            allCategoriesClosed={allCategoriesClosed} 
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
    