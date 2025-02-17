import React, { useState, useEffect, useRef } from "react";
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
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    if (allCategoriesClosed) {
      setFilteredItems(subCategories.flatMap((category) => category.items));
    } else {
      const initialFilteredItems = selectedItemCd
        ? subCategories
          .flatMap((category) => category.items)
          .filter((item) => item.item_cd === selectedItemCd)
        : selectedCategoryId
          ? subCategories
            .find((category) => category.sub_category_id === selectedCategoryId)
            ?.items || []
          : subCategories.flatMap((category) => category.items);

      setOriginalItems(initialFilteredItems);
      setFilteredItems(initialFilteredItems);
    }
  }, [subCategories, selectedCategoryId, selectedItemCd, allCategoriesClosed]);

  const handleFilteredItemsChange = (filteredItems) => {
    setFilteredItems(filteredItems);
  };

  const toggleText = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
              className="product-card cursor-pointer mb-5 p-2 w-[100%] shadow-xl rounded-3xl flex flex-col items-start gap-2 justify-between"
            >
              <div className="product-showcase flex flex-col justify-between gap-3 w-[100%]">
                <div className="imgWrapper relative h-[20vh] md:h-[30vh]">
                  <img
                    onClick={() => navigate(`/product/${item.item_cd}`, { state: { details: item } })}
                    src={item.item_images[0]}
                    alt={item.item_name}
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
                <div className="product-info flex flex-col gap-1">
                  <h3 className="text-[3vw] md:text-[1.2vw] font-semibold md:text-left text-center leading-[2vw] md:leading-[1.5vw]">{item.item_name}</h3>
                  <div>
                    <p
                      className={`text-[3vw] md:text-[0.8vw] font-light md:text-left text-center ${expandedItems[item.item_cd] ? 'h-auto' : 'md:h-[5vh] h-[6vh] overflow-hidden'}`}
                    >
                      {item.details || "Tea Product"}
                    </p>
                    <button
                      onClick={() => toggleText(item.item_cd)}
                      className="text-yellow-500 text-[2vw] md:text-[0.8vw] w-[100%] md:text-left text-center "
                    >
                      {expandedItems[item.item_cd] ? 'Show Less' : 'Show More.....'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="product-price flex flex-col justify-between gap-2 w-[100%]">
                <p className="flex items-center justify-center md:justify-start w-[100%] gap-2">
                  <span className="flex items-center  md:text-[1vw] text-[2vw]">
                    <p>Rating:</p>
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
                  {item.is_stock === 1 ?
                    (
                      <div className=" top-0 right-10 gap-1 flex text-[0.8vw] font-thin"><span className="bg-green-400 px-1 rounded-sm font-normal">IN</span>STOCK</div>
                    ) : (
                      <div className=" top-0 right-10 gap-1 flex text-[0.8vw] font-thin">OUT OF<span className="bg-red-500 text-white px-1 rounded-sm font-normal">STOCK</span></div>
                    )
                  }
                </p>
                <p className="text-center md:text-left md:text-[0.9vw]">
                  <strong className="md:text-[0.9vw] text-[3vw]">Retail Price: </strong>&#8377;{item.rp}
                </p>
                <p className="text-center md:text-left md:text-[0.9vw]">
                  <strong className="md:text-[0.9vw] text-[3vw]">Wholesale Price: </strong>&#8377;{item.wsp}
                </p>
                <button
                  className="view-price-button w-[100%] flex px-3 py-1 bg-yellow-50 border-[#3f3c23] border-[0.01vw] justify-center items-center text-[#020202] rounded-3xl hover:bg-[#FBBF10] hover:text-white hover:font-semibold transition-all ease-in-out duration-500 mt-1"
                  onClick={() => navigate(`/product/${item.item_cd}`, { state: { details: item } })}
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
