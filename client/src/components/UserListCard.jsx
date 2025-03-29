import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2, Star, Mail } from 'lucide-react';
import UserEditForm from './UserEditForm';

const UserListCard = ({ user, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };
    
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(user.id);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-4 overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col space-y-4 sm:space-y-0 justify-between items-start w-full p-4" 
                     onClick={() => setIsExpanded(!isExpanded)}>
                    {/* User Info Container */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                        <div className="flex items-center gap-4 w-full">
                        {/* User Image */}
                        <div className="flex-shrink-0">
                            <img 
                                src={user.avatar} 
                                alt={user.first_name} 
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                        </div>
                        
                        {/* User Details */}
                        <div className="flex flex-col space-y-2 flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800">{user.first_name} {user.last_name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                {user.email}
                            </div>
                            
                        </div>
                        </div>

                        {/* Action Buttons - Desktop View */}
                        <div className="flex sm:flex justify-items-end space-x-2">
                            <button 
                                onClick={handleEdit}
                                className="flex items-center justify-center px-3 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors shadow-sm"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors shadow-sm"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                
                </div>

            {/* Edit Modal */}
            <UserEditForm
                user={user}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={onEdit}
            />
        </>
    );
};

export default UserListCard;