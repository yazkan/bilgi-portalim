import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const ExercisesPage = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      const response = await newRequest.get("/assignment");
      const formattedAssignments = response.data.map((assignment) => ({
        ...assignment, // Mevcut tüm alanları kopyala
        dueDate: formatDate(assignment.dueDate), // dueDate alanını formatla
      }));
      setAssignments(formattedAssignments);
    };

    fetchAssignments();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Yönlendirme butonu için hücre şablonu
  const actionTemplate = (rowData) => (
    <Button
      icon="pi pi-arrow-right"
      label="Git"
      className="p-button-rounded p-button"
      onClick={() => handleClick(rowData)} // Her ödevin detay sayfasına yönlendirir
    />
  );

  const handleClick = async (rowData) => {
    const response = await newRequest.get("/course/" + rowData.courseCode);
    localStorage.setItem("course", JSON.stringify(response.data[0]));
    navigate("/coursedetails");
  };

  return (
    <div
      className="assignment-list"
      style={{ maxWidth: "800px", margin: "2rem auto" }}
    >
      <h2>Ödev Listesi</h2>
      <DataTable value={assignments} paginator rows={5}>
        <Column
          field="courseCode"
          header="Ders Kodu"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="assignmentName"
          header="Ders Adı"
          sortable
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="dueDate"
          header="Teslim Tarihi"
          sortable
          style={{ width: "20%" }}
        ></Column>
        <Column
          body={actionTemplate}
          header="İşlem"
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ExercisesPage;
