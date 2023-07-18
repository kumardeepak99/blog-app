"use client";

import { useDispatch, useSelector } from "react-redux";
import { BlogHomeTextConstants } from "../constants/texts/BlogHomeTextConstants";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { deleteUser } from "../store/features/userSlice";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(deleteUser());
    router.push("/");
  };
  return (
    <div>
      <p className="flex flex-col items-center m-10">
        {BlogHomeTextConstants.aboutBlog}
      </p>
      <p className="m-10">{user.email}</p>
      <button className="button" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  );
}
