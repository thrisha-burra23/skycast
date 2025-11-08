import { useEffect, useState } from "react";
import Button from "./Button";

const Weather = () => {
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const fetchWeather = async () => {

   
    try {
      
      setLoading(true);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      if (!response.ok) {
        throw new Error("Error occured in loading ....");
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("getting weather details...");
    fetchWeather();
  }, []);

  if (error)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-600 font-bold text-3xl text-center px-6">
        Error...{error}
      </p>
    </div>
  );

if (loading)
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-600 italic font-medium text-3xl text-center px-6">
        Loading...
      </p>
    </div>
  );


 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-black-600">SkyCast...</h1>
      <label htmlFor="latitute" className="mb-2">Enter Latitude</label>
      <input
        className="w-full p-2 mb-4 bg-white border rounded-2xl"
        type="number"
        onChange={(event) => setLatitude(event.target.value)}
        placeholder="Enter a Latitude"
        value={latitude}
        id="latitude"
      />
      <label htmlFor="longitude" className="mb-2">Enter Longitude</label>
      <input
        className="w-full p-2 mb-4 bg-white border rounded-2xl"
        type="number"
        onChange={(event) => setLongitude(event.target.value)}
        placeholder="Enter a Longitude"
        value={longitude}
        id="longitude"
      />
      <Button onClick={fetchWeather}>Get Weather</Button>
      {weather && weather.current_weather && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Current Weather</h3>
          <p>🌡️ Temperature: {weather.current_weather.temperature}°C</p>
          <p>💨 Windspeed: {weather.current_weather.windspeed} km/h</p>
          <p>🌍 Weather Code: {weather.current_weather.weathercode}</p>
        </div>
      )}
    </div>
  </div>
);

  
};

export default Weather;
