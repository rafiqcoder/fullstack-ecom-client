import React from "react";

const AllOrders = () => {
  // Fake orders data
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-2025-001",
      customer: {
        name: "John Doe",
        email: "john.doe@email.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      },
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 99.99 },
        { name: "Phone Case", quantity: 2, price: 19.99 },
      ],
      total: 139.97,
      status: "pending",
      orderDate: "2025-07-06T10:30:00Z",
      shippingAddress: "123 Main St, City, State 12345",
    },
    {
      id: 2,
      orderNumber: "ORD-2025-002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      },
      items: [{ name: "Smart Watch", quantity: 1, price: 199.99 }],
      total: 199.99,
      status: "processing",
      orderDate: "2025-07-05T14:15:00Z",
      shippingAddress: "456 Oak Ave, Town, State 67890",
    },
    {
      id: 3,
      orderNumber: "ORD-2025-003",
      customer: {
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      },
      items: [
        { name: "Coffee Mug", quantity: 3, price: 15.99 },
        { name: "Laptop Stand", quantity: 1, price: 45.99 },
      ],
      total: 93.96,
      status: "shipped",
      orderDate: "2025-07-04T09:22:00Z",
      shippingAddress: "789 Pine Rd, Village, State 54321",
    },
    {
      id: 4,
      orderNumber: "ORD-2025-004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      },
      items: [{ name: "Bluetooth Speaker", quantity: 1, price: 79.99 }],
      total: 79.99,
      status: "delivered",
      orderDate: "2025-07-03T16:45:00Z",
      shippingAddress: "321 Elm St, County, State 98765",
    },
    {
      id: 5,
      orderNumber: "ORD-2025-005",
      customer: {
        name: "David Brown",
        email: "david.brown@email.com",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      },
      items: [
        { name: "Gaming Mouse", quantity: 1, price: 59.99 },
        { name: "Mouse Pad", quantity: 1, price: 12.99 },
      ],
      total: 72.98,
      status: "cancelled",
      orderDate: "2025-07-02T11:30:00Z",
      shippingAddress: "654 Maple Dr, City, State 13579",
    },
  ];

  // Order status options
  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
    },
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change the order status to "${newStatus}"?`
      )
    ) {
      try {
        // await updateOrder({ id: orderId, status: newStatus });
        alert("Order status updated successfully!");
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("Failed to update order status. Please try again.");
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this order? This action cannot be undone."
      )
    ) {
      try {
        // await deleteOrder(orderId);
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order. Please try again.");
      }
    }
  };

  const getStatusConfig = (status) => {
    return (
      statusOptions.find((option) => option.value === status) ||
      statusOptions[0]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
          <p className="text-gray-600">Manage and track customer orders</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    {/* Items */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.map((item, index) => (
                          <div key={index} className="truncate max-w-xs">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                          getStatusConfig(order.status).color
                        }`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() =>
                            alert(`View details for ${order.orderNumber}`)
                          }
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Order"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No orders found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  No orders have been placed yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
