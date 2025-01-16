// export default function Navbar() {
//   return (
//     <header className="flex items-center justify-between p-4 text-white bg-transparent">
//       <div className="flex items-center ml-6">
//         <img
//           className="object-cover w-10 h-10"
//           src="./logo-utama.svg"
//           alt="Logo"
//         />
//         <h1 className="ml-4 text-2xl font-bold">
//           <span className="text-red-500">Dumb</span>Sound
//         </h1>
//       </div>
//       <div className="flex mr-6 space-x-4">
//         <button className="px-4 py-2 bg-transparent border border-white rounded hover:bg-white hover:text-black">
//           Login
//         </button>
//         <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
//           Register
//         </button>
//       </div>
//     </header>
//   );
// }

// TODO Set Login Done - Navbar Updated Avatar
import { useState } from "react";
import { Menu } from "@headlessui/react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example state to simulate login
  const [userAvatar, setUserAvatar] = useState(
    "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
  ); // Replace with dynamic avatar URL

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout
    console.log("User logged out");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-white bg-transparent backdrop-blur-lg">
      <div className="flex items-center justify-between p-2 mx-auto max-w-screen-2xl">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            className="object-cover w-10 h-10"
            src="./logo-utama.svg"
            alt="Logo"
          />
          <h1 className="ml-4 text-2xl font-bold">
            <span className="text-red-500">Dumb</span>Sound
          </h1>
        </div>

        {/* Right Side Menu */}
        <div className="flex items-center justify-center">
          {isLoggedIn ? (
            <Menu as="div" className="relative">
              {/* Avatar Button */}
              <Menu.Button className="focus:outline-none">
                <img
                  className="object-cover w-10 h-10 rounded-full cursor-pointer"
                  src={userAvatar} // Dynamically set user avatar
                  alt="User Avatar"
                />
              </Menu.Button>

              {/* Dropdown Menu */}
              <Menu.Items className="absolute right-0 w-40 mt-2 text-black bg-white rounded shadow-lg focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2`}
                    >
                      Pay
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            // Login and Register Buttons (Hidden when logged in)
            <>
              <button className="px-4 py-2 bg-transparent border border-white rounded hover:bg-white hover:text-black">
                Login
              </button>
              <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
