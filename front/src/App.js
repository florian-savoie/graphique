import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



function App() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleGenerateToken = () => {
    // Effectuez une demande POST pour générer un token depuis le serveur
    axios.get('http://localhost:3000/test')
      .then((response) => {
        const { token } = response.data;
        setToken(token);
      })
      .catch((error) => {
        console.error('Erreur lors de la génération du token:', error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/message')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
      });
  }, []);
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2], // Les valeurs pour chaque section du graphique
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div>
      <h1>{message}</h1>
      <div style={{ width: '500px', height: '500px' }}>
      <Doughnut data={data}  />

      </div>
      <div>
      <h1>Token JWT</h1>
      {token ? (
        <div>
          <p>Token JWT généré :</p>
          <code>{token}</code>
        </div>
      ) : (
        <button onClick={handleGenerateToken}>Générer un token JWT</button>
      )}
    </div>
    </div>
  );
}

export default App;
