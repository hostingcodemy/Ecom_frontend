
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from "../Context/FavouriteContext";
import ProductFilters from "./ProductFilters";
import { FaStar, FaRegStar } from 'react-icons/fa';


const ProductCard = ({ subCategories, selectedCategoryId, selectedItemCd, allCategoriesClosed }) => {
  const totalStars = 5;
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (allCategoriesClosed) {
      // Reset the filtered items when all categories are closed
      setFilteredItems(subCategories.flatMap((category) => category.items));
    } else {
      const initialFilteredItems = selectedItemCd
        ? subCategories
          .flatMap((category) => category.items)
          .filter((item) => item.item_cd === selectedItemCd)
        : selectedCategoryId
          ? subCategories
            .find((category) => category.category_id === selectedCategoryId)
            ?.items || []
          : subCategories.flatMap((category) => category.items);

      setOriginalItems(initialFilteredItems);
      setFilteredItems(initialFilteredItems);
    }
  }, [subCategories, selectedCategoryId, selectedItemCd, allCategoriesClosed]);

  const handleFilteredItemsChange = (filteredItems) => {
    setFilteredItems(filteredItems);
  };

  return (
    <>
      <ProductFilters
        filteredItems={filteredItems}
        onFilteredItemsChange={handleFilteredItemsChange}
        originalItems={originalItems}
      />
      <div className="product-list grid grid-cols-2 gap-x-2 md:gap-x-0 md:grid-cols-3 w-[100%]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
           
              key={item.item_cd}
              className="product-card cursor-pointer mb-5 p-2 w-[100%] shadow-xl rounded-3xl flex flex-col items-start gap-2"
            >
              <div className="product-showcase flex flex-col gap-3 h-[25vh] md:h-[48vh] w-[100%]">
                <div className="imgWrapper relative h-[65%]">
                  <img
                   onClick={() => navigate(`/product/${item.item_cd}`, { state: { itemDetails: item } })}
                    src={item.photo}
                    alt={item.name}
                    className="product-image rounded-tl-2xl rounded-tr-2xl h-[100%] w-[100%]"
                  />
                  <div
                    onClick={() => toggleFavorite(item)}
                    className="favouriteContainer absolute right-1 top-[1%] transition-all ease-in-out duration-500 hover:bg-red-300 bg-red-100 px-1 py-1 rounded-[100%]"
                  >
                    {favorites.some((fav) => fav.item_cd === item.item_cd) ? (
                      <MdFavorite size={20} color="red" />
                    ) : (
                      <MdOutlineFavoriteBorder size={20} />
                    )}
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="text-[4.5vw] md:text-[1.5vw] md:text-left text-center">{item.name}</h3>
                  <p className="text-[3w] md:text-[1vw] md:text-left text-center">{item.description || "Tea Product"}</p>
                  <p className="flex items-center justify-center md:justify-start w-[100%] md:text-[1vw] text-[2vw]">
                    Rating:
                    <span className="flex ml-2">
                      {Array.from({ length: totalStars }).map((_, index) => (
                        <div key={index}>
                          {index < Math.round(item.rating) ? (
                            <FaStar className="text-yellow-500" />
                          ) : (
                            <FaRegStar className="text-yellow-500" />
                          )}
                        </div>
                      ))}
                    </span>
                  </p>
                </div>
              </div>

              <div className="product-price flex flex-col w-[100%] gap-1">
                <p className="text-center md:text-left">
                  <strong className="md:text-[1vw] text-[3vw]">Retail Price: </strong>&#8377;{item.rp_price}
                </p>
                <p className="text-center md:text-left">
                  <strong className="md:text-[1vw] text-[3vw]">Wholesale Price: </strong>&#8377;{item.wsp_price}
                </p>
                <button
                  className="view-price-button w-[100%] flex px-3 py-1 bg-yellow-50 border-[#3f3c23] border-[0.01vw] justify-center items-center text-[#020202] rounded-3xl hover:bg-[#FBBF10] hover:text-white hover:font-semibold transition-all ease-in-out duration-500 mt-3"
                  onClick={() => navigate(`/product/${item.item_cd}`, { state: { itemDetails: item } })}
                >
                  View Price
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default ProductCard;
