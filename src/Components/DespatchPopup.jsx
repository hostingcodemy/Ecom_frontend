import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const DispatchPopup = ({ data, onClose }) => {
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg overflow-auto">
                <div className='flex items-center justify-between mb-3 px-3'>
                    <h2 className="text-2xl font-semibold text-center ml-[33vw]">My Orders</h2>
                    <button
                        onClick={onClose}
                        className=" text-white bg-red-500 hover:bg-red-600 p-1 rounded-[100%] focus:outline-none  focus:ring-red-500 "
                    >
                        <IoMdClose />
                    </button>
                </div>
                <table className="cursor-pointer text-[0.8vw] bg-white border border-yellow-500 rounded-lg shadow-md table-auto">
                    <thead className=' bg-yellow-500'>
                        <tr className="text-white">
                            <th className="px-4 py-2 text-left">Order ID</th>
                            <th className="px-4 py-2 text-left">Order Number</th>
                            <th className="px-4 py-2 text-center">Date & Time</th>
                            <th className="px-4 py-2 text-left">Customer Name</th>
                            <th className="px-4 py-2 text-left">Mobile Number</th>
                            <th className="px-4 py-2 text-center">Email</th>
                            <th className="px-4 py-2 text-left">Product Name</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={row.index}>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.orderId}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.orderNumber}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.orderDate}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.first_name}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.phone}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.email}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.productName}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.quantity}</td>
                                <td className="px-3 py-2 border-t border-b text-center border-gray-300">{row.type}</td>
                                <td className="px-4 py-2 border-t border-b border-gray-300 text-center ">&#8377;{`${row.payableAmount}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination controls */}
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg focus:outline-none"
                    >
                        <GrPrevious />
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page + 1)}
                            className={`px-4 py-2 mx-1 rounded-lg focus:outline-none ${currentPage === page + 1 ? 'bg-[#3BFA89] text-white' : 'bg-gray-300'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg focus:outline-none"
                    >
                        <GrNext />
                    </button>
                </div>


            </div>
        </div>
    );
};

export default DispatchPopup;
