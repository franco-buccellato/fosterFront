import axios from 'axios';

// Cambiamos 3000 por 5000 y aseguramos la barra diagonal final
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/';

const clienteAxios = axios.create({
  baseURL: API_URL
});

export default clienteAxios;