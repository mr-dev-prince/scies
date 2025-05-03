import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// user apis
export const registerUser = (data) =>
  api.post("/user/register", data).then((res) => res.data);
export const registerStudent = (data) =>
  api.post("/user/register-student", data).then((res) => res.data);
export const loginStudent = (data) =>
  api.post("/user/login-student", data).then((res) => res.data);
export const editStudent = (studentId, data) =>
  api.put(`/user/edit-student/${studentId}`, data).then((res) => res.data);
export const loginUser = (data) =>
  api.post("/user/login", data).then((res) => res.data);
export const editUser = (userId, data) =>
  api.put(`/user/edit/${userId}`, data).then((res) => res.data);
export const getUnverifiedUsers = () =>
  api.get("/user/unverified").then((res) => res.data);
export const verifyUser = (userId) =>
  api.post(`/user/verify/${userId}`).then((res) => res.data);

// event apis
export const createEvent = (data) =>
  api.post("/event/create", data).then((res) => res.data);
export const deleteEvent = (eventId) =>
  api.delete(`/event/delete/${eventId}`).then((res) => res.data);
export const getEvents = () =>
  api.get("/event/get-all").then((res) => res.data);

// election apis
export const createElection = (data) =>
  api.post("/election/create", data).then((res) => res.data);
export const deleteElection = (electionId) =>
  api.delete(`/election/delete/${electionId}`).then((res) => res.data);
export const getAllElections = () =>
  api.get("/election/get-all").then((res) => res.data);

// nomination apis
export const createNomination = (data) =>
  api.post("/nomination/create", data).then((res) => res.data);
export const deleteNomination = (nominationId) =>
  api.delete(`/nomination/delete/${nominationId}`).then((res) => res.data);
export const getNominations = () =>
  api.get("/nomination/get-all").then((res) => res.data);
export const getPendingNominations = () =>
  api.get("/nomination/pending").then((res) => res.data);
export const acceptNomination = (nominationId) =>
  api.post(`/nomination/accept/${nominationId}`).then((res) => res.data);
export const rejectNomination = (nominationId) =>
  api.post(`/nomination/reject/${nominationId}`).then((res) => res.data);

// vote apis
export const addVote = (data) =>
  api.post("/vote/add", data).then((res) => res.data);
export const getVotes = () =>
  api.get("/vote/getAllVotes").then((res) => res.data);

// member apis
export const createMember = (data) =>
  api.post("/member/create", data).then((res) => res.data);
export const getMembers = () =>
  api.get("/member/get-all").then((res) => res.data);
export const deleteMember = (memberId) =>
  api.delete(`/member/delete/${memberId}`).then((res) => res.data);

// upload image
export const uploadImage = (data) =>
  api.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
