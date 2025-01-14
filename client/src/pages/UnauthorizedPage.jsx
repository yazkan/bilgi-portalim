// src/pages/UnauthorizedPage.jsx
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffe6e6",
      }}
    >
      <Card
        title="403 - Yetkisiz Erişim"
        subTitle="Bu sayfaya erişim izniniz bulunmamaktadır."
        style={{ textAlign: "center", width: "400px" }}
      >
        <p style={{ marginBottom: "1rem" }}>
          Eğer bir hata olduğunu düşünüyorsanız, lütfen yöneticinizle iletişime
          geçin.
        </p>
        <Button
          label="Ana Sayfaya Dön"
          icon="pi pi-home"
          onClick={() => navigate("/")}
        />
      </Card>
    </div>
  );
}

export default UnauthorizedPage;
