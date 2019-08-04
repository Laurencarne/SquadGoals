const API_BASE_URL = `https://squad-goals-api.herokuapp.com/`;

const token = () => localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};
////////////////// FLATMATE /////////////////////
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

const getCurrentFlatmate = () => {
  return fetch(`${API_BASE_URL}auth/show`, {
    headers: { ...headers, Authorization: token() }
  }).then(res => res.json());
};

const updateFlatmateProfile = (profile, id) => {
  return fetch(`${API_BASE_URL}api/v1/flatmates/${id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(profile)
  }).then(res => res.json());
};
////////////////// NOTES /////////////////////
const addNoteToServer = note => {
  return fetch(`${API_BASE_URL}notes`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(note)
  }).then(resp => resp.json());
};

const deleteNoteFromServer = note => {
  return fetch(`${API_BASE_URL}notes/${note}`, {
    method: "DELETE",
    headers: { Authorization: token() }
  }).then(res => res.json());
};
////////////////// FLAT /////////////////////
const addFlatToServer = flat => {
  return fetch(`${API_BASE_URL}flats`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(flat)
  }).then(resp => resp.json());
};

const getFlat = () => {
  return fetch(`${API_BASE_URL}flat`, {
    headers: { ...headers, Authorization: token() }
  }).then(res => res.json());
};
const updateFlatOnServer = flat => {
  return fetch(`${API_BASE_URL}flats/${flat.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(flat)
  }).then(res => res.json());
};

const moveIn = flatInfo => {
  return fetch(`${API_BASE_URL}auth/move_in`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(flatInfo)
  }).then(res => res.json());
};
////////////////// TASKS /////////////////////
const addTaskToFlatServer = flat => {
  return fetch(`${API_BASE_URL}tasks`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(flat)
  }).then(res => res.json());
};

const updateTasks = task => {
  return fetch(`${API_BASE_URL}tasks/${task.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(task)
  }).then(res => res.json());
};
////////////////// SHOPPING LIST /////////////////////
const addShoppingItemToServer = item => {
  return fetch(`${API_BASE_URL}items`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(item)
  }).then(res => res.json());
};

const deleteItemFromServer = item => {
  return fetch(`${API_BASE_URL}items/${item}`, {
    method: "DELETE",
    headers: { Authorization: token() }
  }).then(res => res.json());
};

const deleteTaskFromServer = task => {
  return fetch(`${API_BASE_URL}tasks/${task}`, {
    method: "DELETE",
    headers: { Authorization: token() }
  }).then(res => res.json());
};
////////////////// EVENTS /////////////////////
const addEventToServer = event => {
  return fetch(`${API_BASE_URL}events`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(event)
  }).then(resp => resp.json());
};
const deleteEventFromServer = event => {
  return fetch(`${API_BASE_URL}events/${event}`, {
    method: "DELETE",
    headers: { Authorization: token() }
  }).then(res => res.json());
};
const getEvents = () => {
  return fetch(`${API_BASE_URL}events`, {
    headers: { ...headers, Authorization: token() }
  }).then(res => res.json());
};
////////////////// BILLS /////////////////////
const addBillToServer = bill => {
  return fetch(`${API_BASE_URL}bills`, {
    method: "POST",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(bill)
  }).then(resp => resp.json());
};
const updateBillSplit = billSplit => {
  return fetch(`${API_BASE_URL}bill_splits/${billSplit.id}`, {
    method: "PATCH",
    headers: { ...headers, Authorization: token() },
    body: JSON.stringify(billSplit)
  }).then(res => res.json());
};
////////////////// EXPORT /////////////////////
export default {
  login,
  getCurrentFlatmate,
  signup,
  addNoteToServer,
  deleteNoteFromServer,
  updateFlatmateProfile,
  addFlatToServer,
  getFlat,
  updateFlatOnServer,
  moveIn,
  addTaskToFlatServer,
  updateTasks,
  addShoppingItemToServer,
  deleteItemFromServer,
  deleteTaskFromServer,
  addEventToServer,
  deleteEventFromServer,
  getEvents,
  addBillToServer,
  updateBillSplit
};
