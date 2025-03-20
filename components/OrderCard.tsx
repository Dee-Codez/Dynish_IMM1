// components/OrderCard.tsx
import { motion } from 'framer-motion';
import { FC } from 'react';

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
  onStart: () => void;
  isDineIn?: boolean;
}

const OrderCard: FC<OrderCardProps> = ({
  orderNumber,
  placedTime,
  items,
  prepTime,
  price,
  onStart,
  isDineIn = false,
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-4 mb-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          <motion.div 
            key={index} 
            className="flex items-center"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.alert && (
              <motion.div 
                className="text-red-500 mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ⚠️
              </motion.div>
            )}
            <p className="text-gray-700">{item.name} × {item.quantity}</p>
          </motion.div>
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
      >
        <span className="mr-2">⚡</span>
        Start
      </motion.button>
    </motion.div>
  );
};

export default OrderCard;
