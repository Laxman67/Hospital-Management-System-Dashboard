import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Messages = () => {
  const { isAuthenticated } = useContext(Context);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/message/getall`,
          {
            withCredentials: true,
          }
        );

        setMessages(data.data.messages);
      } catch (error) {
        console.log(`ERROR OCCURED WHILE FETCHING MESSAGES :${error}`);
      }
    };

    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <section className='page messages p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center mb-6'>Messages</h1>
      <div className='banner grid gap-4'>
        {messages && messages.length > 0 ? (
          messages.map((element, index) => {
            return (
              <div
                className='card bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow'
                key={index}
              >
                <div className='details space-y-2'>
                  <p className='text-lg font-semibold'>{element.firstName}</p>
                  <p className='text-lg'>{element.lastName}</p>
                  <p className='text-sm text-gray-500'>
                    <a href={`mailto:${element.email}`}> {element.email}</a>
                  </p>
                  <p className='text-sm text-gray-500'>{element.phone}</p>
                  <p className='text-gray-700'>{element.message}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className='text-xl font-medium text-center text-gray-600'>
            No Messages
          </h3>
        )}
      </div>
    </section>
  );
};

export default Messages;
