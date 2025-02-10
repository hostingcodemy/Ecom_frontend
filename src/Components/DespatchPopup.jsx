import React, { useState, useRef } from 'react';

const DispatchPopup = ({ data, onClose }) => {

    console.log(data, 'oo');

    return (
        <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg overflow-auto">
                <h2 className="text-2xl font-semibold mb-6 text-center">Order History</h2>
                <table className="cursor-pointer text-[0.8vw] bg-white border border-yellow-500 rounded-lg shadow-md table-auto">
                    <thead>
                        <tr className="text-black">
                            <th className="px-4 py-3 text-left">Order ID</th>
                            <th className="px-4 py-3 text-left">Order Number</th>
                            <th className="px-4 py-3 text-center">Date</th>
                            <th className="px-4 py-3 text-left">Customer Name</th>
                            <th className="px-4 py-3 text-left">Mobile Number</th>
                            <th className="px-4 py-3 text-center">Email</th>
                            <th className="px-4 py-3 text-left">Product Name</th>
                            <th className="px-4 py-3 text-left">Quantity</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={row.index}
                            >
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.orderId}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.orderNumber}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.orderDate}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.first_name}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.phone}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.email}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.productName}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.quantity}</td>
                                <td className="px-4 py-4 border-t border-b text-center border-gray-300">{row.type}</td>
                                <td className="px-4 py-4 border-t border-b border-gray-300 text-center">{`${row.payableAmount}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={onClose}
                    className="mt-4 text-white bg-red-500 hover:bg-red-600 px-6 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DispatchPopup;
