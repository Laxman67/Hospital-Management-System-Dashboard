import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../main';

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [doctorDepartment, setDoctorDepartment] = useState('');
  const [docAvatar, setDocAvatar] = useState('');
  const [docAvatarPreview, setDocAvatarPreview] = useState('');

  const navigateTo = useNavigate();

  // TODO extract and check how  this is workig
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleNewDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(); //Especially when upload files
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('dob', dob);
      formData.append('nic', nic);
      formData.append('gender', gender);
      formData.append('doctorDepartment', doctorDepartment);
      formData.append('password', password);
      formData.append('docAvatar', docAvatar);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/doctor/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data.message);
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const departmentsArray = [
    'Pediatrics',
    'Orthopedics',
    'Cardiology',
    'Neurology',
    'Oncology',
    'Radiology',
    'Physical Therapy',
    'Dermatology',
    'ENT',
  ];

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <section className='page'>
        return (
        <div className='container form-component add-doctor-form'>
          <img src='./logo_zeecare.png' alt='logo' />
          <h1 className='form-title'>REGISTER NEW DOCTOR</h1>

          <form onSubmit={handleNewDoctor}>
            <div className='first-wrapper'>
              <div className='doctor-image'>
                <img
                  src={docAvatarPreview ? docAvatarPreview : './docavatar.png'}
                  alt='doctor avatar'
                />
                <input type='file' onChange={handleAvatar} />
              </div>
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

                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                >
                  <option value=''>Select Department</option>
                  {departmentsArray.map((element, index) => {
                    return (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
                <button type='submit'>REGISTER NEW DOCTOR</button>
              </div>
            </div>
          </form>
        </div>
        );
      </section>
    </>
  );
};

export default AddNewDoctor;
