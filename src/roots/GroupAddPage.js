import React, { useState } from "react";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { createGroup } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function GroupAddPage() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    createGroup({ title, members: members.map((m) => ({ email: m })) }).then(
      () => navigate("/dashboard/")
    );
  };

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState("");

  return (
    <div className="grow flex justify-center items-center lg:p-10 lg:px-24">
      <div className="bg-white lg:rounded-lg p-5 shadow-xl flex flex-col">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-5">
          <GroupAddIcon /> Create new Group
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

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <PersonAddAlt1Icon /> Add Members
            </label>
            <div
              className={
                "flex flex-col gap-1 " + (members.length === 0 && "hidden")
              }
            >
              {members.map((task, i) => (
                <div
                  key={task}
                  className="flex items-center justify-between bg-slate-400 rounded-lg px-2 p-1 ml-2"
                >
                  <div className="text-lg font-bold max-w-full truncate">
                    {task}
                  </div>
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setMembers((t) => t.filter((s, j) => j !== i && s));
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </div>
                </div>
              ))}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="person@example.com"
                className="input input-bordered w-full input-primary focus:outline-none"
                value={member}
                onChange={(e) => setMember(e.target.value)}
              />
              <span
                className="btn btn-primary"
                onClick={() => {
                  if (!member) return;

                  let newMember = member;
                  setMembers((t) => [...t, newMember]);
                  setMember("");
                }}
              >
                Add
              </span>
            </div>
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

export default GroupAddPage;
