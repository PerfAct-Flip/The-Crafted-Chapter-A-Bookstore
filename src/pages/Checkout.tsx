import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { createOrder } from "../api/order";

const Checkout: React.FC = () => {
    const cartContext = useContext(CartContext);
    const shopContext = useContext(ShopContext);
    const products = shopContext?.products || [];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    if (!cartContext) return null;

    const { cartItems, clearCart } = cartContext;

    const cartDetails = Object.entries(cartItems)
        .map(([productId, quantity]) => {
            const book = products.find((b) => b.id === productId);
            return {
                id: productId,
                book,
                quantity,
                total: book ? book.price * quantity : 0,
            };
        })
        .filter((item) => item.book);

    const totalAmount = cartDetails.reduce((sum, item) => sum + item.total, 0);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartDetails.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const shippingAddress = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}`;

        try {
            // 1. Create the order
            await createOrder({ shippingAddress });

            // 2. Clear cart (silent: true, so it doesn't show errors if backend already cleared it)
            await clearCart(true);

            toast.success("Order Placed Successfully!");

            // 3. Small delay to allow backend to finish processing and ensure UI sync
            setTimeout(() => {
                navigate("/orders");
            }, 1000);

        } catch (error: any) {
            console.error("Checkout submission error:", error);
            toast.error(error.response?.data?.message || "Failed to place order");
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col lg:flex-row justify-between gap-12 pt-5 sm:pt-14 min-h-[80vh] border-t"
        >
            {/* ---------- Left Side: Shipping Address ---------- */}
            <div className="flex flex-col gap-6 w-full lg:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3 font-bold text-gray-800 border-b pb-2">
                    Shipping Information
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                    type="text"
                    placeholder="Street"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="number"
                        placeholder="Zipcode"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="border border-gray-300 rounded-xl py-2.5 px-4 w-full focus:outline-blue-500 transition-all"
                    type="number"
                    placeholder="Phone"
                />
            </div>

            {/* ---------- Right Side: Order Summary ---------- */}
            <div className="flex-1 max-w-[500px]">
                <div className="text-gray-800 p-8 rounded-3xl shadow-2xl sticky top-10">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                        {cartDetails.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-medium line-clamp-1">{item.book?.title}</span>
                                    <span className="text-gray-400 text-xs">Qty: {item.quantity}</span>
                                </div>
                                <span className="font-bold">₹{item.total}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-700 pt-6 space-y-3">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span className="text-green-400 font-bold uppercase text-xs tracking-widest">Free</span>
                        </div>
                        <div className="flex justify-between text-2xl font-extrabold text-blue-400 pt-4 border-t border-gray-800">
                            <span>Total</span>
                            <span>₹{totalAmount}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                        CONFIRM ORDER
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    <p className="text-center text-gray-500 text-xs mt-6 italic">
                        Secure checkout powered by The Crafted Chapter
                    </p>
                </div>
            </div>
        </form>
    );
};

export default Checkout;
