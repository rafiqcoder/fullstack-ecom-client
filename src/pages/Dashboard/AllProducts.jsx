import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteProductsMutation,
  useGetProductsQuery,
} from "../../redux/api/productsApi/productsApi";

const AllProducts = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [deleteProducts, { isLoading: isDeleting }] =
    useDeleteProductsMutation();
  // Fake products data for teaching CRUD operations

  // State for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form handling for edit modal
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // CRUD Operations for teaching purposes

  // UPDATE: Edit product (opens modal with form)
  const handleEdit = (product) => {
    setEditingProduct(product);
    // Populate form with current product data
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("stock", product.stock);
    setValue("description", product.description);
    setValue("image", product.image);
    setIsEditModalOpen(true);
  };

  // DELETE: Remove product
  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId);
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const response = await deleteProducts(productId);
        console.log(response);

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // UPDATE: Submit edited product
  const onEditSubmit = async (data) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await updateProduct(editingProduct.id, data);

      // Update local state

      setIsEditModalOpen(false);
      setEditingProduct(null);
      reset();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    reset();
  };

  if (isLoading || loading || isDeleting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading ...</div>
      </div>
    );
  }

  // Filter products based on search
  const filteredProducts = data?.data?.filter(
    (product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("product from all product", data);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        {/* Search Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600">
              {filteredProducts.length} of {data.data.length} products
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Get started by adding a new product."}
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Product
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onEditSubmit)} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="edit-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    {...register("name", {
                      required: "Product name is required",
                      minLength: {
                        value: 3,
                        message: "Product name must be at least 3 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="edit-price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="edit-price"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label
                    htmlFor="edit-stock"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="edit-stock"
                    {...register("stock", {
                      required: "Stock quantity is required",
                      min: {
                        value: 0,
                        message: "Stock cannot be negative",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.stock ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="edit-description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="edit-description"
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter product description..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="edit-image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="edit-image"
                    {...register("image", {
                      required: "Image URL is required",
                      pattern: {
                        value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                        message: "Please enter a valid image URL",
                      },
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-4 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
