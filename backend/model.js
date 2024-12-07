// File: model.js (Data Layer)
const users = [
    { username: 'admin', password: '1234', type: 'admin'  },
    { username: 'Yao', password: '12345678', type: 'employee' }
];

const jobPosts = [
        { company: 'Amazon', title: 'Frontend Developer', description: 'Responsible for developing and optimizing user interfaces, ensuring interactivity and responsiveness of websites. Proficient in React and JavaScript.', salary: '$70,000' },
        { company: 'Innovate', title: 'Backend Developer',  description: 'Focuses on server-side development and maintenance, designing efficient APIs and database interactions. Requires expertise in Node.js and Express framework.', salary: '$80,000' },
        { company: 'Google', title: 'Full Stack Developer',  description: 'Capable of independently handling both frontend and backend development to build complete web applications. Skilled in React, Node.js, and MongoDB.', salary: '$85,000' },
  
];

const companies = [
    { id: 1, name: 'Google', image: '/images/Google.png' },
    { id: 2, name: 'Amazon', image: '/images/Amazon.png' },
    { id: 3, name: 'TechCorp', image: '/images/techcorp.png' },
    { id: 4, name: 'Innovate Ltd', image: '/images/innovate.png' }
];



module.exports = { users, jobPosts, companies };