// components/OrderCard.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';

type OrderType = 'Dine-in' | 'Takeaway' | 'Delivery';

interface OrderItem {
  name: string;
  quantity: number;
  alert?: boolean;
}

interface OrderCardProps {
  orderNumber: string;
  placedTime: string;
  items: OrderItem[];
  prepTime: number;
  price: number;
  orderType: OrderType;
  buttonText: string;
  onAction: () => void;
}

const OrderCard: FC<OrderCardProps> = ({
  orderNumber,
  placedTime,
  items,
  prepTime,
  price,
  orderType,
  buttonText,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Order #{orderNumber}</h3>
          <p className="text-sm text-gray-500">Placed on {placedTime}</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {orderType}
        </span>
      </div>
      
      <div className="space-y-2 my-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.alert && (
              <span className="text-red-500 mr-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
            )}
            <p className="text-gray-700">{item.name} × {item.quantity}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center text-amber-700">
          <span className="mr-2">⏱</span>
          <p>Prep Time: {prepTime} min</p>
        </div>
        <p className="font-bold text-amber-500">₹{price}</p>
      </div>
      
      <div
        className={`mt-4 flex items-center ${
            buttonText !== "Start" ? "justify-between" : "justify-start"
        }`}
        >
        <div className="text-slate-600 text-sm">
        {(buttonText === "Ready" || buttonText === "Complete") && (
            <div className="flex items-center gap-1">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
                </svg>
                <p>{buttonText === "Ready" ? "Print KOT" : "Print Bill"}</p>
            </div>
            )}
        </div>
        <motion.button
            className="w-1/3 bg-blue-500 text-white py-2 rounded-md flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onAction();
            }}
        >
            <svg
            className="w-5 h-5 mr-2"
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
            {buttonText}
        </motion.button>
        </div>
    </div>
  );
};

export default OrderCard;
