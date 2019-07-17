const API_BASE_URL = `http://localhost:3000/`;

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};

const login = (username, password) => {
  return fetch(`${API_BASE_URL}auth/create`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ username, password })
  }).then(res => res.json());
};

const signup = flatmate => {
  return fetch(`${API_BASE_URL}api/v1/flatmates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flatmate)
  }).then(res => res.json());
};

const getCurrentFlatmate = token => {
  return fetch(`${API_BASE_URL}auth/show`, {
    headers: { ...headers, Authorization: token }
  }).then(res => res.json());
};

const updateFlatmateProfile = (profile, id, token) => {
  return fetch(`${API_BASE_URL}api/v1/flatmates/${id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token },
    body: JSON.stringify(profile)
  }).then(res => res.json());
};

const getNotes = token => {
  return fetch(`${API_BASE_URL}notes`, {
    headers: { ...headers, Authorization: token }
  }).then(res => res.json());
};

const addNoteToServer = (note, token) => {
  return fetch(`${API_BASE_URL}notes`, {
    method: "POST",
    headers: { ...headers, Authorization: token },
    body: JSON.stringify(note)
  }).then(resp => resp.json());
};

const deleteNoteFromServer = (note, token) => {
  return fetch(`${API_BASE_URL}notes/${note}`, {
    method: "DELETE",
    headers: { Authorization: token }
  }).then(res => res.json());
};

export default {
  login,
  getCurrentFlatmate,
  getNotes,
  signup,
  addNoteToServer,
  deleteNoteFromServer,
  updateFlatmateProfile
};
