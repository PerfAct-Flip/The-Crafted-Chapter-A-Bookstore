import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { getMyOrders } from "../api/order";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShopContext } from "../context/ShopContext";

interface OrderItem {
    product: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: string;
    status: string;
    createdAt: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const shopContext = useContext(ShopContext);
    const products = shopContext?.products || [];

    const fetchOrders = useCallback(async (signal?: AbortSignal) => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await getMyOrders();
            if (signal?.aborted) return;
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error: any) {
            if (axios.isCancel(error) || signal?.aborted) return;
            console.error("Orders fetch error details:", error);
            const errMsg = error.response?.data?.message || error.message || "Server connection failed";
            toast.error(`Order History: ${errMsg}`);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const controller = new AbortController();
        fetchOrders(controller.signal);
        return () => controller.abort();
    }, [fetchOrders]);

    const getProductTitle = (productId: any) => {
        if (!productId) return "Unknown Product";
        const idStr = String(productId);
        const book = products.find((p: any) => p.id === idStr || p._id === idStr);
        return book ? book.title : `Product (${idStr.substring(idStr.length - 5)})`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-5xl mx-auto min-h-[70vh]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => fetchOrders()}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors font-medium border"
                    >
                        Refresh
                    </button>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                        {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                    </span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-xl text-gray-600 mb-6 font-medium">No orders yet.</p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Order Placed</p>
                                        <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Amount</p>
                                        <p className="font-semibold text-gray-800 font-mono">₹{order.totalAmount}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Ship To</p>
                                        <p className="font-semibold text-gray-800 truncate max-w-[150px]">{order.shippingAddress}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Status</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                                <span className="text-gray-700 font-medium">{getProductTitle(item.product)}</span>
                                                <span className="text-gray-400 font-bold ml-2">x {item.quantity}</span>
                                            </div>
                                            <p className="font-bold text-gray-900 font-mono">₹{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <p className="text-xs text-gray-400 font-mono italic">ORDER ID: {order._id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
