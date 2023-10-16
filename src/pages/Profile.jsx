import React, { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import userApi from "../apis/user"; // Sử dụng `userApi` thay vì Axios
const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    roleId: "",
    avatar: "",
    //bio: "Đệ 5 cam",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const saveChanges = async () => {
    try {
      const updatedUserData = {
        username: user.username,
        email: user.email,
        //bio: user.bio,
        status: user.status,
        roleId: user.roleID,
      };
      // Gọi API để cập nhật thông tin người dùng sử dụng `userApi`
      const response = await userApi.editUser(
        user.status,
        user.email,
        user.username,
        user.roleId
      );
      // Xử lý kết quả response ở đây
      if (response) {
        console.log("Update successful:", response);
        setIsEditing(false);
      } else {
        setIsEditing(false); // Kết thúc chế độ chỉnh sửa sau khi cập nhật thành công
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  useEffect(() => {
    // Gọi API để lấy thông tin người dùng sử dụng `userApi`
    userApi
      .getCurrentUser()
      .then((response) => {
        setUser(response);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);
  return (
    <div className="relative flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div>
          <header  className="header bg-white shadow py-4 px-4">
            <h1 className="text-2xl font-semibold">My Profile</h1>
           
          </header>
          <main className="container mx-auto p-4">
            <div className="flex">
              <div className="w-1/3 p-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-center">
                    <img
                      src={
                        "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                      }
                      alt={`${user.roleId}'s profile`}
                      className="w-32 h-32 mx-auto rounded-full"
                    />
                    {!isEditing ? (
                      <div>
                        <h2 className="text-2xl font-semibold mt-2">
                          {user.username}
                        </h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-gray-500">{user.roleId}</p>
                        <p
                          className={`text-${
                            user.status === "Active" ? "green" : "red"
                          }-500`}
                        >
                          Status: {user.status}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full border rounded-md p-2 mb-2"
                          value={user.username}
                          readOnly
                          // onChange={(e) =>
                          //   setUser({ ...user, username: e.target.value })
                          //}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full border rounded-md p-2"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Roles"
                          className="w-full border rounded-md p-2"
                          value={user.roleId}
                          readOnly
                          // onChange={(e) =>
                          //   setUser({ ...user, roleId: e.target.value })
                          //}
                        />
                        <select
                          value={user.status}
                          readOnly
                          // onChange={(e) =>
                          //   setUser({ ...user, status: e.target.value })
                          // }
                          className="w-full border rounded-md p-2"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        
                      </div>
                    )}
                  </div>
                  <div>
                  {!isEditing ? (
              <button
                onClick={toggleEdit}
                className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded-md ml-2 "
              >
                Edit
              </button>
            ) : (
              <button
                onClick={saveChanges}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-md ml-2"
              >
                Save
              </button>
            )}
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">About Me</h3>
                    {/* {!isEditing ? (
                      <p className="text-gray-700">{user.bio}</p>
                    ) : (
                      <textarea
                        placeholder="Bio"
                        className="w-full border rounded-md p-2"
                        value={user.bio}
                        onChange={(e) =>
                          setUser({ ...user, bio: e.target.value })
                        }
                      />
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};
export default Profile;