import Sidebar from "../components/Layout/Sidebar";

// const Profile = () => {
//   return (
//     <div>
//       <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
//        <Sidebar></Sidebar>;
//         <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
//           <header className="header bg-white shadow py-4 px-4">
//             <div className="header-content flex items-center flex-row">
//               <div className="flex ml-auto">
//                 <a className="flex flex-row items-center">
//                   <img
//                     src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
//                     className="h-10 w-10 bg-gray-200 border rounded-full"
//                   />
//                   <span className="flex flex-col ml-2">
//                     <span className="truncate w-20 font-semibold tracking-wide leading-none">
//                       BAO
//                     </span>
//                     <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
//                       Admin
//                     </span>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </header>

//           <div className=" text-slate-800 font-semibold text-3xl flex p-4">
//             User Profile
//           </div>
//           <div className="text-left p-8 text-xl">
//             <h1 className="">UserName</h1>
//             <div className="border w-60  border-black">Le nGuyen Gia Bao</div>
//           </div>
//           <div className="text-left p-9 text-xl">
//             <h1 className="">Role</h1>
//             <div className="border w-60  border-black">Le nGuyen Gia Bao</div>
//           </div>
//           <div className="text-left p-9 text-xl">
//             <h1 className="">Your Password</h1>
//             <input type="password" placeholder="input password"></input>
//           </div>
//           <div className="text-left p-9 text-xl">
//             <h1 className="">Confirm password</h1>
//             <input type="password" placeholder="input password"></input>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { React, useState, setUser } from "react";
//const dispatch = useDispatch();
const user = {
  name: "Bảo Bình Tân",
  email: "Baobinhtan@fpt.edu.vn",
  role: "Đệ 5 Cam",
  avatar:
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1696517012~exp=1696517612~hmac=ca182e634d722a0e809a18564501aa7e0ddd520b16a6f1d1d10746d490eb3fbb",
  bio: "Giang hồ khét tiếng Việt Nam",
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    //dispatch;
    // Lưu các thay đổi vào cơ sở dữ liệu hoặc API tại đây
    setIsEditing(false); // Kết thúc chế độ chỉnh sửa sau khi lưu
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div>
          <header className="bg-blue-500 p-4 text-white">
            <h1 className="text-2xl font-semibold">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={toggleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded-md ml-2"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={saveChanges}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md ml-2"
              >
                Save
              </button>
            )}
          </header>
          <main className="container mx-auto p-4">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s profile`}
                  className="w-32 h-32 mx-auto rounded-full"
                />
                {!isEditing ? (
                  <div>
                    <h2 className="text-2xl font-semibold mt-2">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-500">{user.role}</p>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border rounded-md p-2 mb-2"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
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
                      value={user.role}
                      onChange={(e) => setUser({ ...user, role: e.target })}
                    />
                  </div>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold">About Me</h3>
                {!isEditing ? (
                  <p className="text-gray-700">{user.bio}</p>
                ) : (
                  <textarea
                    placeholder="Bio"
                    className="w-full border rounded-md p-2"
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default Profile;
