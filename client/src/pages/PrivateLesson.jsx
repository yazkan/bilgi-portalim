import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import newRequest from "../utils/newRequest";

const PrivateLesson = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [topic, setTopic] = useState("");
  const toast = React.useRef(null);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    async function fetchTeachers() {
      console.log("Log: Get request /user/type/1");

      const response = await newRequest.get("/user/type/1");
      console.log("Teachers fetched:", response.data);

      setTeachers(
        response.data.map((teacher) => ({
          label: teacher.name,
          value: teacher,
        }))
      );
    }
    fetchTeachers();
  }, []);

  const handleSubmit = () => {
    if (!selectedTeacher || !topic) {
      toast.current.show({
        severity: "warn",
        summary: "Uyarı",
        detail: "Lütfen tüm alanları doldurun",
        life: 3000,
      });
      return;
    }
    // API'ye isteği gönderme kodu buraya gelecek
    console.log("Özel ders isteği gönderildi:", {
      teacher: selectedTeacher,
      topic,
    });
    toast.current.show({
      severity: "success",
      summary: "Başarılı",
      detail: "Özel ders isteği oluşturuldu",
      life: 3000,
    });
    setSelectedTeacher(null);
    setTopic("");
  };

  return (
    <div
      className="lesson-request-form"
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Toast ref={toast} />
      <h2>Özel Ders İsteği</h2>
      <div className="field">
        <label
          htmlFor="teacher"
          style={{ display: "block", marginBottom: ".5rem" }}
        >
          Öğretmen Seçin
        </label>
        <Dropdown
          id="teacher"
          value={selectedTeacher}
          options={teachers}
          onChange={(e) => setSelectedTeacher(e.value)}
          placeholder="Bir öğretmen seçin"
          style={{ width: "100%" }}
        />
      </div>
      <div className="field" style={{ marginTop: "1rem" }}>
        <label
          htmlFor="topic"
          style={{ display: "block", marginBottom: ".5rem" }}
        >
          Konu
        </label>
        <InputTextarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Hangi konuda ders almak istediğinizi yazın"
          rows={5}
          style={{ width: "100%" }}
        />
      </div>
      <Button
        label="Özel Ders İsteği Oluştur"
        icon="pi pi-check"
        onClick={handleSubmit}
        style={{ marginTop: "1rem", width: "100%" }}
      />
    </div>
  );
};

export default PrivateLesson;
