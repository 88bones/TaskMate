import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: localStorage.getItem("firstname") || "",
  lastname: localStorage.getItem("lastname") || "",
  username: localStorage.getItem("usernmae") || "",
  role: localStorage.getItem("role") || "",
  signedIn: !!localStorage.getItem("firstname"),
  email: localStorage.getItem("email") || "",
  department: localStorage.getItem("department" || ""),
  _id: localStorage.getItem("_id") || "",
  tasks: [],
  users: [],
  selectedProject: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, action) {
      const { firstname, lastname, username, role, email, department, _id } =
        action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.username = username;
      state.role = role;
      state.email = email;
      state.department = department;
      state._id = _id;

      state.signedIn = true;

      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("department", department);
      localStorage.setItem("_id", _id);
    },
    signout(state) {
      state.firstname = "";
      state.lastname = "";
      state.username = "";
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
    updateUserName(state, action) {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    updateRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    updateEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
    updateDepartment(state, action) {
      state.department = action.payload;
      localStorage.setItem("department", action.payload);
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  signin,
  signout,
  updateFirstname,
  updateLastname,
  updateUserName,
  updateEmail,
  updateDepartment,
  updateRole,
  setTasks,
  setUsers,
  setSelectedProject,
} = userSlice.actions;

export default userSlice.reducer;
