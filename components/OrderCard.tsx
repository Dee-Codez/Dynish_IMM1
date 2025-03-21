// components/OrderCard.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';

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
  isDineIn?: boolean;
  buttonText: string;
  onAction: () => void;
}

const OrderCard: FC<OrderCardProps> = ({
  orderNumber,
  placedTime,
  items,
  prepTime,
  price,
  isDineIn = false,
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
        {isDineIn && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            Dine-in
          </span>
        )}
      </div>
      
      <div className="space-y-2 my-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.alert && (
              <span className="text-red-500 mr-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
      
      <motion.button
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          onAction();
        }}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {buttonText}
      </motion.button>
    </div>
  );
}

export default OrderCard;
