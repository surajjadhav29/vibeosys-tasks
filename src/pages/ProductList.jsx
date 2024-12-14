import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductList() {
  const products = useSelector(state => state.products.products);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <Link to="/add" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 mb-4 inline-block">
          Add Product
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <Link to={`/update/${product.id}`} className="block hover:bg-gray-50">
                <div className="relative">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="mt-2 text-lg font-semibold text-green-600">Rs. {product.totalCost.toFixed(2)}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{product.materials.length} materials</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-4">
            <p>No products available. Add a new product.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
