import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setMessage(e.target.value);
    setSent(false); // reset sent flag when typing new message
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSendClick = () => {
    if (message.trim() === '') return;
    setSent(true);
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

      <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${landlord.email}&su=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
  target="_blank"
  rel="noopener noreferrer"
  className={`bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 ${
    message.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`}
  onClick={(e) => {
    if (message.trim() === '') {
      e.preventDefault();
      alert('Please enter a message before sending.');
      return;
    }
    handleSendClick();
  }}
>
  Send Message
</a>


          {sent && <p className='text-green-600 mt-2'>Your email client should open now. Check and send your message!</p>}
        </div>
      )}
    </>
  );
}
