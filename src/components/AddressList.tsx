import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaBriefcase, FaUsers, FaStar, FaTrash, FaEdit } from 'react-icons/fa';
import { RootState } from '../store';
import { deleteAddress, toggleFavorite } from '../store/LocationSlice';
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

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border rounded-lg p-4 flex items-start justify-between"
        >
          <div className="flex gap-4">
            <div className="text-gray-600">{getIcon(address.type)}</div>
            <div>
              <h3 className="font-semibold capitalize">{address.type}</h3>
              <p className="text-gray-600">
                {address.apartment && `${address.apartment}, `}
                {address.street}
              </p>
              <p className="text-gray-600">
                {address.area}, {address.city}
              </p>
              <p className="text-gray-600">
                {address.state} {address.zipCode}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleFavorite(address.id))}
              className={`p-2 rounded-full ${
                address.isFavorite ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              <FaStar />
            </button>
            <button
              onClick={() => onEdit(address)}
              className="p-2 rounded-full text-blue-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => dispatch(deleteAddress(address.id))}
              className="p-2 rounded-full text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;