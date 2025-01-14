// src/pages/ErrorPage.jsx
import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        title="404 - Sayfa Bulunamadı"
        subTitle="Aradığınız sayfa mevcut değil veya başka bir yere taşınmış olabilir."
        style={{ textAlign: "center", width: "400px" }}
      >
        <p style={{ marginBottom: "1rem" }}>
          Lütfen adresi kontrol edin veya ana sayfaya dönün.
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

export default ErrorPage;
