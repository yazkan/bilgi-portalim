// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "./CoursesPage.css"; // Add a custom CSS file for styling
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const CoursesPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    courseCode: "",
    imageUrl: "",
    enrolledNumber: 0,
  });

  // Fetch courses when the component mounts
  const fetchCourses = async () => {
    try {
      const response = await newRequest.get("/course");
      console.log("Courses fetched:", response.data);
      const response2 = await newRequest.get("/course/attend/" + user.id);
      console.log("Courses fetched2:", response2.data);

      const updatedData = response.data.map((course) => {
        const match = response2.data.find(
          (d2) => d2.courseCode === course.courseCode
        );
        return match ? { ...course, attend: match.attend } : course;
      });
      console.log("Courses updated:", updatedData);

      setCourses(updatedData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Kurslar yüklenemedi. Lütfen tekrar deneyin.");
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    // Varsayılan resim URL'si
    const updatedCourse = {
      ...newCourse,
      imageUrl:
        newCourse.imageUrl ||
        "https://www.hku.edu.tr/wp-content/themes/smarty/assets/img/tmp/placeholder.jpg",
      instructorName: user.name,
      instructorUsername: user.username,
    };

    try {
      const response = await newRequest.post("/course", updatedCourse);
      console.log("Course added:", response.data);

      // Kursu listeye ekleme
      setCourses((prevCourses) => [...prevCourses, updatedCourse]);

      // Dialog kapatma ve form sıfırlama
      setIsDialogVisible(false);
      setNewCourse({
        courseName: "",
        courseCode: "",
        imageUrl: "",
        enrolledNumber: 0,
      });
    } catch (error) {
      console.error("Error adding course:", error);
      // Hata durumunda kullanıcıyı bilgilendirin
      alert("Ders Eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  const handleShowCourse = async (code) => {
    try {
      const res = await newRequest.get("/course/" + code);
      localStorage.setItem(
        "course",
        JSON.stringify(res.data[0] ? res.data[0] : null)
      );
      navigate("/coursedetails");
    } catch (err) {
      console.log("Error: " + err.response.data.error);
    }
  };

  const handleAttendCourse = async (code) => {
    try {
      const res = await newRequest.post("/course/attend", {
        courseCode: code,
        studentId: user.id,
      });
      console.log("Course attended:", res.data);
      fetchCourses();
      alert("Derse katılım isteği gönderildi.");
    } catch (err) {
      console.error("Error attending course:", err);
      alert("Derse katılamadı. Lütfen tekrar deneyin.");
    }
  };

  const dialogFooter = (
    <div>
      <Button
        label="İptal"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setIsDialogVisible(false)}
      />
      <Button
        label="Kaydet"
        icon="pi pi-check"
        onClick={handleAddCourse}
        autoFocus
      />
    </div>
  );

  return (
    <div className="courses-page">
      <h2 className="page-title">Mevcut Dersler</h2>
      <div className="courses-container">
        <div
          className="course-wrapper"
          style={{
            cursor: "pointer",
            display: user && user.type == 1 ? "block" : "none",
          }}
        >
          <Card
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="course-card add-course-card"
            onClick={() => setIsDialogVisible(true)}
          >
            <div className="add-course-content">
              <i className="pi pi-plus" style={{ fontSize: "5rem" }}></i>
              <p className="add-course-text">Yeni Ders Ekle</p>
            </div>
          </Card>
        </div>
        {courses.map((course) => (
          <div className="course-wrapper" key={course.courseCode}>
            <Card
              title={course.courseName}
              subTitle={course.courseCode}
              header={
                <img
                  alt={course.courseName}
                  src={course.imageUrl}
                  className="course-image"
                />
              }
              className="course-card"
            >
              <p className="course-members">
                <span className="pi pi-users"></span> {course.enrolledNumber}{" "}
                Öğrenci
              </p>

              {user.type == 0 && course.attend != 1 ? (
                <Button
                  label="Derse Katıl"
                  icon="pi pi-eye"
                  className="p-button-outlined p-button-help"
                  onClick={() => handleAttendCourse(course.courseCode)}
                />
              ) : (
                <Button
                  label="Dersi Görüntüle"
                  icon="pi pi-eye"
                  className="p-button-outlined"
                  onClick={() => handleShowCourse(course.courseCode)}
                />
              )}
            </Card>
          </div>
        ))}
      </div>

      <Dialog
        header="Yeni Ders Ekle"
        visible={isDialogVisible}
        footer={dialogFooter}
        onHide={() => setIsDialogVisible(false)}
      >
        <div className="p-field">
          <p htmlFor="name">Dersin Adı</p>
          <InputText
            required
            id="name"
            value={newCourse.courseName}
            onChange={(e) =>
              setNewCourse({ ...newCourse, courseName: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <p htmlFor="code">Dersin Kodu</p>
          <InputText
            required
            id="code"
            value={newCourse.courseCode}
            onChange={(e) =>
              setNewCourse({ ...newCourse, courseCode: e.target.value })
            }
          />
        </div>
        <div className="p-field">
          <p htmlFor="image">Ders Kapak Resim URL</p>
          <InputText
            placeholder="İsteğe bağlı ekleyebilirsiniz..."
            id="image"
            value={newCourse.imageUrl}
            onChange={(e) =>
              setNewCourse({ ...newCourse, imageUrl: e.target.value })
            }
          />
        </div>
      </Dialog>
    </div>
  );
};

export default CoursesPage;
