import { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const Navbar = () => {
  const menuRight = useRef(null);
  const items = [
    {
      label: "Anasayfa",
      icon: "pi pi-home",
      command: () => navigateToHome(),
    },
    {
      label: "Ders Kaynakları",
      icon: "pi pi-book",
      command: () => navigateToCourses(),
    },
    {
      label: "Bildirimler",
      icon: "pi pi-bell",
      command: () => navigateToMessages(),
    },
    {
      label: "Ders Başlat/Katıl",
      icon: "pi pi-desktop",
      command: () => navigateToMessages(),
    },
  ];

  const rightItems = [
    {
      label: "Ayarlar",
      icon: "pi pi-cog",
      command: () => navigateToHome(),
    },
    {
      label: "Çıkış",
      icon: "pi pi-sign-out",
      command: () => navigateToCourses(),
    },
  ];

  const start = (
    <div className="navbar-logo">
      <img
        src="logo.png"
        alt="Logo"
        style={{ height: "40px", marginRight: "10px" }}
      />
    </div>
  );

  const end = (
    <div>
      <Menu
        model={rightItems}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
      <Button
        className="p-button-text"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      >
        <span style={{ marginRight: "10px" }}>Kullanıcı Adı</span>
        <Avatar icon="pi pi-user" size="small" style={{ marginLeft: "12px" }} />
      </Button>
    </div>
  );

  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

// Örnek navigasyon fonksiyonları
const navigateToHome = () => {
  console.log("Ana sayfaya git");
};

const navigateToCourses = () => {
  console.log("Kurslar sayfasına git");
};

const navigateToMessages = () => {
  console.log("Mesajlar sayfasına git");
};

export default Navbar;
