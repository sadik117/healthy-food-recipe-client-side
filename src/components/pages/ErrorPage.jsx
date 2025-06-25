import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <div className="py-24 text-center">
        <Helmet>
          <title>Error</title>
        </Helmet>
        <h1 className="mb-7 text-8xl font-thin text-gray-900">
          {error?.status || 404}
        </h1>
        <p className="mb-5 text-xl font-bold text-red-500 md:text-2xl">
          {error?.error?.message || "Something Went Wrong!"}
        </p>
        <Link to="/">
          <button className="btn bg-teal-600 text-white px-5 py-2 font-semibold rounded-md shadow">
            Go Back Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
