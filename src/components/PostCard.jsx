import React from "react";
import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className='bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col justify-between h-full"'>
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />

        <h2 className="ttext-lg font-semibold text-gray-900 mt-2 text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
