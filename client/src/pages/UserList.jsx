import React, { useEffect, useState } from 'react';
import UserListCard from '../components/UserListCard';
import useUserList from '../hooks/useUserList';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Users } from 'lucide-react';
import {useNavigate } from "react-router-dom";

const AllUsers = () => {
  
  const navigate = useNavigate();
  const { 
    fetchUsers,
    updateUser,
    deleteUser,
  } = useUserList();

  // Get users and loading state from Redux store
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, []);  
 
  const handleEditUser = async (userId, userData) => {
    try {
      const response=await updateUser(userId, userData);
      console.log(response);
      if(response?.updatedAt){
      toast.success('User Details updated successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });
    }

    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user. Please try again...', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response=await deleteUser(userId);
      console.log(response);
      
      toast.success('User deleted successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });

      
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user. Please try again...', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <Users className="w-8 h-8 mr-3 text-emerald-600 " />
          EmployWise All Users
        </h1>
        <div className="w-full sm:w-auto">
          <div className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg shadow-lg">
            <p className="text-white font-medium">
              <span className="font-bold">Total Users:</span> {users?.length || 0}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {users && users.length > 0 ? (
          users.map(user => (
            <UserListCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-xl font-medium">No users found</p>
            <p className="mt-2">Users added to the system will appear here</p>
          </div>
        )}
      </div>
      
    </div>
    </>
  );
};

export default AllUsers;