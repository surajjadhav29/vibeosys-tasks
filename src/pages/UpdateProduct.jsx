import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../redux/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const [product, setProduct] = useState(null);
  const [material, setMaterial] = useState({
    name: '',
    unit: '',
    quantity: 0,
    price: 0,
    tax: 0,
    totalAmount: 0,
  });
  const [editeditingMaterialIndex, setEditingMaterialIndex] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const existingProduct = products.find((prod) => prod.id === parseInt(id, 10));
    if (existingProduct) {
      setProduct(existingProduct);
      setImageUrl(existingProduct.imageUrl || '');
    }
  }, [id, products]);

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

  const handleDeleteMaterial = (index) => {
    const materialToDelete = product.materials[index];
    const updatedMaterials = product.materials.filter((_, i) => i !== index);
    setProduct((prev) => ({
      ...prev,
      materials: updatedMaterials,
      totalCost: prev.totalCost - materialToDelete.totalAmount,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, imageUrl };
    dispatch(updateProduct(updatedProduct));
    navigate('/');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>
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

        {/* Image upload */}
        <label className="block">
          <span className="text-gray-700">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="Product" className="w-32 h-32 object-cover" />
          </div>
        )}

        <h2 className="text-xl font-semibold mt-6">Materials</h2>

        {product.materials.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Added Materials</h3>
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Material Name</th>
                  <th className="border border-gray-300 p-2">Unit</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.materials.map((mat, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{mat.name}</td>
                    <td className="border border-gray-300 p-2">{mat.unit}</td>
                    <td className="border border-gray-300 p-2">{mat.quantity}</td>
                    <td className="border border-gray-300 p-2">Rs. {mat.price.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">Rs. {mat.totalAmount.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleDeleteMaterial(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Material
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;