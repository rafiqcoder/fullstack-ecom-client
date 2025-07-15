import React from "react";
import { useNavigate } from "react-router";



const EmptyCart = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={handleStartShopping}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Start Shopping
        </button>

        {/*   Additional empty state features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Why not try these?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600 mb-2">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Flash Sales</h4>
              <p className="text-sm text-gray-600">Up to 50% off</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-green-600 mb-2">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900">Popular Items</h4>
              <p className="text-sm text-gray-600">Trending now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
