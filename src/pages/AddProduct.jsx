import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
import { green_color, text_white } from '../Utils/color';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: Date.now(),
    name: '',
    category: '',
    unit: '',
    expiry: '',
    materials: [],
    totalCost: 0,
    imageUrl: '',
  });

  const [material, setMaterial] = useState({
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    tax: 0,
    totalAmount: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          imageUrl: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMaterial = () => {
    const newMaterial = {
      ...material,
      tax: material.price * 0.1,
      totalAmount: material.price * material.quantity + material.price * 0.1,
    };
    setProduct((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
      totalCost: prev.totalCost + newMaterial.totalAmount,
    }));
    setMaterial({ name: '', unit: '', quantity: 0, price: 0, tax: 0, totalAmount: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Category</span>
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Finished">Finished</option>
            <option value="Semi Finished">Semi Finished</option>
            <option value="Subsidiary">Subsidiary</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Unit of Measure</span>
          <select
            value={product.unit}
            onChange={(e) => setProduct({ ...product, unit: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="ml">ml</option>
            <option value="ltr">ltr</option>
            <option value="gm">gm</option>
            <option value="kg">kg</option>
            <option value="mtr">mtr</option>
            <option value="mm">mm</option>
            <option value="box">box</option>
            <option value="units">units</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Expiry Date</span>
          <input
            type="date"
            value={product.expiry}
            onChange={(e) => setProduct({ ...product, expiry: e.target.value })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Product Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <h2 className="text-xl font-semibold mt-6">Materials</h2>
        <label className="block">
          <span className="text-gray-700">Material Name</span>
          <input
            type="text"
            value={material.name}
            onChange={(e) => setMaterial({ ...material, name: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Unit</span>
          <input
            type="text"
            value={material.unit}
            onChange={(e) => setMaterial({ ...material, unit: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Quantity</span>
          <input
            type="number"
            value={material.quantity}
            onChange={(e) => setMaterial({ ...material, quantity: Number(e.target.value) })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Price</span>
          <input
            type="number"
            value={material.price}
            onChange={(e) => setMaterial({ ...material, price: Number(e.target.value) })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleAddMaterial}
            className={`bg-red-600 ${text_white} px-4 py-2 rounded hover:bg-blue-600`}
          >
            Add Material
          </button>
          <button
            type="submit"
            className={`${green_color} ${text_white} px-4 py-2 rounded hover:bg-green-600`}
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
