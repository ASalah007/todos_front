import React, { useEffect, useState } from "react";
import { fetchUserGroups } from "../services/user_services";
import Group from "../components/Group.js";
import CreateButton from "../components/CreateButton";

function GroupsPage() {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    fetchUserGroups().then((data) => {
      if (data) setGroups(data);
    });
  }, []);

  return (
    <div className="grow flex md:items-center justify-center p-10 md:p-32">
      <div className="grow flex justify-center flex-wrap gap-5">
        {groups &&
          groups.map((group) => <Group group={group} key={group.id} />)}
      </div>
      <CreateButton />
    </div>
  );
}

export default GroupsPage;
