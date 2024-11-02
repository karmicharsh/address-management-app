import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaUsers, FaStar, FaTrash, FaEdit } from 'react-icons/fa';
import { RootState } from '../store';
import { deleteAddressThunk, toggleFavoriteThunk } from '../store/LocationSlice';
import { Address } from '../types/address';

interface AddressListProps {
  onEdit: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({ onEdit }) => {
  const addresses = useSelector((state: RootState) => state.location.addresses);
  const dispatch = useDispatch();

  const getIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <FaHome className="text-xl" />;
      case 'office':
        return <FaBriefcase className="text-xl" />;
      default:
        return <FaUsers className="text-xl" />;
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <AnimatePresence>
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.8 }}
            className="card hover:translate-y-[-2px] group"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {getIcon(address.type)}
                </div>
                <div>
                  <h3 className="font-semibold capitalize text-gray-800 dark:text-white">
                    {address.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {address.apartment && `${address.apartment}, `}
                    {address.street}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {address.area}, {address.city}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {address.state} {address.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(toggleFavoriteThunk(address.id))}
                  className={`p-2 rounded-full ${
                    address.isFavorite 
                      ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                      : 'text-gray-400 bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaStar />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onEdit(address)}
                  className="p-2 rounded-full text-blue-500 bg-blue-100 dark:bg-blue-900"
                >
                  <FaEdit />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(deleteAddressThunk(address.id))}
                  className="p-2 rounded-full text-red-500 bg-red-100 dark:bg-red-900"
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddressList;