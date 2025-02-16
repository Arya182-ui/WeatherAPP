import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Search, Cloud, Droplets, Wind, MapPin, Loader2, Thermometer, Sunrise, Sunset, CloudRain, Sun, CloudSnow, CloudLightning, Compass, Github, Twitter, Linkedin, Mail, CloudSun, Menu } from 'lucide-react';
import AboutScreen from '../components/AboutScreen';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); 

  const API_KEY = import.meta.env.Mine;

  const getWeatherIcon = (code: string) => {
    const weatherCode = code.toLowerCase();
    if (weatherCode.includes('clear')) return <Sun className="w-24 h-24 text-yellow-300" />;
    if (weatherCode.includes('cloud')) return <Cloud className="w-24 h-24 text-gray-300" />;
    if (weatherCode.includes('rain') || weatherCode.includes('drizzle')) return <CloudRain className="w-24 h-24 text-blue-300" />;
    if (weatherCode.includes('thunder')) return <CloudLightning className="w-24 h-24 text-yellow-400" />;
    if (weatherCode.includes('snow')) return <CloudSnow className="w-24 h-24 text-white" />;
    return <Sun className="w-24 h-24 text-yellow-300" />;
  };

  const getWeatherBackground = (weatherCode: string) => {
    const code = weatherCode.toLowerCase();
    if (code.includes('clear')) {
      return 'from-blue-400 via-blue-300 to-blue-500';
    } else if (code.includes('cloud')) {
      return 'from-gray-700 via-gray-600 to-gray-800';
    } else if (code.includes('rain') || code.includes('drizzle')) {
      return 'from-blue-800 via-blue-700 to-blue-900';
    } else if (code.includes('thunder')) {
      return 'from-gray-900 via-purple-900 to-gray-900';
    } else if (code.includes('snow')) {
      return 'from-blue-200 via-blue-100 to-blue-300';
    }
    return 'from-blue-600 via-blue-500 to-blue-700';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const bgGradient = weather ? getWeatherBackground(weather.weather[0].main) : 'from-blue-600 via-blue-500 to-blue-700';

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="w-8 h-8 text-yellow-300" />
              <span className="text-2xl font-bold text-white">WeatherPro</span>
            </div>

            {/* Hamburger Menu */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Navigation links (desktop only) */}
            <nav className={`md:flex items-center gap-6 ${menuOpen ? 'flex' : 'hidden'} absolute top-16 left-0 right-0 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 md:static p-4 md:p-0`}>
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">Home</Link>
              <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors">About</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-grow bg-gradient-to-br ${bgGradient} transition-colors duration-700 flex items-center justify-center p-4 font-sans`}>
          <Routes>
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/" element={
              <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                  <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                    Weather Forecast
                  </h1>
                  <p className="text-white/80 text-lg">
                    Get real-time weather information for any city
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mb-8 max-w-2xl mx-auto">
                  <div className="relative group">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Search for a city..."
                      className="w-full px-8 py-5 rounded-2xl bg-white/10 border-2 border-white/30 focus:border-white/50 focus:ring-4 focus:ring-white/20 outline-none transition-all text-white placeholder-white/70 text-xl backdrop-blur-sm group-hover:border-white/40"
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="text-white/90 text-center mb-8 bg-red-500/20 backdrop-blur-sm py-4 px-6 rounded-xl max-w-2xl mx-auto">
                    {error}
                  </div>
                )}

                {weather && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <MapPin className="w-6 h-6 text-white/90" />
                            <h2 className="text-3xl font-semibold text-white">
                              {weather.name}, {weather.sys.country}
                            </h2>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                            {getWeatherIcon(weather.weather[0].main)}
                            <div>
                              <div className="text-8xl font-bold text-white tracking-tighter">
                                {Math.round(weather.main.temp)}°
                              </div>
                              <p className="text-2xl text-white/90 capitalize">
                                {weather.weather[0].description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                              <Thermometer className="w-5 h-5" />
                              <span>Feels like {Math.round(weather.main.feels_like)}°</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                            <Sunrise className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                            <div className="text-sm text-white/80 mb-1">Sunrise</div>
                            <div className="font-semibold text-white text-lg">{formatTime(weather.sys.sunrise)}</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                            <Sunset className="w-8 h-8 text-orange-300 mx-auto mb-2" />
                            <div className="text-sm text-white/80 mb-1">Sunset</div>
                            <div className="font-semibold text-white text-lg">{formatTime(weather.sys.sunset)}</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                            <Thermometer className="w-8 h-8 text-red-300 mx-auto mb-2" />
                            <div className="text-sm text-white/80 mb-1">High / Low</div>
                            <div className="font-semibold text-white text-lg">
                              {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
                            </div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                            <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                            <div className="text-sm text-white/80 mb-1">Humidity</div>
                            <div className="font-semibold text-white text-lg">{weather.main.humidity}%</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                          <Cloud className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <div className="text-sm text-white/80 mb-1">Cloud Cover</div>
                          <div className="font-semibold text-white text-lg">{weather.clouds.all}%</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                          <Wind className="w-8 h-8 text-teal-300 mx-auto mb-2" />
                          <div className="text-sm text-white/80 mb-1">Wind Speed</div>
                          <div className="font-semibold text-white text-lg">{Math.round(weather.wind.speed)} m/s</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                          <Compass className="w-8 h-8 text-purple-300 mx-auto mb-2" />
                          <div className="text-sm text-white/80 mb-1">Wind Direction</div>
                          <div className="font-semibold text-white text-lg">{getWindDirection(weather.wind.deg)}</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-transform hover:scale-105">
                          <MapPin className="w-8 h-8 text-pink-300 mx-auto mb-2" />
                          <div className="text-sm text-white/80 mb-1">Pressure</div>
                          <div className="font-semibold text-white text-lg">{weather.main.pressure} hPa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 backdrop-blur-md border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CloudSun className="w-6 h-6 text-yellow-300" />
                  <span className="text-xl font-bold text-white">WeatherPro</span>
                </div>
                <p className="text-white/70 text-sm">
                  Providing accurate weather forecasts and real-time weather data for locations worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <div className="grid grid-cols-1 gap-1">
                  <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">Home</Link>
                  <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors">About</Link>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/Arya182-ui" className="text-white/70 hover:text-white">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/ayush-gangwar-3b3526237/" className="text-white/70 hover:text-white">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="mailto:arya119000@gmail.com" className="text-white/70 hover:text-white">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <p className="text-center text-white/70 text-xs mt-8">© 2025 WeatherPro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
