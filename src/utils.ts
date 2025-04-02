
import axios from 'axios';

let token: string | null = null;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}
const api = axios.create({
  baseURL: 'https://advanced-agriculture-be-1.onrender.com',
  headers: {
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${token}`
  },
});

export  {api};
