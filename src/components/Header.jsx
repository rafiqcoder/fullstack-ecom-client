import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useLogoutMutation } from "../redux/api/usersApi/usersApi";

/**
 *   Header Component with Cart UI (No Functionality)
 *
 * This component demonstrates:
 * 1. Modern cart UI with popup/dropdown (UI ONLY)
 * 2. Navigation with React Router
 * 3. Firebase authentication
 * 4. Conditional rendering based on authentication state
 * 5. Responsive design with Tailwind CSS
 *
 * Note: Cart functionality is removed - this is just UI for demonstration
 */

const Header = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  //   Cart UI state (NO REDUX FUNCTIONALITY)
  // Just for controlling popup visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  //   Mock cart data for UI demonstration only
  // This shows how the cart UI would look with real data
  const mockCartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 25.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
    },
  ];

  //   Calculate display values from mock data
  const displayItemsCount = mockCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const displayTotal = mockCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const Links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Checkout", path: "/checkout" }, // Keep checkout in nav for direct access
    // Removed cart link - now using cart icon with popup
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        logout()
          .unwrap()
          .then((res) => {
            console.log("Logout response", res);
            navigate("/");
            // Optionally, you can redirect or show a success message
          })
          .catch((error) => {
            console.error("Logout error", error);
          });
      })
      .catch(() => {
        // Handle logout error silently - could add error handling here
      });
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  console.log("user from header ", user);

  return (
    <div>
      <div className="navbar  shadow-sm bg-gray-100 text-black rounded-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {Links.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path} className="text-black">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost text-xl font-bold text-blue-600"
          >
            🛒 EcomStore
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {Links.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path} className="text-black">
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex-none">
            {/*   Cart Icon with Popup - Modern E-commerce UI */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle hover:bg-gray-200 transition-colors"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {displayItemsCount > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-500 text-white border-none">
                      {displayItemsCount}
                    </span>
                  )}
                </div>
              </div>

              {/*   Cart Popup - UI ONLY (No Real Functionality) */}
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-white z-[999] mt-3 w-90 shadow-xl border border-gray-200 rounded-lg"
              >
                <div className="card-body p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    Shopping Cart ({displayItemsCount} items)
                  </h3>

                  {mockCartItems.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Your cart is empty</p>
                      <NavLink
                        to="/products"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        Start Shopping
                      </NavLink>
                    </div>
                  ) : (
                    <>
                      {/*   Cart Items List */}
                      <div className="space-y-3 max-h-64 ">
                        {mockCartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-800 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                            <div className="text-right flex items-center gap-2">
                              <p className="font-semibold text-sm text-gray-800">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              {/*   Remove Item Button (UI Only) */}
                              <button
                                className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50 p-1"
                                onClick={() =>
                                  alert(
                                    `UI Demo: Would remove ${item.name} from cart`
                                  )
                                }
                                title="Remove item"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/*   Cart Summary */}
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-gray-800">
                            Total:
                          </span>
                          <span className="font-bold text-lg text-blue-600">
                            ${displayTotal.toFixed(2)}
                          </span>
                        </div>

                        {/*   Cart Action Buttons */}
                        <div className="flex gap-2">
                          <NavLink
                            to="/cart"
                            className="btn btn-outline btn-sm flex-1 border-gray-300 hover:bg-gray-100"
                            onClick={() => setIsCartOpen(false)} // Close popup when navigating
                          >
                            View Cart
                          </NavLink>
                          <NavLink
                            to="/checkout"
                            className="btn btn-primary btn-sm flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => setIsCartOpen(false)} // Close popup when navigating
                          >
                            Checkout
                          </NavLink>
                        </div>
                      </div>
                    </>
                  )}

                  {/*   UI Demo Notice */}
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-700 text-center">
                      <strong>UI Demo:</strong> This cart contains mock data for
                      demonstration
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {user?.uid ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-white"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary mx-3">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
