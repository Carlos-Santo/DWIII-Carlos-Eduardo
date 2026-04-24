import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, "../views")));
app.use(express.json());

// Rota para buscar clima
app.get("/weather", async (req, res) => {
    const city = req.query.city as string;

    if (!city) {
        return res.status(400).json({ error: "Cidade não informada" });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );

        const data = response.data;

        const weather = {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };

        res.json(weather);

    } catch (error: any) {
        res.status(404).json({ error: "Cidade não encontrada" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
