import React from "react";

const CartItem = ({
  item,
  isUpdating,
  removingItemId,
  onQuantityChange,
  onRemoveItem,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          ${item.price.toFixed(2)} each
        </p>
        <div className="flex items-center mt-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1 || isUpdating}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Decrease quantity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <span className="px-4 py-2 text-gray-900 font-medium min-w-[50px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.maxQuantity || isUpdating}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Increase quantity"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <p className="text-lg font-bold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemoveItem(item.id)}
          disabled={removingItemId === item.id}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          title="Remove item"
        >
          {removingItemId === item.id ? (
            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
