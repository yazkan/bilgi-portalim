import { useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import "./Dashboard.css";
import MessagingPage from "./MessagingPage";
import CoursesPage from "./CoursesPage";
import UnauthorizedPage from "./UnauthorizedPage";
import PrivateLesson from "./PrivateLesson";
import ExercisesPage from "./ExercisesPage";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedMenu, setSelectedMenu] = useState("Courses");

  const menuItems = [
    {
      label: "Tüm Dersler",
      icon: "pi pi-fw pi-book",
      command: () => setSelectedMenu("Courses"),
      className:
        selectedMenu === "Courses" ? "active-menu-item" : "disable-menu-item",
    },
    {
      label: "Mesajlar",
      icon: "pi pi-fw pi-envelope",
      command: () => setSelectedMenu("Messages"),
      className:
        selectedMenu === "Messages" ? "active-menu-item" : "disable-menu-item",
    },
    {
      label: "Ödevler",
      icon: "pi pi-fw pi-pencil",
      command: () => setSelectedMenu("Exercises"),
      className:
        selectedMenu === "Exercises" ? "active-menu-item" : "disable-menu-item",
    },
    {
      label: "Özel Ders",
      icon: "pi pi-fw pi-calendar",
      command: () => setSelectedMenu("PrivateLesson"),
      className:
        selectedMenu === "PrivateLesson"
          ? "active-menu-item"
          : "disable-menu-item",
    },
  ];

  const renderComponent = () => {
    switch (selectedMenu) {
      case "Courses":
        return <CoursesPage />;
      case "Messages":
        return <MessagingPage />;
      case "Exercises":
        return <ExercisesPage />;
      case "PrivateLesson":
        return <PrivateLesson />;
      default:
        return null;
    }
  };

  // Redirect to UnauthorizedPage if no user is found
  if (!user) {
    return <UnauthorizedPage />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="drawer-menu">
          <PanelMenu model={menuItems} />
        </div>
        <div className="dashboard-content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
