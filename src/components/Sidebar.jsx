import React from "react";
import Calendar from "./icons/Calendar";
import Patient from "./icons/Patient";
import Logout from "./icons/Logout";
import { useUser } from "@auth0/nextjs-auth0/client";

const date = new Date();
const showTime = date.getHours() + ":" + date.getMinutes();
export default function Sidebar() {
  const { user, error, isLoading } = useUser();
  function renderNav() {
    if (user?.role == "doctor") {
      return (
        <nav>
          <ul className="space-y-6 uppercase">
            <li className="flex gap-2">
              <Calendar className="hover:bg-green-500" />
              <a href="/jhopkins/appointments">Appointments</a>
            </li>
            <li className="flex gap-2">
              <Patient />
              <a href="/jhopkins/mypatients">My Patients</a>
            </li>
          </ul>
        </nav>
      );
    }
    if (user?.role == "admin") {
      return (
        <nav>
          <ul className="space-y-6 uppercase">
            <li className="flex gap-2">
              <Calendar className="hover:bg-green-500" />
              <a href="/admin/allpatients">All Patients</a>
            </li>
            <li className="flex gap-2">
              <Patient />
              <a href="/admin/liveresults">Live Results</a>
            </li>
          </ul>
        </nav>
      );
    }
    if (user?.role == "fda") {
      return (
        <nav>
          <ul className="space-y-6 uppercase">
            <li className="flex gap-2">
              <Calendar className="hover:bg-green-500" />
              <a href="/fda/assigndrugs">Assign Drugs</a>
            </li>
            <li className="flex gap-2">
              <Patient />
              <a href="/fda/liveresults">Live Results</a>
            </li>
          </ul>
        </nav>
      );
    }
    if (user?.role == "bavaria") {
      return (
        <nav>
          <ul className="space-y-6 uppercase">
            <li className="flex gap-2">
              <Calendar className="hover:bg-green-500" />
              <a href="/bavaria/senddrugs">Send Drugs</a>
            </li>
            <li className="flex gap-2">
              <Patient />
              <a href="/bavaria/trailresults">Trial Results</a>
            </li>
            <li className="flex gap-2">
              <Patient />
              <a href="/bavaria/reports">Reports</a>
            </li>
          </ul>
        </nav>
      );
    }
  }
  return (
    <aside className="h-full flex flex-col justify-between max-w-xs w-full border-r border-slate-400 ">
      <div className="flex flex-col gap-20 p-5 ">
        <div id="logo" className="max-w-[50px]">
          <svg
            width="33"
            height="29"
            viewBox="0 0 33 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0.743487V3.79423C0 4.10861 0.197919 4.38894 0.494167 4.49417L10.5805 8.07676L0.475126 12.0017C0.18947 12.1127 0.00127176 12.3877 0.00127176 12.6941V16.1568C0.00127176 16.4621 0.188093 16.7363 0.472219 16.8481L10.8621 20.9339L0.486659 24.7453C0.194306 24.8527 0 25.131 0 25.4425V28.2565C0 28.7801 0.527301 29.1394 1.01462 28.9478L16.1276 23.0046L31.2406 28.9478C31.7279 29.1394 32.2552 28.7801 32.2552 28.2565V25.4425C32.2552 25.131 32.0609 24.8527 31.7685 24.7453L21.3931 20.9339L31.783 16.8481C32.0671 16.7363 32.2539 16.4621 32.2539 16.1568V12.6941C32.2539 12.3877 32.0657 12.1127 31.7801 12.0017L21.6747 8.07676L31.761 4.49417C32.0573 4.38894 32.2552 4.10861 32.2552 3.79423V0.743487C32.2552 0.221175 31.7304 -0.138009 31.2435 0.0510976L16.1276 5.92221L1.01171 0.0510976C0.524831 -0.138009 0 0.221175 0 0.743487ZM16.1276 10.0471L5.67465 13.7599C5.01951 13.9926 5.01454 14.9173 5.66715 15.1571L16.1276 18.9997L26.5881 15.1571C27.2407 14.9173 27.2357 13.9926 26.5805 13.7599L16.1276 10.0471Z"
              fill="#223B61"
              fillOpacity="0.76"
            />
          </svg>
        </div>
        {renderNav()}
      </div>

      <div>
        <div id="time" className="my-15 p-5">
          <time dateTime="2022-02-21" className="text-4xl font-bold">
            <span className="block text-base font-normal">
              Friday, February 21st
            </span>{" "}
            {showTime}
          </time>
        </div>

        <div
          id="profile"
          className="flex flex-row gap-4 bg-slate-100 p-5 justify-between"
        >
          <div className="flex">
            <picture className="w-[50px] h-[50px] rounded-full overflow-hidden mr-2">
              <img src="https://peprojects.dev/images/portrait.jpg" alt="" />
            </picture>
            <div>
              <p className="font-medium">Dr. Victor Severin</p>
              <p>Doctor Specialist</p>
            </div>
          </div>
          <a href="/api/auth/logout" title="Logout" className="mt-1">
            <Logout />
          </a>
        </div>
      </div>
    </aside>
  );
}
