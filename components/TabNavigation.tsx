// components/TabNavigation.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  tabs: { name: string; count: number }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <div 
          key={tab.name}
          className="relative"
          onClick={() => onTabChange(tab.name)}
        >
          <button className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.name ? 'text-amber-500' : 'text-gray-500'
          }`}>
            {tab.name} ({tab.count})
          </button>
          
          {activeTab === tab.name && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
              layoutId="activeTab"
              initial={false}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
