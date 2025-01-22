import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMusic, FaUserPlus, FaSignOutAlt, FaMoneyBill } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { resetAuth } from "../../stores/auth/slice";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.entities);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Detect URL changes
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close dropdown when location changes
    setDropdownOpen(false);
  }, [location]);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleAddMusic = () => {
    navigate("/add-music");
  };

  const handleAddArtist = () => {
    navigate("/add-artist");
  };

  const handlePay = () => {
    alert("Pay clicked");
  };

  const handleLogout = async () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      background: "#1D1D1D",
      color: "#fff",
      iconColor: "#04A51E",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        dispatch(resetAuth());
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Logout successful",
          background: "#1D1D1D",
          color: "#fff",
          iconColor: "#04A51E",
          timer: 1500,
          showConfirmButton: true,
        });
      }
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      } transition duration-300`}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold">
          <img
            className="object-cover w-10 h-10"
            src="./logo-utama.svg"
            alt="Logo"
          />
          <h1 className="ml-3 font-semibold text-white">
            <span className="text-red-500">Dumb</span>Sound
          </h1>
        </div>

        {/* Menu Toggle (Mobile) */}
        <button
          className="block text-white lg:hidden focus:outline-none"
          onClick={handleToggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            )}
          </svg>
        </button>

        {/* Main Menu */}
        <div
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 fixed lg:static top-0 right-0 h-full lg:h-auto w-64 lg:w-auto bg-black lg:bg-transparent text-white flex flex-col lg:flex-row items-center gap-6 p-6 lg:p-0 z-50 transition-transform duration-300 ease-in-out`}
        >
          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              <div className="relative group">
                <img
                  src={
                    user.profile.avatar ??
                    "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 transition duration-300 border-2 border-gray-200 rounded-full shadow-lg cursor-pointer hover:border-orange-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 w-48 mt-4 text-white bg-gray-800 rounded-lg shadow-lg">
                    {user.role === "ADMIN" && (
                      <div className="flex flex-col">
                        <button
                          className="flex items-center px-4 py-2 hover:bg-gray-700"
                          onClick={handleAddMusic}
                        >
                          <FaMusic className="mr-2 text-orange-500" />
                          Add Music
                        </button>
                        <button
                          className="flex items-center px-4 py-2 hover:bg-gray-700"
                          onClick={handleAddArtist}
                        >
                          <FaUserPlus className="mr-2 text-orange-500" />
                          Add Artist
                        </button>
                      </div>
                    )}

                    {user.role === "USER" && (
                      <div className="flex flex-col">
                        <button
                          className="flex items-center px-4 py-2 hover:bg-gray-700"
                          onClick={handlePay}
                        >
                          <FaMoneyBill className="mr-2 text-orange-500" />
                          Pay
                        </button>
                      </div>
                    )}

                    <div className="my-2 border-t border-gray-700"></div>
                    <div className="flex flex-col">
                      <button
                        className="flex items-center px-4 py-2 hover:bg-gray-700"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="mr-2 text-orange-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="text-lg font-semibold text-gray-100">
                  {user.username}
                </p>
              </div>
            </div>
          ) : (
            <>
              <button
                className="w-full px-4 py-2 font-medium text-white bg-transparent border border-white rounded-lg lg:w-auto hover:border-orange-500 hover:bg-orange-500"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-2 font-medium text-white bg-orange-600 rounded-lg lg:w-auto hover:bg-orange-500"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Backdrop */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMenu}
          ></div>
        )}
      </div>
    </nav>
  );
}
