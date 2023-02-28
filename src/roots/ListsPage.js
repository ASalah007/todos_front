import React, { useEffect, useState } from "react";
import { fetchUserLists } from "../services/user_services";
import Group from "../components/Group.js";
import CreateButton from "../components/CreateButton";
import ListPreview from "../components/ListPreview";

function ListsPage() {
  const [lists, setLists] = useState(null);
  useEffect(() => {
    fetchUserLists().then((data) => {
      if (data) setLists(data);
    });
  }, []);

  return (
    <div className="grow flex md:items-center justify-center p-10 md:p-32">
      <div className="grow flex justify-center flex-wrap gap-5">
        {lists &&
          lists.map((list) => <ListPreview list={list} key={list.id} />)}
      </div>
      <CreateButton />
    </div>
  );
}

export default ListsPage;
