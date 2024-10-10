import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../main';

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const handleNewAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/admin/register`,
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          nic,
          dob,
          gender,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.message);
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <section className='page'>
        return (
        <div className='container form-component add-admin-form'>
          <img src='./logo_zeecare.png' alt='logo' />
          <h1 className='form-title'>ADD NEW ADMIN</h1>

          <form onSubmit={handleNewAdmin}>
            <div>
              <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='number'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type='number'
                placeholder='NIC'
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <input
                type='date'
                placeholder='Date of Birth '
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Select</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Others'>Others</option>
              </select>
              <input
                type='password'
                placeholder='Password '
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
        );
      </section>
    </>
  );
};

export default AddNewAdmin;
