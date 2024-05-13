import React, { useState } from 'react';

const HomeSection = () => {
  const [carModel, setCarModel] = useState('');
  const [carInfo, setCarInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://car-data.p.rapidapi.com/cars?model=${carModel}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'your-api-key',
          'x-rapidapi-host': 'car-data.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCarInfo(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Car Information</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            placeholder="Enter car model"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
            disabled={isLoading || carModel.trim() === ''}
          >
            {isLoading ? 'Loading...' : 'Get Car Info'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {carInfo && (
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">{carInfo.make} {carInfo.model}</h2>
            <p><strong>Year:</strong> {carInfo.year}</p>
            <p><strong>Body Style:</strong> {carInfo.body}</p>
            <p><strong>Engine:</strong> {carInfo.engine}</p>
            <p><strong>Transmission:</strong> {carInfo.transmission}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
