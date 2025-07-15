import React, { useState } from "react";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);

  const mockCartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      inStock: true,
      maxQuantity: 5,
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 25.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
      inStock: true,
      maxQuantity: 10,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
      inStock: false,
      maxQuantity: 3,
    },
    {
      id: 4,
      name: "USB-C Cable",
      price: 19.99,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      inStock: true,
      maxQuantity: 15,
    },
  ];

  //   Cart calculations
  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  //   Event handlers (UI only - no real functionality)
  const handleQuantityChange = (itemId, newQuantity) => {
    setIsUpdating(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsUpdating(false);
      alert(`UI Demo: Updated quantity for item ${itemId} to ${newQuantity}`);
    }, 500);
  };

  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId);
    // Simulate API call delay
    setTimeout(() => {
      setRemovingItemId(null);
      alert(`UI Demo: Removed item ${itemId} from cart`);
    }, 500);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      alert("UI Demo: Cart cleared successfully");
    }
  };

  const handleCheckout = () => {
    alert("UI Demo: Proceeding to checkout...");
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  //   Empty cart state
  if (mockCartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/*   Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {mockCartItems.length}{" "}
                {mockCartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*   Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Cart Items
                </h2>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {mockCartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      isUpdating={isUpdating}
                      removingItemId={removingItemId}
                      onQuantityChange={handleQuantityChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Continue Shopping Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleContinueShopping}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*   Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({mockCartItems.length} items)
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isUpdating}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Updating..." : "Proceed to Checkout"}
                </button>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Security Badges */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span>SSL Protected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
