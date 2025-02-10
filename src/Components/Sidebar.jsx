import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreBtn from "./MoreBtn";

const Sidebar = ({ subCategories, onCategorySelect, onItemSelect, setAllCategoriesClosed }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setActiveItem(null);
    } else {
      setActiveCategory(categoryId);
      setActiveItem(null);
      setAllCategoriesClosed(false);
    }
    onCategorySelect(categoryId);
  };

  const setallcategoryclose = () => {
    setActiveCategory(null);
    setAllCategoriesClosed(true);
  }

  return (
    <nav className="sidebar">
      <ul className="md:flex-row flex-col gap-3">
        {subCategories?.map((subcategory) => (
          <li key={subcategory.category_id} className="subcategory shadow-lg rounded-3xl p-2">
            <div
              className="subcategoryName  flex items-center justify-between p-3 cursor-pointer"
            >
              <div className=" w-[90%]" onClick={() => handleCategoryClick(subcategory.category_id)}>
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className={`transition-all ease-in-out duration-200 text-lg font-semibold ${activeCategory === subcategory.category_id ? "border-t-[0.01vw]" : ""
                    } ${activeCategory === subcategory.category_id ? "border-b-[0.01vw]" : ""} border-orange-500`}
                >
                  {subcategory?.description}
                </Link>

              </div>
              <MoreBtn
                 setallcategoryclose={setallcategoryclose}
                isActive={activeCategory === subcategory.category_id}
              />
            </div>
            <ul
              className={`dropdown flex flex-col gap-1 px-2 transition-all duration-300 ease-in-out ${activeCategory === subcategory.category_id ? "block" : "hidden"
                }`}
            >
              {subcategory.items?.map((item) => (
                <li
                  key={item.item_cd}
                  className={`item text-[1vw] w-fit border-[#FBBF10] flex items-center justify-start cursor-pointer transition-all ease-in-out duration-300  ${activeItem === item.item_cd ? "border-b-[0.01vw]" : ""
                    }`}
                  onClick={() => {
                    onItemSelect(item.item_cd);
                    setActiveItem(item.item_cd);
                  }}
                >
                  <span>{item?.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
