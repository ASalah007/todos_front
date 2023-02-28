import React, { useState } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { createList } from "../services/user_services";
import { useNavigate } from "react-router-dom";

function ListAddPage() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    createList({ title }).then(() => navigate("/dashboard/"));
  };

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="grow flex justify-center items-center lg:p-10 lg:px-24">
      <div className="bg-white lg:rounded-lg p-5 shadow-xl flex flex-col">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-5">
          <PlaylistAddIcon /> Create New List
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Title
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full "
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button
            className={"btn grow " + (loading && "loading")}
            type="submit"
          >
            {!loading && "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListAddPage;
