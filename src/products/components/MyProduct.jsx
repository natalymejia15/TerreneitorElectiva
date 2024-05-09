import { Link } from "react-router-dom";

export const MyProduct = () => {
  return (
    <>
      <div className="mx-auto h-screen">
        <div className="py-20 bg-violet-100">
          <div className="container px-6 text-gray-500 md:px-12 xl:px-0">
            <div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
              <div className="w-30vw bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
                <div className="mb-12 space-y-4 ">
                  <h4 className="text-2xl font-semibold text-violet-900">
                    My products & launches
                  </h4>
                  <p className="mb-6">LAUNCHES</p>

                  <ul className="mt-2 text-gray-700">
                    <li className="flex border-y py-2">
                      <span className="font-bold w-24">Full name:</span>
                      <span className="text-gray-700">Amanda S. Ross</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">24 Jul, 1991</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Password:</span>
                      <span className="text-gray-700">
                        10 Jan 2022 (25 days ago)
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Created At:</span>
                      <span className="text-gray-700">
                        10 Jan 2022 (25 days ago)
                      </span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Updated At:</span>
                      <span className="text-gray-700">
                        10 Jan 2022 (25 days ago)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-70vw bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
                <div className="mb-12 space-y-4">
                  <h3 className="text-2xl font-semibold text-violet-900 justify-center ">
                    Looks like you dont have any posts yet
                  </h3>
                  <Link to="/NewProduct">
                    <button className="mt-2 bg-violet-500 text-white px-4 py-2 rounded-md">
                      New Product
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
