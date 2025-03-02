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

  // Updating the UI when user logs in/out
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  // Fetch real-time weather + forecast
  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `http://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: location,
            aqi: "yes",
          },
        }
      );

      

      setWeatherData(weatherResponse.data);
     
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
