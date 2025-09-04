# YouTube Clone Frontend

This is the frontend for the YouTube Clone project, built with React, Redux Toolkit, Tailwind CSS, and Axios.  
It connects to the backend API (Node.js/Express/MongoDB) and is designed to be deployed on Netlify.

---

## Features

- User authentication (JWT)
- Channel creation and customization
- Video listing, viewing, liking, commenting
- Subscribe/unsubscribe to channels
- Edit/delete comments and videos
- Responsive UI with modern loader and popup components
- Recommended videos sidebar
- Search and filter videos
- Protected routes for authenticated actions

---

## Tech Stack

- **React**
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS**
- **Font Awesome** (for icons)
- **Vite** (for fast development/build)

---

## Folder Structure

```
YouTubeClone FrontEnd/
├── public/                # Static files
├── src/
│   ├── assets/            # Images/icons
│   ├── components/        # Reusable UI components
│   ├── helpers/           # Axios interceptor
│   ├── Pages/             # Main pages
│   ├── redux/             # Redux store and slices
│   ├── App.jsx, main.jsx  # Entry points
│   ├── App.css, index.css # Styles
├── .env                   # Environment variables
├── .env.production        # Production environment variables
├── package.json
├── vite.config.js
├── index.html
```

---

## Getting Started

### 1. **Clone the repository**
```
git clone https://github.com/mohitbisht007/Youtube-Frontend
cd Youtube-Frontend
```

### 2. **Install dependencies**
```
npm install
```

### 3. **Environment Variables**

If do not have .env File then Crate one `.env` file in the root directory with:

```
VITE_API_URL=http://localhost:5050
```

For production, use `.env.production`:

```
VITE_API_URL=https://youtube-backend-bl51.onrender.com
```

### 4. **Start the development server**
```
npm run dev
```

---

## Deployment

- **Netlify:** Deploy the frontend.  
  Set `VITE_API_URL` in Netlify environment variables to your Render backend URL.

---

## Usage

- Sign up and log in to create a channel.
- Upload videos (links are converted to embed format and thumbnails are fetched).
- Like, comment, and subscribe to channels.
- Edit your profile, channel, videos, and comments.
- Enjoy a modern, responsive UI!

---

## Notes

- Make sure Font Awesome CSS is loaded for icons (add to `index.html` if needed).
- Loader and Popup components are reusable and modern.
- Uses environment variables for switching between local and production backend URLs.
- All API requests are handled via Axios with JWT authentication.

---

## License

MIT

---

## Author

Mohit Singh Bisht  
[GitHub](https://github.com/mohitbisht007)