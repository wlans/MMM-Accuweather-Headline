const NodeHelper = require("node_helper");
const axios = require("axios");

module.exports = NodeHelper.create({
    // Initialize the module
    start: function () {
        console.log("Starting weatherHeadlineWithEmoji module");
    },

    // Respond to socket notifications from the frontend
    socketNotificationReceived: function (notification, payload) {
        if (notification === "FETCH_WEATHER_HEADLINE") {
            // Fetch the weather headline and send it to the frontend
            this.fetchWeatherHeadline(payload.apiKey, payload.locationKey);
        }
    },

    // Fetch the weather headline
    fetchWeatherHeadline: function (apiKey, locationKey) {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

        // Fetch data using axios
        axios.get(url)
            .then(response => {
                if (response.data && response.data.Headline) {
                    const headline = response.data.Headline;
                    console.log("Sending weather headline:", headline);  // Log when sending data
                    this.sendSocketNotification("WEATHER_HEADLINE", { headline: headline });  // Send headline to frontend
                } else {
                    console.error("No headline data found in response.");
                }
            })
            .catch(error => {
                console.error("Error fetching weather headline:", error);
                this.sendSocketNotification("WEATHER_HEADLINE", { headline: "Error fetching weather headline." });  // Handle error gracefully
            });
    }
});
