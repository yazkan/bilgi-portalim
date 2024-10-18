import { useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { BreadCrumb } from "primereact/breadcrumb";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("UserSettings");

  const breadcrumbItems = [{ label: "Dashboard" }, { label: selectedMenu }];

  const menuItems = [
    {
      label: "User Settings",
      icon: "pi pi-fw pi-user",
      command: () => setSelectedMenu("UserSettings"),
      className:
        selectedMenu === "UserSettings"
          ? "active-menu-item"
          : "disable-menu-item",
    },
    {
      label: "Courses",
      icon: "pi pi-fw pi-book",
      command: () => setSelectedMenu("Courses"),
      className:
        selectedMenu === "Courses" ? "active-menu-item" : "disable-menu-item",
    },
    {
      label: "Reservations",
      icon: "pi pi-fw pi-calendar",
      command: () => setSelectedMenu("Reservations"),
      className:
        selectedMenu === "Reservations"
          ? "active-menu-item"
          : "disable-menu-item",
    },
    {
      label: "Messages",
      icon: "pi pi-fw pi-envelope",
      command: () => setSelectedMenu("Messages"),
      className:
        selectedMenu === "Messages" ? "active-menu-item" : "disable-menu-item",
    },
    {
      label: "Exercises",
      icon: "pi pi-fw pi-pencil",
      command: () => setSelectedMenu("Exercises"),
      className:
        selectedMenu === "Exercises" ? "active-menu-item" : "disable-menu-item",
    },
  ];

  const renderComponent = () => {
    switch (selectedMenu) {
      case "UserSettings":
        return <>UserSettings</>;
      case "Courses":
        return <>Courses</>;
      case "Reservations":
        return <>Reservations</>;
      case "Messages":
        return <>Messages</>;
      case "Exercises":
        return <>Exercises</>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <BreadCrumb model={breadcrumbItems} />
      </div>
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
