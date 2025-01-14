import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const SettingsPage = () => {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Yeni şifreler eşleşmiyor.");
      return;
    }

    // Şifre değiştirme isteği (örnek simülasyon)
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    alert("Şifreniz başarıyla değiştirildi!");
  };

  return (
    <div
      className="change-password"
      style={{ maxWidth: "400px", margin: "2rem auto" }}
    >
      <h2>Ayarlar</h2>
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="username">Kullanıcı Adı</label>
          <InputText id="username" value={username} disabled />
        </div>
        <div className="field">
          <label htmlFor="oldPassword">Eski Şifre</label>
          <Password
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            feedback={false}
            toggleMask
            placeholder="Eski şifrenizi girin"
          />
        </div>
        <div className="field">
          <label htmlFor="newPassword">Yeni Şifre</label>
          <Password
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            toggleMask
            placeholder="Yeni şifrenizi girin"
          />
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">Yeni Şifreyi Tekrar Girin</label>
          <Password
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleMask
            placeholder="Yeni şifreyi tekrar girin"
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button
          label="Kaydet"
          icon="pi pi-save"
          onClick={handleSave}
          className="p-button"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
