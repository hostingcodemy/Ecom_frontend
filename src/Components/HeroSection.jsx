import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Btn from './Btn'
import {
    API_CATEGORIES,
    API_SUB_CATEGORY
}
    from '../config/Api';
import axios from 'axios';

const HeroSection = () => {

    const navigate = useNavigate();
    const [catData, setCatData] = useState([]);
    const [subCatData, setSubCatData] = useState([]);

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        axios({
            method: "GET",
            url: API_CATEGORIES,
        })
            .then((res) => {
                const result = res?.data?.data;
                if (Array.isArray(result)) {
                    setCatData(result.slice(0, 5));
                } else {
                    console.error("Expected an array but got:", result);
                }

            }).catch((e) => {
                console.log(e);
            });
    };

    const fetchSubCategories = async (category_id) => {
        try {
            const res = await axios({
                method: "POST",
                url: `${API_SUB_CATEGORY}/${category_id}`,
            });
            const result = res?.data?.data;
            setSubCatData(result);
            return result;
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            return [];
        }
    };

    const handleButtonClick = async (categoryId) => {
        const categoryIds = Array.isArray(categoryId) ? categoryId : [categoryId];

        const idsToPrint = categoryIds.slice(0, 4);

        for (const id of idsToPrint) {
            try {

                if (!id) {
                    console.error("Category ID is undefined or invalid.");
                    continue;
                }
                const categoryDetails = catData.find(item => item.category_id === id);
                if (categoryDetails) {
                    console.log("Category details:", categoryDetails);

                    const subCategories = await fetchSubCategories(id);
                    if (subCategories && subCategories.length > 0) {
                        navigate(`/category/${id}`, { state: { subCategories } });
                    } else {
                        console.warn(`No subcategories found for category ID: ${id}`);
                    }
                } else {
                    console.warn(`No category found for ID: ${id}`);
                }
            } catch (error) {
                console.error("An error occurred while handling the button click:", error);
            }
        }
    };

    return (
        <div className='categoryShowcaseSection w-[100vw]  py-5 sm:px-20 px-10 gap-3 grid sm:grid-cols-12 grid-cols-1 items-center justify-center'>

            <div className="flex h-[100vh] w-[100%] flex-col sm:col-span-3 col-span-12 justify-between sm:ml-0 gap-2">
                {catData.slice(0, 2).map((item, index) => (
                    <div key={index} className="BagsCategory h-[49%] w-[100%] relative">
                        <Link
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleButtonClick(item.category_id);
                            }}
                        >
                            <img className='h-[100%] w-[100%] rounded-3xl' src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGKarwVUFzOxvnL5gYrNOqaEwBFLtPHXROeczXsMmTLnbiGdtVNa_kA9iGDqRjhZ99ojEoWrtLmT0T7ejBPL8LmPOwP09DwdTygwPnTV6-_U4ZhhLUAFqatQ" alt="bagImg" />
                            <Btn title={item.category_name} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex items-start h-[60vh] sm:h-[100vh] col-span-12 sm:col-span-6 sm:ml-0  w-[100%]">
                {catData.slice(2, 3).map((item, index) => (
                    <div key={index} className="BagsCategory h-[100%] w-[100%] relative">
                        <Link
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleButtonClick(item.category_id);
                            }}
                        >
                            <img className='h-[100%] w-[100%] rounded-3xl' src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGKarwVUFzOxvnL5gYrNOqaEwBFLtPHXROeczXsMmTLnbiGdtVNa_kA9iGDqRjhZ99ojEoWrtLmT0T7ejBPL8LmPOwP09DwdTygwPnTV6-_U4ZhhLUAFqatQ" alt="bagImg" />
                            <Btn title={item.category_name} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex h-[100vh] w-[100%] flex-col sm:col-span-3 col-span-12 justify-between sm:ml-0 gap-2">
                {catData.slice(3, 5).map((item, index) => (
                    <div key={index} style={{ height: `${index === 0 ? "56%" : "43%"}` }} className="BagsCategory  w-[100%] relative">
                        <Link
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleButtonClick(item.category_id);
                            }}
                        >
                            <img className='h-[100%] w-[100%] rounded-3xl' src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGKarwVUFzOxvnL5gYrNOqaEwBFLtPHXROeczXsMmTLnbiGdtVNa_kA9iGDqRjhZ99ojEoWrtLmT0T7ejBPL8LmPOwP09DwdTygwPnTV6-_U4ZhhLUAFqatQ" alt="bagImg" />
                            <Btn title={item.category_name} />
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HeroSection;
