// components/TabNavigation.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';

interface TabItem {
  name: string;
  count: number;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b relative">
      {tabs.map((tab) => (
        <div 
          key={tab.name}
          className="relative flex-1 text-center"
          onClick={() => onTabChange(tab.name)}
        >
          <button className={`px-4 py-3 text-sm font-medium w-full ${
            activeTab === tab.name ? 'text-amber-500' : 'text-gray-400'
          }`}>
            {tab.name} ({tab.count})
          </button>
          
          {activeTab === tab.name && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"
              layoutId="activeTab"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
