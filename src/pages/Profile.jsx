

import Sidebar from "../components/Layout/Sidebar";

const Profile = () => {
  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar></Sidebar>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
              <div className="flex ml-auto">
                <a className="flex flex-row items-center">
                  <img
                    src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
                    className="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span className="flex flex-col ml-2">
                    <span className="truncate w-20 font-semibold tracking-wide leading-none">
                      BAO
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      Admin
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </header>

          <div className=" text-slate-800 font-semibold text-3xl flex p-4">
            User Profile
          </div>
          <div className="text-left p-8 text-xl">
              <h1 className="">UserName</h1>
              <div className="border w-60  border-black">Le nGuyen Gia Bao</div>
            </div>
          <div className="text-left p-9 text-xl">
              <h1 className="">Role</h1>
              <div className="border w-60  border-black">Le nGuyen Gia Bao</div>
            </div>
          <div className="text-left p-9 text-xl">
              <h1 className="">Password</h1>
              <input type="password" placeholder="input password"></input>
            </div>
          <div className="text-left p-9 text-xl">
              <h1 className="">Confirm password</h1>
              <input type="password" placeholder="input password"></input>
            </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
