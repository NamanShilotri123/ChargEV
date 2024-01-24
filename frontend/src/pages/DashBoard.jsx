import { Button } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function DashBoard() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-[0.2] border-r-2 min-h-screen flex px-auto flex-col pt-5 space-y-5">
        <Link to={"/dashboard/profile"}>
          <Button variant="text" fullWidth>
            Profile
          </Button>
        </Link>
        <Link to={"/dashboard/bookedstation"}>
          <Button variant="text" fullWidth>
            Booked Station
          </Button>
        </Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoard;
