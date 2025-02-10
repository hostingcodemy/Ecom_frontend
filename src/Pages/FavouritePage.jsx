import React from "react";
import { useFavorites } from "../Context/FavouriteContext";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const FavouritePage = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const handleRemoveFavorite = (item) => {
        toggleFavorite(item); 
    };

    return (
        <div className="favouritepage min-h-[83vh]">
            <div className="product-list grid p-5 md:p-10 grid-cols-2 gap-x-2 md:gap-x-2 md:grid-cols-5 w-[100%]">
                {favorites.length > 0 ? (
                    favorites.map((item) => (
                        <div
                            key={item.item_cd}
                            className="product-card mb-5 p-2 w-[100%] shadow-xl rounded-3xl flex flex-col items-start gap-2"
                        >
                            <div className="product-showcase flex flex-col gap-3 h-[25vh] md:h-[48vh] w-[100%]">
                                <div className="imgWrapper relative h-[65%]">
                                    <img
                                        src={item.photo}
                                        alt={item.name}
                                        className="product-image rounded-tl-2xl rounded-tr-2xl h-[100%] w-[100%]"
                                    />
                                     <div
                                    className="remove-favorite-button absolute flex p-1 bg-red-50 border-[#3f3c23] border-[0.01vw] justify-center items-center text-[#020202] rounded-full hover:bg-red-500 hover:text-white hover:font-semibold transition-all ease-in-out duration-500 cursor-pointer right-1 top-[1%]"
                                    onClick={() => handleRemoveFavorite(item)}
                                >
                        <IoMdClose />
                                </div>
                                </div>
                                <div className="product-info">
                                    <h3 className="text-[4.5vw] md:text-[1.5vw] md:text-left text-center">{item.name}</h3>
                                    <p className="text-[3w] md:text-[1vw] md:text-left text-center">{item.description || "Tea Product"}</p>
                                    <p
                                        className="flex items-center justify-center md:justify-start w-[100%] md:text-[1vw] text-[2vw]"
                                    >
                                        Rating: {item.rating}
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
                            </div>

                            <div className="button-container flex justify-between w-full mt-3">
                                <button
                                    className="view-price-button w-[100%] flex px-3 py-1 bg-yellow-50 border-[#3f3c23] border-[0.01vw] justify-center items-center text-[#020202] rounded-3xl hover:bg-[#FBBF10] hover:text-white hover:font-semibold transition-all ease-in-out duration-500"
                                    onClick={() => navigate(`/product/${item.item_cd}`, { state: { itemDetails: item } })}
                                >
                                    View Price
                                </button>
                               
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorite items available.</p>
                )}
            </div>
        </div>
    );
};

export default FavouritePage;

