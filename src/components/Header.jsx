import React from 'react';
import { Link } from 'react-router-dom';
import { green_color } from '../Utils/color';

const Header = () => {
    return (
        <header className={`${green_color} text-white p-4`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Inventory Management</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/add" className="hover:text-gray-300">
                                Add Product
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
