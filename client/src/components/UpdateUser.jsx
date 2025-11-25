import React, { useEffect, useState } from "react";
import { getOneUser } from "../services/getUser";
import { updateUser } from "../services/updateUser";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  const inputStyle =
    "w-full border border-gray-500 rounded mb-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    photo: "",
  });

  // Fetch user on mount
  useEffect(() => {
    getOneUser(userId)
      .then((res) => {
        if (res.message) {
          setError(res.message);
        } else {
          setData({
            firstname: res.firstname,
            lastname: res.lastname,
            email: res.email,
            department: res.department,
            photo: res.photo,
          });

          setPhotoPreview(
            res.photo ? `http://localhost:3001${res.photo}` : null
          );
        }
      })
      .catch(() => setError("Failed to load user data"));
  }, [userId]);

  useEffect(() => {
    return () => {
      if (
        photoPreview &&
        photoPreview.startsWith &&
        photoPreview.startsWith("blob:")
      ) {
        try {
          URL.revokeObjectURL(photoPreview);
        } catch (err) {
          // ignore
        }
      }
    };
  }, [photoPreview]);

  // Handle input field update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      photoPreview &&
      photoPreview.startsWith &&
      photoPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(photoPreview);
    }

    setData((prev) => ({ ...prev, photo: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    // Revoke only blob/object URLs and clear preview/state.
    if (
      photoPreview &&
      photoPreview.startsWith &&
      photoPreview.startsWith("blob:")
    ) {
      try {
        URL.revokeObjectURL(photoPreview);
      } catch (e) {}
    }

    setData((prev) => ({ ...prev, photo: "" }));
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // form-data for image upload
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("department", data.department);

      if (data.photo instanceof File) {
        formData.append("photo", data.photo);
      }

      const res = await updateUser(userId, formData);

      setSuccess(res.message || "User updated successfully");

      setTimeout(() => navigate("/admin/signup"), 1500);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full backdrop-blur-xl flex items-center justify-center flex-col p-4">
      <header>
        <p className="font-bold text-xl mb-4">Edit User</p>
      </header>

      <form onSubmit={handleSubmit} className="w-96">
        {/* IMAGE PREVIEW */}
        <div className="mb-4 flex items-start gap-4">
          <label
            htmlFor="photo-input"
            className="relative group w-20 h-20 rounded-full bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center border cursor-pointer"
            title="Click to choose a photo"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "";
                }}
              />
            ) : (
              <div className="text-sm font-semibold text-gray-600">
                Add Photo
              </div>
            )}

            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">
              Change
            </div>
          </label>

          <div className="flex flex-col">
            <input
              id="photo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => document.getElementById("photo-input")?.click()}
                className="px-3 py-1 rounded bg-black text-white text-sm"
              >
                Choose photo
              </button>

              {photoPreview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1 rounded border text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Square image recommended. Max 2MB.
            </p>
          </div>
        </div>

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={data.firstname}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={data.lastname}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <select
          name="department"
          value={data.department}
          onChange={handleChange}
          className={inputStyle}
          required
        >
          <option value="">Select Department</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="qa">QA</option>
          <option value="ui/ux">UI/UX</option>
          <option value="owner">Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black rounded p-2 text-white mt-2 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default UpdateUser;
