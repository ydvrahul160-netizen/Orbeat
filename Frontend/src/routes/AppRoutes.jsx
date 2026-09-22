import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import CreateAlbumPage from "../pages/CreateAlbum";

export default function AppRoutes({
  user,
  musics,
  albums,
  error,

  onLogin,
  onRegister,

  onUpload,
  onCreateAlbum,

  onSelectAlbum,
}) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login
              onLogin={onLogin}
              error={error}
            />
          )
        }
      />

      <Route
        path="/register"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <Register
              onRegister={onRegister}
              error={error}
            />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard
              user={user}
              musics={musics}
              albums={albums}
              onSelectAlbum={onSelectAlbum}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/upload"
        element={
          user?.role === "artist" ? (
            <Upload
              onUpload={onUpload}
              error={error}
            />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />

      <Route
        path="/create-album"
        element={
          user?.role === "artist" ? (
            <CreateAlbumPage
              onCreate={onCreateAlbum}
              error={error}
            />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
    </Routes>
  );
}