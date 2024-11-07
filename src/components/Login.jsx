import { useRef, useState } from "react";
// import Header from "./Header";
// import { useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
// import footballBackground from "./footballBackgroud.jpg";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMesage, setErrMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const { uid, email, displayName } = user;
  //       dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
  //       navigate("/browser");
  //     } else {
  //       dispatch(removeUser());
  //       navigate("/");
  //     }
  //   });
  // }, []);

  const handleButtonClick = () => {
    // Log the input values

    const message = checkValidateData(
      email.current.value,
      password.current.value,
      fullname.current?.value
    );
    setErrMessage(message);

    if (message) return;

    if (!isSignIn) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browser");
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // signn in logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browser");
          updateProfile(user, {
            displayName: fullname.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              navigate("/browser");
            })
            .catch((error) => {
              // An error occurred
              setErrMessage(error.me);
              console.log(error);
              // ...
            });
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
    // sign in / sign up logic
  };

  const toggleSignIn = (e) => {
    e.preventDefault();
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div>
        {/* <Header /> */}
        {/* <div className="absolute">
          <img
            src={footballBackground}
            alt="Football Background"
            className="w-full h-[600px] lg:h-auto object-cover"
          />
        </div> */}

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 md:mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {isSignIn ? "Sign in to your account" : "Sign up to your account"}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {!isSignIn && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="full name"
                      ref={fullname}
                      type="text"
                      autoComplete="full name"
                      required
                      className="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    ref={email}
                    type="text"
                    autoComplete="email"
                    required
                    className="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    ref={password}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    className="p-2 my-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="text-red-800 text-lg py-2 font-bold">{errMesage}</p>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleButtonClick}
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </div>
              <p
                className="mt-10 text-center text-sm text-gray-500"
                onClick={toggleSignIn}
              >
                {isSignIn ? (
                  <>
                    <a className="p-2 my-2 font-semibold leading-6 text-black hover:text-slate-600 cursor-pointer">
                      Not a member ?
                    </a>

                    <a
                      href="#"
                      className=" font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Sign up now and start a 14 day free trial !!
                    </a>
                  </>
                ) : (
                  <>
                    <a className="p-2 my-2 font-semibold leading-6 text-black hover:text-slate-600 cursor-pointer">
                      Already a member ?
                    </a>

                    <a
                      href="#"
                      className=" font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Sign in now and enjoy !!
                    </a>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

{
  /* <form
onSubmit={(e) => e.preventDefault()}
className="text-[#fff] rounded-lg absolute my-20 mx-auto right-0 left-0 p-6 lg:p-12 w-10/12 lg:w-3/12 bg-[#4242f3] bg-opacity-80"
>
<h1
  className="text-3xl font-bold py-2 lg:py-4 text-black"
  onClick={handleButtonClick}
>
  {isSignIn ? "Sign In" : "Sign Up"}
</h1>
{!isSignIn && (
  <input
    ref={fullname}
    type="text"
    placeholder="Full Name"
    className="p-2 lg:p-4 my-2 lg:my-4 text-black w-full"
  />
)}
<input
  ref={email}
  type="text"
  placeholder="Email"
  className="p-2 lg:p-4 my-2 lg:my-4 text-black w-full"
/>
<input
  ref={password}
  type="password"
  placeholder="Password"
  className="p-2 lg:p-4 my-2 lg:my-4 text-black w-full"
/>
<p className="text-red-800 text-lg py-2 font-bold">{errMesage}</p>
<button
  type="button"
  className="p-2 lg:p-4 my-2 lg:my-6 text-black w-full rounded-lg bg-[#fff]"
  onClick={handleButtonClick}
>
  {isSignIn ? "Sign In" : "Sign Up"}
</button>
<p
  className="py-2 lg:py-4 cursor-pointer text-black font-bold text-lg"
  onClick={toggleSignIn}
>
  {isSignIn
    ? "New to GoalCast ? Sign Up now"
    : "Already a member Sign In now and enjoy "}
</p>
</form> */
}
