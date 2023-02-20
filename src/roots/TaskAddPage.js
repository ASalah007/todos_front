import React, { useState, useEffect } from "react";
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
import {
  createTask,
  fetchUserGroups,
  fetchUserLists,
} from "../services/user_services";
import { useNavigate } from "react-router-dom";

function getLocalNow() {
  const dt = new Date(Date.now());
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}

function TaskAddPage() {
  const [subTasks, setSubTasks] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = React.createRef();
  const [groups, setGroups] = useState([]);
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [list, setList] = useState(0);
  const [startDate, setStartDate] = useState(getLocalNow());
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState(null);
  const [subTasksCount, setSubTasksCount] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserGroups().then((data) => {
      setGroups(data);
    });
    fetchUserLists().then((data) => {
      setLists(data);
      setList(data[0].id);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      notes,
      list,
    };
    if (group) task["group"] = group;
    if (dueDate) task["due_date"] = new Date(dueDate).toISOString();
    if (startDate) task["start_date"] = new Date(startDate).toISOString();
    if (email) task["assign_to"] = email;
    if (files) task["files"] = files;
    if (subTasks) task["subTasks"] = subTasks;
    setLoading(true);
    createTask(task).then(() => navigate("/dashboard"));
  };

  return (
    <div className="grow flex justify-center lg:p-10 lg:px-24">
      <div className="bg-white grow lg:rounded-lg p-5 shadow-xl flex flex-col relative lg:pb-20">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-5">
          <AddTaskIcon /> Create Task
        </h1>
        <form
          className="grow grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 auto-rows-min"
          onSubmit={handleSubmit}
        >
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

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <FormatListBulletedIcon /> List
            </label>
            <select
              className="select select-primary w-full "
              onChange={(e) => setList(e.target.value)}
              value={list}
            >
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <AccessTimeIcon /> Start Date
            </label>
            <input
              type="datetime-local"
              className="input input-bordered input-primary w-full "
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <AlarmIcon /> Due Date
            </label>
            <input
              type="datetime-local"
              className="input input-bordered input-primary w-full "
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <GroupsIcon /> Group
            </label>
            <select
              className="select select-primary w-full "
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option>None</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <AssignmentIndIcon /> Assign To
            </label>
            <input
              type="email"
              placeholder="someone@example.com"
              className="input input-bordered input-primary w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1 xl:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <AttachFileIcon className="rotate-45" /> Attach files
            </label>
            <label className="input-group">
              <span
                className="btn btn-primary"
                onClick={() => fileInputRef.current.click()}
              >
                upload
              </span>
              <div className="input input-primary w-full bg-white flex flex-wrap items-center overflow-y-auto gap-1 p-2">
                {files.map((file, i) => (
                  <div className="px-2 bg-primary-800 w-28 text-white rounded-2xl flex items-center text-xs font-bold">
                    <div className="w-20 truncate" title={file.name}>
                      {file.name}
                    </div>
                    <div
                      className="hover:cursor-pointer flex items-center"
                      onClick={() =>
                        setFiles((files) =>
                          files.filter((file, j) => j !== i && file)
                        )
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </div>
                  </div>
                ))}
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFiles((old) => [...e.target.files, ...old])}
              ref={fileInputRef}
              multiple
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <TaskAltIcon /> Add Subtasks
            </label>
            <div
              className={
                "flex flex-col gap-1 " + (subTasks.length === 0 && "hidden")
              }
            >
              {subTasks.map((task, i) => (
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
                      setSubTasks((t) => t.filter((s, j) => j !== i && s));
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
                placeholder="Title"
                className="input input-bordered w-full input-primary focus:outline-none"
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
              />
              <span
                className="btn btn-primary"
                onClick={() => {
                  if (!subTask) return;

                  let newTask = subTask;
                  const count = subTasksCount[subTask];
                  if (count) {
                    newTask += `(${count})`;
                    setSubTasksCount((s) => {
                      s[subTask] = count + 1;
                      return s;
                    });
                  } else {
                    subTasksCount[subTask] = 1;
                  }

                  setSubTasks((t) => [...t, newTask]);
                  setSubTask("");
                }}
              >
                Add
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3 xl:col-span-2">
            <label className="font-bold text-lg flex items-center gap-1">
              <NotesIcon /> Notes
            </label>
            <textarea
              className="textarea textarea-primary xl:h-40"
              placeholder="Write important notes about your tasks."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="flex lg:absolute bottom-4 right-4 lg:w-40 md:col-start-2">
            <button
              className={"btn grow " + (loading && "loading")}
              type="submit"
            >
              {!loading && "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskAddPage;
