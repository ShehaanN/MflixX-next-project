export default function Loginpage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black ">
      <div className="w-[380px] mx-auto">
        <div className="bg-white shadow-md border rounded-lg p-4">
          <form action="#" className="space-y-6">
            <h3 className="text-center text-xl font-semibold text-gray-900">
              Sign in your account
            </h3>
            {/*email*/}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 "
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className=" bg-[gray-40] border border-gray-300  rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                placeholder="yourname@gmail.com"
              />
            </div>
            {/*password*/}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className=" bg-[gray-40] border border-gray-300  rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                placeholder="*************"
              />
            </div>

            <div className="flex flex-row items-start justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-300 h-4 w-4 rounded"
                    id="remember"
                  />
                </div>

                <div className="text-sm ml-3">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <a
                href="/forget-password"
                className="text-sm text-blue-700 font-medium hover:underline "
              >
                Forget password?
              </a>
            </div>

            {/*submit button */}
            <button>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
