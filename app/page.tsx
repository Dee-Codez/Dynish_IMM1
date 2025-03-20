"use client";

// pages/index.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import TabNavigation from '../components/TabNavigation';

interface Order {
  id: string;
  placedTime: string;
  items: { name: string; quantity: number; alert?: boolean }[];
  prepTime: number;
  price: number;
  isDineIn: boolean;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('New');
  
  const tabs = [
    { name: 'New', count: 4 },
    { name: 'Cooking', count: 4 },
    { name: 'Ready', count: 4 },
  ];
  
  const orders: Order[] = [
    {
      id: '777783',
      placedTime: '5/11/23 at 7:30 PM',
      items: [
        { name: 'Margherita Pizza', quantity: 1, alert: true },
        { name: 'Garlic Bread', quantity: 1, alert: true },
      ],
      prepTime: 20,
      price: 200,
      isDineIn: true,
    },
    {
      id: '777786',
      placedTime: '5/11/23 at 8:15 PM',
      items: [
        { name: 'Masala Dosa', quantity: 1, alert: true },
        { name: 'Cold Coffee', quantity: 1, alert: true },
      ],
      prepTime: 18,
      price: 150,
      isDineIn: true,
    },
  ];
  
  const handleStart = (orderId: string) => {
    console.log(`Starting order ${orderId}`);
  };
  
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Live Orders <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1"></span></h1>
        </div>
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
      
      <div className="px-4 py-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by Order No" 
            className="w-full p-2 pl-10 pr-10 border rounded-md bg-white"
          />
          <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <button className="absolute right-2 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
      
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            orderNumber={order.id}
            placedTime={order.placedTime}
            items={order.items}
            prepTime={order.prepTime}
            price={order.price}
            isDineIn={order.isDineIn}
            onStart={() => handleStart(order.id)}
          />
        ))}
      </motion.div>
      
      <div className="fixed bottom-4 right-4">
        <motion.button 
          className="bg-gray-200 p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
