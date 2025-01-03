import React from 'react';

const Greeting = () => {
  const currentHour = new Date().getHours();
  let message;

  if (currentHour < 12) {
    message = "Buenos días, con que te gustaria empezar el dia?";
  } else if (currentHour < 18) {
    message = "Buenas tardes, que te gustaria escuchar?";
  } else {
    message = "Buenas noches, antes de dormir que vamos a escuchar?";
  }

  return (
    <div>
      <h1 className='text-white m-3 font-bold text-3xl' >{message}</h1>
    </div>
  );
};

export default Greeting;