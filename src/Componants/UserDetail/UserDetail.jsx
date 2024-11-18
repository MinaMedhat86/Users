import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


export default function UserDetail() {



  const { id } = useParams(); 
  const [searchParams] = useSearchParams(); 
  const isEditMode = searchParams.get('edit') === 'true'; 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const navigate = useNavigate();

  // ================ user details ======================
  async function fetchUser () {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      const userData = response.data.data;
      setUser(userData);
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to fetch user details!');
    }
  };

  // ================ Update user details ==================
  const updateUser = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, formData);
      toast.success('User updated successfully!');
    } catch (error) {
      toast.error('Failed to update user!');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return <>
    <div className="container mt-4">
      <h2 className="text-center mb-4">{isEditMode ? 'Edit User' : 'View User'}</h2>

      {loading ? <>
        <div className="text-center">
          <p>Loading...</p>
        </div>
          </>: user ? <>
          <div className="card p-4">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                readOnly={!isEditMode} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                readOnly={!isEditMode} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditMode} 
              />
            </div>

            {/* ============= Update Button =================== */}
            {isEditMode ? <button className="btn btn-success me-2" onClick={updateUser}>
                Update User
              </button>
            : null}

            {/* ================  Back Button ================ */}
            <button
              className="btn btn-secondary mt-4 me-2"
              onClick={() => navigate('/users')}
            >
              Back to Users
            </button>
          </div>
          
        </> 
        : null
      }

      <ToastContainer />
    </div>
</>
};


