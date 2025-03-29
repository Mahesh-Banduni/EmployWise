import { setUsers, setError, setLoading, setSelectedUser } from '../store/userSlice';
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from 'react-redux';

const useUserList = () => {

  const dispatch = useDispatch();

  const getUserById = async (userId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/api/users/${userId}`);
      dispatch(setSelectedUser(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch user details';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateUser = async (userId, userData) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      
      // Append User data
      Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
      });
      
      const response = await axiosInstance.put(`/api/users/${userId}}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update user details';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteUser = async (userId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(`/api/users/${userId}}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      
      const response = await axiosInstance.get(`/api/users`);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      dispatch(setUsers(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching users';
      console.error('Error fetching users:', errorMessage);
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { 
    getUserById,
    updateUser,
    deleteUser,
    fetchUsers
};
}

export default useUserList;
