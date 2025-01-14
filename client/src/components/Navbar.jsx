import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const menuRight = useRef(null);
  const menuNotifications = useRef(null);
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const notifications = null;
  const rightItems = [
    {
      label: "Ayarlar",
      icon: "pi pi-cog",
      command: () => navigate("/settings"),
    },
    {
      label: "Çıkış",
      icon: "pi pi-sign-out",
      command: handleExit,
    },
  ];

  const start = (
    <div
      className="navbar-logo"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img
        src="logo.png"
        alt="Logo"
        style={{ height: "60px", marginRight: "10px" }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Bilgi Portalım
      </span>
    </div>
  );

  const end = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        className="p-button-text"
        onClick={() => {
          navigate("/dashboard");
        }}
        aria-controls="popup_menu_right"
        aria-haspopup
      >
        Anasayfa
      </Button>
      <Menu
        model={notifications}
        popup
        ref={menuNotifications}
        id="notifications"
      />
      <Button
        className="p-button-text"
        onClick={(event) => menuNotifications.current?.toggle(event)}
        aria-controls="notifications"
        aria-haspopup
      >
        Bildirimler
      </Button>
      <Menu model={rightItems} popup ref={menuRight} id="popup_menu_right" />
      <Button
        className="p-button-text"
        onClick={(event) => menuRight.current?.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      >
        <span style={{ marginRight: "10px" }}>
          {user ? user.name : "Guest"}
        </span>
        <Avatar
          icon={user ? "pi pi-user" : "pi pi-question"}
          size="small"
          style={{ marginLeft: "12px" }}
        />
      </Button>
    </div>
  );

  return (
    <div>
      <Menubar start={start} end={end} />
    </div>
  );
};

export default Navbar;
