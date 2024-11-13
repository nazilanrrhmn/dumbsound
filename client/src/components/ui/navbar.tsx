export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-transparent text-white">
      <div className="flex items-center ml-6">
        <img
          className="h-10 w-10 object-cover"
          src="./logo-utama.svg"
          alt="Logo"
        />
        <h1 className="text-2xl font-bold ml-4">
          <span className="text-red-500">Dumb</span>Sound
        </h1>
      </div>
      <div className="flex space-x-4 mr-6">
        <button className="px-4 py-2 bg-transparent border border-white rounded hover:bg-white hover:text-black">
          Login
        </button>
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
          Register
        </button>
      </div>
    </header>
  );
}

// TODO Set Login Done - Navbar Updated Avatar
// import { useState } from "react";
// import { Menu } from "@headlessui/react";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary login state for example

//   return (
//     <header className="fixed top-0 left-0 z-50 w-full bg-transparent backdrop-blur-lg text-white">
//       <div className="flex justify-between items-center p-4 mx-auto max-w-screen-lg">
//         <div className="flex items-center">
//           <img className="h-10 w-10 object-cover" src="./logo-utama.svg" alt="Logo" />
//           <h1 className="text-2xl font-bold ml-4">
//             <span className="text-red-500">Dumb</span>Sound
//           </h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           {isLoggedIn ? (
//             <Menu as="div" className="relative">
//               <Menu.Button className="focus:outline-none">
//                 <img
//                   className="w-10 h-10 rounded-full cursor-pointer"
//                   src="/path-to-avatar.jpg" // Replace with user avatar URL
//                   alt="User Avatar"
//                 />
//               </Menu.Button>
//               <Menu.Items className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg focus:outline-none">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-gray-100" : ""
//                       } w-full text-left px-4 py-2`}
//                     >
//                       Pay
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-gray-100" : ""
//                       } w-full text-left px-4 py-2`}
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </Menu.Items>
//             </Menu>
//           ) : (
//             <>
//               <button className="px-4 py-2 bg-transparent border border-white rounded hover:bg-white hover:text-black">
//                 Login
//               </button>
//               <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">
//                 Register
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
