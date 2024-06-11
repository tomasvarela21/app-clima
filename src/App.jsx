import { LoadingButton } from "@mui/lab";
import { Box,Container,TextField,Typography,CssBaseline, } from "@mui/material";
import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./index.css";

//const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
 // import.meta.env.VITE_API_KEY
//}&lang=es&q=`;
const API_KEY = "0ac5d2c7dec445dca5a223719240506";
const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };

      setWeather(weatherData);

     /* const response = await axios.post(
        "http://localhost:5001/api/weather",
        weatherData
      );
      console.log("Response from server:", response.data);*/
    } catch (error) {
     setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="xs" className="container">
        <Typography variant="h4" component="h1" className="title">
          Programacion III
        </Typography>
        <Typography variant="h4" component="h1" className="title">   
          App Clima
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 11V9h5v2zm0-4V5h8v2zM8 21q-2.075 0-3.537-1.463T3 16q0-1.2.525-2.238T5 12V6q0-1.25.875-2.125T8 3t2.125.875T11 6v6q.95.725 1.475 1.763T13 16q0 2.075-1.463 3.538T8 21m-3-5h6q0-.725-.312-1.35T9.8 13.6L9 13V6q0-.425-.288-.712T8 5t-.712.288T7 6v7l-.8.6q-.575.425-.888 1.05T5 16"/></svg>
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="city"
            label="Ciudad"
            variant="outlined"
            size="small"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={error.error}
            helperText={error.message}
            className="textField"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Buscando..."
            className="loadingButton"
          >
            Buscar
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13 11V9h5v2zm0-4V5h8v2zM8 21q-2.075 0-3.537-1.463T3 16q0-1.2.525-2.238T5 12V6q0-1.25.875-2.125T8 3t2.125.875T11 6v6q.95.725 1.475 1.763T13 16q0 2.075-1.463 3.538T8 21m-3-5h6q0-.725-.312-1.35T9.8 13.6L9 13V6q0-.425-.288-.712T8 5t-.712.288T7 6v7l-.8.6q-.575.425-.888 1.05T5 16"/></svg>
          </LoadingButton>
        </Box>
        {weather && <WeatherCard weather={weather} />}
        <Typography className="footer">
          Powered by:{" "}
          <a href="https://www.weatherapi.com/" title="Weather API">
            WeatherAPI.com
          </a>
          
        </Typography>
      </Container>
    
  );
}
