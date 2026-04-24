async function getWeather() {
    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("result");

    if (!city) {
        resultDiv.innerHTML = "<p>Digite uma cidade!</p>";
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        resultDiv.innerHTML = `
            <h2>${data.city}, ${data.country}</h2>
            <img src="${data.icon}" />
            <p>Temperatura: ${data.temperature}°C</p>
            <p>Sensação térmica: ${data.feels_like}°C</p>
            <p>Umidade: ${data.humidity}%</p>
            <p>${data.description}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "<p>Erro ao buscar dados</p>";
    }
}