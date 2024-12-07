# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Job Portal System

This is a comprehensive Job Portal system built using a **React frontend**, a **Node.js backend**, and **Express.js**. It includes features for user login, job listings, and company profiles. The portal dynamically retrieves data from the backend and displays it on the frontend.

---

## Features

### User Authentication:
- Login using pre-stored credentials.
- Secure session management.

### Job Listings:
- Display a list of available jobs dynamically.
- Details include role, required skills, and salary.

### Company Profiles:
- Display company names and logos dynamically fetched from the backend.

---

## Project Structure

### **Backend Directory**
The backend follows a RESTful architecture.

```plaintext
backend/
├── server.js            # Entry point for the server
├── router.js            # Routes for API endpoints
├── controller.js        # Logic for handling API requests
├── service.js           # Business logic
├── model.js             # Simulated database (static data)
├── images/              # Static files for company logos
│   ├── techcorp.png
│   ├── innovate.png
```

- **`server.js`**: Configures the Express app, middleware, and server.
- **`router.js`**: Maps API endpoints to the appropriate controllers.
- **`controller.js`**: Processes API requests and interacts with services.
- **`service.js`**: Contains the core business logic.
- **`model.js`**: Simulated database containing static data for users, jobs, and companies.
- **`images/`**: Static assets folder to host company logos.

---

### **Frontend Directory**
The frontend is a React application that uses **React Router** for navigation and **Axios** for API communication.

```plaintext
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js         # Login page
│   │   ├── Home.js          # Homepage
│   │   ├── About.js         # About page
│   │   ├── Jobs.js          # Job listings page
│   │   ├── Companies.js     # Company profiles page
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point for React
```

- **`Login.js`**: Handles user login and redirects upon successful authentication.
- **`Jobs.js`**: Displays job listings fetched from the backend.
- **`Companies.js`**: Displays company profiles including logos served from the backend.
- **`App.js`**: Configures routes for navigation.

---

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or above)
- **npm** or **yarn**
- A code editor (e.g., VSCode)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the `images/` folder exists and contains the company logo files.
4. Start the server:
   ```bash
   node server.js
   ```
5. Verify the server is running at `http://localhost:5001`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

---

## Navigation

### Routes:
- **`/`**: Login page.
- **`/home`**: Welcome page after successful login.
- **`/about`**: Information about the portal.
- **`/jobs`**: List of available jobs.
- **`/companies`**: List of companies with their logos.

### API Endpoints:
- **POST `/api/login`**:
  - Request: `{ "username": "<username>", "password": "<password>" }`
  - Response (success): `{ "success": true, "message": "Login successful" }`
  - Response (failure): `{ "success": false, "message": "Invalid credentials" }`

- **GET `/api/jobs`**:
  - Response:
    ```json
    [
      { "id": 1, "role": "Frontend Developer", "skills": "React, JavaScript", "salary": "$70,000" },
      { "id": 2, "role": "Backend Developer", "skills": "Node.js, Express", "salary": "$80,000" }
    ]
    ```

- **GET `/api/companies`**:
  - Response:
    ```json
    [
      { "id": 1, "name": "TechCorp", "image": "/images/techcorp.png" },
      { "id": 2, "name": "Innovate Ltd", "image": "/images/innovate.png" }
    ]
    ```

---

## Troubleshooting

### Backend
- **Problem**: `Cannot GET /images/<filename>`
  - **Solution**: Ensure the `images` folder exists and contains the correct files. Verify `server.js` includes:
    ```javascript
    app.use('/images', express.static('images'));
    ```

### Frontend
- **Problem**: Blank screen on startup.
  - **Solution**: Ensure `index.js` uses React 18's `ReactDOM.createRoot()` method.

- **Problem**: API calls fail.
  - **Solution**: Verify backend is running at `http://localhost:5001` and frontend Axios calls use the correct URL.

---

## Future Enhancements
- Add a registration page for new users.
- Implement real-time updates for job listings.
- Use a database for dynamic data instead of static JSON.
- Deploy the application to a cloud platform (e.g., AWS, Heroku, or Netlify).

---

## License
This project is licensed under the MIT License. Feel free to modify and use it for your own projects.

