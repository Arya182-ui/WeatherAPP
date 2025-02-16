function AboutScreen() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      <h1 className="text-2xl font-bold mb-4 mt-8 text-center text-yellow-300">About WeatherPro</h1>
      
      <p className="text-lg mb-6 text-center max-w-2xl mx-auto">
        WeatherPro is your go-to solution for real-time weather information. Whether you're planning your day or preparing for unexpected weather, we provide accurate weather forecasts, detailed temperature data, and much more. Our mission is to keep you informed about the weather no matter where you are.
      </p>

      <h3 className="text-2xl font-semibold mb-4 text-center">Features:</h3>
      <ul className="list-disc ml-6 text-lg max-w-2xl mx-auto">
        <li className="mb-2">📍 Real-time weather data for any location</li>
        <li className="mb-2">🌤 7-day weather forecast to plan ahead</li>
        <li className="mb-2">🗺 Interactive weather map integration for a visual forecast</li>
        <li className="mb-2">📱 User-friendly interface for easy navigation</li>
        <li className="mb-2">💨 Wind speed and direction details for outdoor activities</li>
        <li className="mb-2">🌙 Sunrise and sunset times to track daylight</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-center">How It Works:</h3>
      <p className="text-lg mb-4 text-center max-w-2xl mx-auto">
        WeatherPro uses advanced weather data from global sources to provide up-to-date information on temperature, wind, pressure, and more. Whether you're looking for a quick overview or in-depth details, WeatherPro delivers everything you need at your fingertips.
      </p>

      <div className="flex justify-center gap-4">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-lg shadow-md max-w-sm text-center">
          <h4 className="text-lg font-semibold mb-2">Instant Updates</h4>
          <p>Get live, up-to-the-minute updates on the weather in your location.</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-lg shadow-md max-w-sm text-center">
          <h4 className="text-lg font-semibold mb-2">Detailed Insights</h4>
          <p>Access detailed temperature, humidity, wind, and pressure readings.</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Thank you for using WeatherPro!</h3>
        <p className="text-lg">
          We are constantly improving to provide you with the most accurate and reliable weather information. Stay connected, stay informed, and make better decisions with WeatherPro.
        </p>
      </div>
    </div>
  );
}

export default AboutScreen;
