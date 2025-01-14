import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../../redux/reducers/authSlice"; // Đảm bảo getUserDetails đã được export từ authSlice
import Loading from "../../components/Loading";
import { NavLink, Outlet } from "react-router-dom";
import { emptyCartOnLogoout } from "../../redux/reducers/cartSlice";

const UserProfile = () => {
  const { userInfo, loading, error, userErrorMsg, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Gọi getUserDetails khi component mount
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userToken]);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(emptyCartOnLogoout());
  };

  return (
    <section className="h-auto pt-2 min-h-[80vh] bg-[#f9f9f9]">
      <div className="max-w-xl lg:max-w-7xl relative px-5 py-20 items-center mx-auto lg:mx-20 xl:mx-28 2xl:mx-40 3xl:mx-auto lg:px-1 xl:px-3 2xl:px-1">
        <div className="flex gap-x-4 flex-col lg:flex-row">
          <div className="lg:bg-white lg:w-1/4 rounded-lg lg:shadow-md py-4 h-fit">
            <div className="profile-img-wrapper w-32 h-32 bg-grayish-blue rounded-full mx-auto relative">
              <button className="w-5 h-5 absolute right-3 hidden">
                <ion-icon
                  className="text-very-dark-blue text-xl"
                  name="create"
                ></ion-icon>
              </button>
            </div>
            <h3 className="capitalize text-lg text-center my-6">
              <div className="font-bold ">
                {userInfo && (
                  <>
                    {userInfo.firstname} {userInfo.lastname}
                  </>
                )}
              </div>
            </h3>

            <nav className="space-y-1 bg-white">
              <NavLink
                to=""
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
                end
                aria-current="page"
              >
                <ion-icon className="p-2 text-base" name="person"></ion-icon>
                <span className="truncate">Tài khoản</span>
              </NavLink>

              <NavLink
                to="orders"
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
              >
                <ion-icon className="p-2 text-base" name="basket"></ion-icon>
                <span className="truncate">Đơn hàng</span>
              </NavLink>

              <NavLink
                to="addresses"
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
              >
                <ion-icon className="p-2 text-base" name="location"></ion-icon>
                <span className="truncate">Địa chỉ</span>
              </NavLink>

              <NavLink
                to="notifications"
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
              >
                <ion-icon className="p-2 text-base" name="notifications"></ion-icon>
                <span className="truncate">Thông báo</span>
              </NavLink>

              <NavLink
                to="password"
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
              >
                <ion-icon className="p-2 text-base" name="key"></ion-icon>
                <span className="truncate">Mật khẩu</span>
              </NavLink>

              <NavLink
                to="settings"
                className={({ isActive }) =>
                  "text-dark-grayish-blue group  px-3 py-2 flex items-center text-sm font-medium" +
                  (!isActive
                    ? " hover:bg-light-grayish-blue"
                    : " border-l-4 bg-pale-orange border-orange hover:bg-pale-orange")
                }
              >
                <ion-icon className="p-2 text-base" name="settings"></ion-icon>
                <span className="truncate">Cài đặt tài khoản</span>
              </NavLink>
              <hr className="text-grayish-blue" />
              <button
                onClick={onLogOut}
                className="text-grayish-blue flex items-center px-3 py-2"
              >
                <ion-icon className="p-2 text-base" name="log-out"></ion-icon>
                <span className="truncate">Đăng xuất</span>
              </button>
            </nav>
          </div>

          <div className="bg-white flex-1 rounded-lg shadow-md p-8">
            {userToken ? (
              <>
                {!error ? (
                  <>
                    {loading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Loading />
                      </div>
                    ) : (
                      <div>
                        {userInfo ? (
                          <>
                            <h2 className="text-xl font-bold">Thông tin người dùng</h2>
                            <Outlet />
                          </>
                        ) : (
                          <p>
                            Please{" "}
                            <NavLink
                              to="/login"
                              className="text-sm border-b-2 border-b-orange font-bold"
                            >
                              Login
                            </NavLink>{" "}
                            to view this page
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="mt-20 text-center text-very-dark-blue">
                    {userErrorMsg}
                  </p>
                )}
              </>
            ) : (
              <p>
                Please{" "}
                <NavLink
                  to="/login"
                  className="text-sm border-b-2 border-b-orange font-bold"
                >
                  Login
                </NavLink>{" "}
                to view this page
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
