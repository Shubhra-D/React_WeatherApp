import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./AuthComponent/Navbar";
import Home from "./Pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import axios from "axios";
const API_KEY = "6d2b4f216f4b43df90535020250103";

function App() {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //updating the UI if user logged out
  useEffect(() => {
    const unSunscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSunscribe();
  }, []);
  //fethc the real time weather
  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: location,
            aqi: "yes",
          },
        }
      );
      setWeatherData(response.data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Location not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Home
        user={user}
        fetchWeather={fetchWeather}
        weatherData={weatherData}
        loading={loading}
        error={error}
      />
    </>
  );
}

export default App;
