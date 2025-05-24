# Cloud Media Sharing App

This is a full-stack web application for uploading, viewing, and managing user photos and videos. Users can register, log in, upload media, view their uploads in a gallery, preview media in full screen, download or delete their files, and track upload progress in real time.

## Features

- **User Authentication:** Register, login, and logout with instant UI updates.
- **Media Upload:** Upload images (JPG, PNG, GIF, WEBP) with file size/type validation and preview before upload.
- **Background Uploads:** Uploads happen in the background, and progress is shown on the profile page.
- **Gallery View:** See all your uploaded media in a responsive grid.
- **Full-Screen Viewer:** Click any media to view it in full screen with Previous/Next navigation, Download, and Delete options.
- **Toast Notifications:** All important actions (login, logout, upload, errors, etc.) use toast notifications for feedback.
- **Profile Management:** View and edit your profile, including your profile picture.
- **Responsive UI:** Works well on desktop and mobile devices.

## Tech Stack

- **Frontend:** React, React Router, Axios, React Toastify, Tailwind CSS (or your chosen CSS framework)
- **Backend:** Node.js, Express, MongoDB (not included in this repo)
- **Authentication:** JWT (stored in cookies)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Backend API running (see backend repo or instructions)

### Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/sushilnamberdar/cloud.git
    cd cloud/frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

- Update `src/api.js` with your backend API base URL if needed.
- Place your logo in `public/logo.png` to customize the favicon.

## Folder Structure

```
src/
  Component/
    Photos/
    UploadPage/
    UserProfilePage.jsx
    LoginPage.jsx
    ...
  context/
    UploadContext.jsx
  api.js
  App.jsx
public/
  logo.png
  index.html
```

## Usage

- **Register/Login:** Create an account or log in.
- **Upload Media:** Go to the upload page, select a file, preview it, and click Upload.
- **View Gallery:** See your uploads on the gallery page.
- **Full-Screen View:** Click any media to view, download, or delete.
- **Profile:** View your profile and upload progress.

## License

This project is licensed under the MIT License.

---

**Made with ❤️ using React and Node.js**