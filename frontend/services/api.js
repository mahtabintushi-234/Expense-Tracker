// StAuth10244: I , Mahtabin Tushi ,000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

import axios from 'axios';

/**
 * Axios instance for API calls.
 * Uses localhost so the app works on any machine without manual IP changes.
 */
const api = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

export default api;