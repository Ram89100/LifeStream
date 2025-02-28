import React from 'react'

const About = () => {
  return (
    <div className='px-44'>
      <p className='text-4xl font-bold text-center underline mt-4'>About LifeStream</p>
      <br />
      <p className='text-lg'>LifeStream serves as a platform for individuals to register as blood donors, making it easier to manage both blood donation requests and donations. It also provides blood banks with the tools to efficiently manage their inventory by tracking pending donations, requests, scheduling blood drives, and overseeing them. The system authenticates users and blood banks using their mobile numbers as usernames and passwords to access all available features.</p>
      <br />
      <p className='text-lg'>Key features include:</p>
      <ul className='list-disc pl-8'>
        <li>Efficient tracking and management of blood donations</li>
        <li>Connecting donors with recipients in need of blood</li>
        <li>Providing real-time updates on blood shortages and donation requirements</li>
      </ul>
      <br />
      <p className='text-lg'>The platform includes both a user-facing interface and a dedicated interface for blood banks to streamline data management and optimize donation processes.</p>
      <p className='text-right text-5xl'>
        <br />
        <a target="_blank" href="https://www.linkedin.com/in/kumar-ram-krishna-28b350282/" className='hover:drop-shadow-md hover:text-metal'><i class="fa-brands fa-linkedin"></i> </a>&nbsp;&nbsp;
        <a target="_blank" href="https://github.com/ram89100/" className='hover:drop-shadow-md hover:text-purple'><i class="fa-brands fa-github"></i></a>&nbsp;&nbsp;&nbsp;
      </p>
    </div>
  )
}

export default About
