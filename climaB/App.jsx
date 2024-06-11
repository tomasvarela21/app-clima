import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });

  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const saveCity = async (name) => {
    try {
      await axios.post('http://localhost:5000/api/cities', { name });
      fetchCities();
    } catch (error) {
      console.error("Error saving city:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

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

      console.log(data);

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      });

      saveCity(data.location.name);
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Programacion III
        Weather App
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
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
          >
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="h3"
          >
            {weather.temperature} °C
          </Typography>
          <Typography
            variant="h6"
            component="h4"
          >
            {weather.conditionText}
          </Typography>
        </Box>
      )}

      <Typography
        variant="h5"
        component="h3"
        align="center"
        gutterBottom

        //variant="h5"
        //component="h3"
        //sx={{ mt: 2 }}
      >
        
      </Typography>
      

      <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}
