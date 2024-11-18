import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

export default function UserListing() {
  
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function getUsers (){
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to fetch users!');
    }
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/users/${id}?edit=true`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Listing</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ================== Loader =================== */}
      {loading ? <>
        <div className="text-center">
          <ThreeDots
            height="80"
            width="80"
            color="#007bff"
            ariaLabel="loading"
            visible={loading}
          />
        </div>
      </> :  <>
          {/* ================== User Table =================== */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => handleView(user.id)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ======================== Pagination Controls ==================== */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-secondary"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              className="btn btn-secondary"
              disabled={users.length === 1}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      }

      <ToastContainer />
    </div>
  );
};


