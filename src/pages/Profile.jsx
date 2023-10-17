import React, { useState, useEffect } from "react";
import Sidebar from "../components/Layout/Sidebar";
import userApi from "../apis/user"; // Sử dụng `userApi` thay vì Axios
import authApi from "../apis/auth";
import { toast } from "react-toastify";
const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    oldpassword: "",
    newpassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updatePassword = async () => {
    try {
      await authApi.changePassword(user);
      toast.success("Updated password!");
    } catch (error) {
      toast.error("Wrong password!");
    }
    setUser({ ...user, oldpassword: "", newPassword: "" });
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
          <header className="bg-black p-4 text-white">
            <h1 className="text-2xl font-semibold">My Profile</h1>
          </header>
          <main className="container mx-auto p-4">
            <div className="flex flex-col">
              <div className="w-full p-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="mt-4 flex ">
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
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="text-lg font-semibold w-full mb-5">
                        About Me
                      </h3>
                      <div className="p-12 mx-4 w-[80%]">
                        <div className="">
                          <div className="flex justify-between  mb-3">
                            <label className=" text-sm font-medium  text-black flex">
                              Username
                            </label>
                            <input
                              className=" border  text-sm rounded-lg inline-block w-1/2 p-2.5 border-gray-500 placeholder-gray-400 text-black"
                              value={user.username}
                              readOnly
                            />
                          </div>
                          <div className="flex justify-between  mb-3">
                            <label className=" text-sm font-medium text-black flex">
                              Password
                            </label>
                            <input
                              type="password"
                              placeholder=""
                              className=" border text-sm rounded-lg  w-1/2 p-2.5 border-gray-500 placeholder-gray-400 text-black"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  oldPassword: e.target.value,
                                })
                              }
                              value={user.oldpassword}
                            />
                          </div>
                          <div className="flex justify-between mb-3">
                            <label className=" text-sm font-medium text-black flex">
                              New Password
                            </label>
                            <input
                              type="password"
                              className=" border text-sm rounded-lg block w-1/2 p-2.5   border-gray-500 placeholder-gray-400 text-black"
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  newPassword: e.target.value,
                                })
                              }
                              value={user.newPassword}
                            />
                          </div>
                          <div className="">
                            <button
                              type="submit"
                              className=" text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                              onClick={() => updatePassword()}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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
