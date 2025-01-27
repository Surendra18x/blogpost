import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="h-screen w-full flex flex-col bg-contain  bg-[url(https://png.pngtree.com/background/20210710/original/pngtree-fist-recruitment-requires-you-to-have-a-minimalist-background-picture-image_1004745.jpg)] ">
      <div className="w-full  min-h-screen flex flex-col  ">
        <Header />
        <main className="flex-1">
          {" "}
          <Outlet />{" "}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
