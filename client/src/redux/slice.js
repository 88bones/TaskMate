import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: localStorage.getItem("firstname") || "",
  lastname: localStorage.getItem("lastname") || "",
  role: localStorage.getItem("role") || "",
  signedIn: !!localStorage.getItem("firstname"),
  email: localStorage.getItem("email") || "",
  _id: localStorage.getItem("_id") || "",
  tasks: [],
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, action) {
      const { firstname, lastname, role, email, _id } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.role = role;
      state.email = email;
      state._id = _id;
      state.signedIn = true;

      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("_id", _id);
    },
    signout(state) {
      state.firstname = "";
      state.lastname = "";
      state.role = "";
      state.email = "";
      state._id = "";
      state.signedIn = false;

      localStorage.clear();
    },
    updateFirstname(state, action) {
      state.firstname = action.payload;
      localStorage.setItem("firstname", action.payload);
    },
    updateLastname(state, action) {
      state.lastname = action.payload;
      localStorage.setItem("lastname", action.payload);
    },
    updateRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    updateEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const {
  signin,
  signout,
  updateFirstname,
  updateLastname,
  updateEmail,
  updateRole,
  setTasks,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
