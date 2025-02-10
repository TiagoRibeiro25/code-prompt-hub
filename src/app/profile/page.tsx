"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

type Content = {
  password?: string;
  name?: string;
  email?: string;
  image?: string;
};

const ProfilePage: React.FC = (): React.JSX.Element => {
  const [image, setImage] = React.useState<Base64URLString>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useSession();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };

      reader.readAsDataURL(file); // Converts the file to Base64
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const content: Content = {};

      if (password) {
        content.password = password;
      }

      if (name && name !== data?.user?.name) {
        content.name = name;
      }

      if (email && email !== data?.user?.email) {
        content.email = email;
      }

      if (image && image !== data?.user?.image) {
        content.image = image;
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || responseData.error, {
          theme: "dark",
        });
      } else {
        toast.success("Account updated successfully!", { theme: "dark" });
        toast.info("Please Login again to see the changes!", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImage(data?.user?.image || "");
    setName(data?.user?.name || "");
    setEmail(data?.user?.email || "");
  }, [data?.user]);

  return (
    <div className="min-h-screen">
      <div className="pt-28 flex flex-col px-4">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-20">
          Edit Account Details
        </h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {image ? (
            <Image
              className="rounded-full border-2 border-red-500 object-cover w-32 h-32"
              src={image}
              width={150}
              height={150}
              alt="Profile Picture"
            />
          ) : (
            <FaRegUserCircle className="text-9xl cursor-pointer text-red-500" />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-4 border-2 border-red-500 p-2 rounded-lg cursor-pointer text-white sm:w-auto w-full"
          />

          <div className="my-4 sm:w-auto w-full">
            <label
              className="block text-red-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 sm:w-auto w-full">
            <label
              className="block text-red-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 sm:w-auto w-full">
            <label
              className="block text-red-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full shadow appearance-none border border-red rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center sm:w-60 w-full mb-12">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded w-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
