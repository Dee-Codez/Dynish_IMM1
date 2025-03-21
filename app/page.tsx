"use client";

// pages/index.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import TabNavigation from '../components/TabNavigation';
import { useSwipe } from '@/hooks/useSwipe';

interface OrderItem {
  name: string;
  quantity: number;
  alert: boolean;
}

interface Order {
  id: string;
  placedTime: string;
  items: OrderItem[];
  prepTime: number;
  price: number;
  isDineIn: boolean;
  status: 'New' | 'Cooking' | 'Ready';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'New' | 'Cooking' | 'Ready'>('New');
  const [swipeDirection, setSwipeDirection] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const [orders, setOrders] = useState<Order[]>([
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
      status: 'New'
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
      status: 'New'
    },
    {
      id: '777789',
      placedTime: '5/11/23 at 8:45 PM',
      items: [
        { name: 'Paneer Butter Masala', quantity: 1, alert: false },
        { name: 'Butter Naan', quantity: 2, alert: false },
      ],
      prepTime: 25,
      price: 300,
      isDineIn: false,
      status: 'Cooking'
    },
    {
      id: '777792',
      placedTime: '5/11/23 at 9:00 PM',
      items: [
        { name: 'Chicken Biryani', quantity: 1, alert: true },
        { name: 'Raita', quantity: 1, alert: false },
      ],
      prepTime: 30,
      price: 250,
      isDineIn: true,
      status: 'Cooking'
    },
    {
      id: '777795',
      placedTime: '5/11/23 at 9:30 PM',
      items: [
        { name: 'Veg Manchurian', quantity: 1, alert: false },
        { name: 'Fried Rice', quantity: 1, alert: false },
      ],
      prepTime: 20,
      price: 180,
      isDineIn: false,
      status: 'Ready'
    },
    {
      id: '777798',
      placedTime: '5/11/23 at 9:45 PM',
      items: [
        { name: 'Pasta Alfredo', quantity: 1, alert: false },
        { name: 'Garlic Bread', quantity: 1, alert: false },
      ],
      prepTime: 15,
      price: 220,
      isDineIn: true,
      status: 'Ready'
    },
  ]);
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => order.status === activeTab);
  
  // Count orders in each status
  const tabCounts = {
    New: orders.filter(order => order.status === 'New').length,
    Cooking: orders.filter(order => order.status === 'Cooking').length,
    Ready: orders.filter(order => order.status === 'Ready').length,
  };
  
  const tabs = [
    { name: 'New', count: tabCounts.New },
    { name: 'Cooking', count: tabCounts.Cooking },
    { name: 'Ready', count: tabCounts.Ready },
  ];
  
  // Find current tab index
  const currentTabIndex = tabs.findIndex(tab => tab.name === activeTab);
  
  // Handle tab change with animation direction
  const handleTabChange = (tab: string, direction: number) => {
    if (isDragging) return; // Prevent tab change during drag
    
    setSwipeDirection(direction);
    setActiveTab(tab as 'New' | 'Cooking' | 'Ready');
  };
  
  const handleAction = (orderId: string) => {
    if (isDragging) return; // Prevent action during drag
    
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => {
        if (order.id === orderId) {
          if (order.status === 'New') return { ...order, status: 'Cooking' };
          if (order.status === 'Cooking') return { ...order, status: 'Ready' };
          if (order.status === 'Ready') {
            return { ...order, status: 'Completed' };
          }
        }
        return order;
      });
      
      // Find the updated order to determine which tab to switch to
      const updatedOrder = updatedOrders.find(order => order.id === orderId);
      if (updatedOrder && updatedOrder.status !== 'Completed') {
        // Switch to the tab matching the new status
        setTimeout(() => {
          setActiveTab(updatedOrder.status);
          setSwipeDirection(1); // Animation direction
        }, 100);
      }
      
      return updatedOrders;
    });
  };
  
  
  // Get button text based on tab
  const getButtonText = (tabName: string) => {
    switch(tabName) {
      case 'New': return 'Start';
      case 'Cooking': return 'Ready';
      case 'Ready': return 'Complete';
      default: return 'Start';
    }
  };
  
  // Handle drag end for swipe
  const handleDragEnd = (e: any, info: any) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x < 0 ? 1 : -1;
      const nextIndex = currentTabIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < tabs.length) {
        // Small delay to ensure animation completes
        setTimeout(() => {
          handleTabChange(tabs[nextIndex].name, direction);
        }, 50);
      }
    }
    
    // Reset dragging state
    setIsDragging(false);
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      const nextIndex = currentTabIndex + 1;
      if (nextIndex < tabs.length) {
        handleTabChange(tabs[nextIndex].name, 1);
      }
    },
    onSwipeRight: () => {
      const prevIndex = currentTabIndex - 1;
      if (prevIndex >= 0) {
        handleTabChange(tabs[prevIndex].name, -1);
      }
    },
    threshold: 50
  });
  
  return (
    <div className="max-w-md mx-auto text-black bg-gray-50 min-h-screen overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Live Orders <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-ping"></span></h1>
        </div>
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
      
      <div className="px-4 pb-2 flex items-center">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by Order No" 
            className="w-full p-2 pl-10 pr-4 border rounded-md bg-white"
          />
          <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="ml-2 flex flex-col items-center">
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <span className="text-xs text-gray-500">History</span>
        </div>
      </div>
      
      <TabNavigation 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(tab) => handleTabChange(tab, tab === activeTab ? 0 : 
          tabs.findIndex(t => t.name === tab) > currentTabIndex ? 1 : -1)} 
      />
      <div 
        className="relative overflow-hidden"
        {...swipeHandlers}
        style={{ touchAction: 'pan-y' }}
      >
      <div className="relative overflow-hidden">
        <motion.div 
          className="touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeTab}
              className="p-4 overflow-y-auto max-h-[calc(100vh-180px)]"
              initial={{ opacity: 0, x: 100 * swipeDirection }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 * swipeDirection }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3 
              }}
            >
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  orderNumber={order.id}
                  placedTime={order.placedTime}
                  items={order.items}
                  prepTime={order.prepTime}
                  price={order.price}
                  isDineIn={order.isDineIn}
                  buttonText={getButtonText(activeTab)}
                  onAction={() => handleAction(order.id)}
                />
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No orders in this category
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
