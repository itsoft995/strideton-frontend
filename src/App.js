import { Route, Routes, useLocation } from "react-router-dom";
import rootRoutes from "./routes/rootRootes";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import api from "./utils/request";
import load from "./assets/images/load.png";
function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scroll({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  const fetchData = async (userInfo) => {
    try {
      const response = await api.post("/admin/user/update", userInfo);
      if (response.data) {
        setLoading(false);
        if (response.data.data) {
          localStorage.setItem("user_info", JSON.stringify(response.data.data));
        } else {
          localStorage.setItem("user_info", JSON.stringify({}));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetch");
    }
  };

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
          setLoading(false);
          localStorage.setItem("user_id", user.id);
          fetchData({
            user_id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
          });
        } else {
          // alert("Пользователь не найден");
          fetchData({
            user_id: 349499,
            firstName: " user.first_name",
            lastName: "user.last_name",
            username: " user.username",
          });
        }

      } else {
        alert("Telegram WebApp не обнаружен");
        // fetchData({
        //   user_id: 349499,
        //   firstName: " user.first_name",
        //   lastName: "user.last_name",
        //   username: " user.username",
        // });
      }
    };

    setTimeout(initializeTelegramWebApp, 2000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${load})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="loader" style={{ "--loader-color": "white", bottom: '-30vh', position: 'relative' }}></div>
      </div>
    );
  }
  return (
    <div className="container">
      <Routes>
        {rootRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
