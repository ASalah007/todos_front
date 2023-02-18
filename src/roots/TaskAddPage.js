import React, { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import NotesIcon from "@mui/icons-material/Notes";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AlarmIcon from "@mui/icons-material/Alarm";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function TaskAddPage() {
  const [dueDate, setDueDate] = useState(null);
  const [list, setList] = useState(null);
  const [subTasks, setSubTasks] = useState([]);

  const [files, setFiles] = useState([]);
  const fileInputRef = React.createRef();
  console.log(files);

  const handleFileUpload = (e) => {
    console.log(e.target.files);
    setFiles((old) => [...e.target.files, ...old]);
  };

  return (
    <div className="grow flex justify-center p-10 lg:px-24">
      <div className="bg-white grow rounded-lg p-5 shadow-xl flex flex-col">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <AddTaskIcon /> Create Task
        </h1>
        <form className="bg-red-100 grow grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Title
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Start Date
            </label>
            <input
              type="datetime-local"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Due Date
            </label>
            <input
              type="datetime-local"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> List
            </label>
            <select className="select select-primary w-full max-w-xs">
              <option selected>None</option>
              <option>Game of Thrones</option>
              <option>Lost</option>
              <option>Breaking Bad</option>
              <option>Walking Dead</option>
            </select>
          </div>

          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Group
            </label>
            <select className="select select-primary w-full max-w-xs">
              <option selected>None</option>
              <option>Game of Thrones</option>
              <option>Lost</option>
              <option>Breaking Bad</option>
              <option>Walking Dead</option>
            </select>
          </div>

          <div className="bg-green-100 flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Assign To
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="bg-green-100 flex flex-col gap-2 md:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Attach files
            </label>
            <label className="input-group">
              <span className="btn btn-primary">upload</span>
              <div className="input input-primary w-full bg-white"></div>
            </label>
          </div>

          <div className="bg-green-100 flex flex-col gap-2 md:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Add Subtasks
            </label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full input-primary focus:outline-none"
              />
              <span className="btn btn-primary">Add</span>
            </div>
          </div>

          <div className="bg-green-100 flex flex-col gap-2 md:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <LabelImportantIcon /> Notes
            </label>
            <textarea
              className="textarea textarea-primary"
              placeholder="Write important notes about your tasks."
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskAddPage;
