import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const CourseDetailsPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const course = JSON.parse(localStorage.getItem("course") || "{}");
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
  const [newAssignmentDueDate, setNewAssignmentDueDate] = useState(null);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchAssignments = async () => {
    try {
      const response = await newRequest.get(
        "/assignment/courseCode/" + course.courseCode
      );
      console.log("assignments fetched:", response.data);
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchApllicants = async () => {
    try {
      const response = await newRequest.get(
        "/course/attendedStudents/" + course.courseCode
      );
      setApplicants(response.data);
      console.log("applicants fetched:", response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await newRequest.get("/post/" + course.courseCode);
      console.log("Posts fetched:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchAssignments();
    fetchApllicants();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleAcceptApplicant = async (app) => {
    setApplicants(applicants.filter((applicant) => applicant.id !== app.id));
    await newRequest.put("/course/attend", {
      studentId: app.id,
      courseCode: course.courseCode,
      attend: 1,
    });
  };

  const handleRejectApplicant = async (app) => {
    setApplicants(applicants.filter((applicant) => applicant.id !== app.id));
    await newRequest.post("/course/attendDelete", {
      studentId: app.id,
      courseCode: course.courseCode,
    });
  };

  const handlePostSubmit = async () => {
    if (newPost.trim()) {
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime
        .toLocaleString("tr-TR")
        .split(" ")[0];

      await newRequest.post("/post", {
        courseCode: course.courseCode,
        name: user.name,
        content: newPost,
        date: formattedDateTime,
      });
      setPosts([
        ...posts,
        {
          courseCode: course.courseCode,
          name: user.name,
          content: newPost,
          date: formattedDateTime,
        },
      ]);
      setNewPost("");
    }
  };

  const handleAddAssignment = async () => {
    if (newAssignmentTitle.trim() && newAssignmentDueDate) {
      await newRequest.post("/assignment", {
        assignmentName: newAssignmentTitle,
        dueDate: newAssignmentDueDate.toLocaleDateString(),
        courseCode: course.courseCode,
      });
      const response = await newRequest.get(
        "/assignment/courseCode/" + course.courseCode
      );
      setAssignments(response.data);
      setNewAssignmentTitle("");
      setNewAssignmentDueDate(null);
      alert("Ödev eklendi!");
    }
  };

  const handleDeleteCourse = () => {
    newRequest.delete(`/course/${course.courseCode}`);
    localStorage.removeItem("course");
    navigate("/dashboard");
  };

  const handleUploadAssignment = () => {
    setUploadDialogVisible(true);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("courseCode", course.courseCode);

      try {
        await newRequest.post("/assignment/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Dosya başarıyla yüklendi!");
        setUploadDialogVisible(false);
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Dosya yüklenirken bir hata oluştu.");
      }
    }
  };

  const handleDownloadAssignment = () => {
    alert("Assignment download functionality is not implemented yet.");
  };

  const handleDeleteAssignment = (id) => {
    newRequest.delete(`/assignment/${id}`);
    setAssignments(
      assignments.filter((assignment) => assignment.assignmentId !== id)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ flex: 1, padding: "20px 40px", overflowY: "auto" }}>
        <div className="p-grid p-nogutter" style={{ marginBottom: "20px" }}>
          <div className="p-col-12">
            <Card style={{ maxWidth: "600px", margin: "auto" }}>
              <img
                src={course.imageUrl}
                alt="Course Cover"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <div style={{ marginTop: "20px" }}>
                <h2>{course.courseName}</h2>
                <h4 style={{ color: "#999" }}>
                  Dersin Kodu: {course.courseCode}
                  <br />
                  Eğitmen: {course.instructorName}
                </h4>
              </div>
            </Card>
          </div>
        </div>

        <TabView>
          <TabPanel header="Gönderiler">
            <div>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  style={{ marginBottom: "10px", position: "relative" }}
                >
                  <p>
                    <strong>{post.name}:</strong> {post.content}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8em",
                      color: "gray",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                  >
                    İleti Zamanı: {post.date}
                  </p>
                </Card>
              ))}
            </div>
            <Card style={{ marginBottom: "20px" }}>
              <h3>Yeni İleti Gönder</h3>
              <InputTextarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={5}
                placeholder="İçeriği buraya yazın..."
                style={{ width: "100%" }}
              />
              <Button
                label="Gönder"
                onClick={handlePostSubmit}
                style={{ marginTop: "10px" }}
              />
            </Card>
          </TabPanel>
          <TabPanel header="Ödevler">
            <div>
              {assignments.map((assignment) => (
                <Card
                  key={assignment.assignmentId}
                  style={{ marginBottom: "10px" }}
                >
                  <h4>{assignment.assignmentName}</h4>
                  <p>Son Tarih: {formatDate(assignment.dueDate)}</p>
                  <Button
                    visible={user.type == 0}
                    style={{ marginRight: "10px" }}
                    label="Ödevi Yükle"
                    onClick={handleUploadAssignment}
                  />
                  <Button
                    style={{ marginRight: "10px" }}
                    label="Ödevi İndir"
                    className="p-button-help"
                    onClick={handleDownloadAssignment}
                  />
                  <Button
                    visible={user.type == 1}
                    label="Ödevi Sil"
                    className="p-button-danger"
                    onClick={() =>
                      handleDeleteAssignment(assignment.assignmentId)
                    }
                  />
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Derse Katılma İstekleri" visible={user.type == 1}>
            <div>
              {applicants.map((applicant) => (
                <Card key={applicant.id} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Kullanıcı Adı:</strong> {applicant.username}
                  </p>
                  <p>
                    <strong>Adı:</strong> {applicant.name}
                  </p>
                  <div>
                    <Button
                      label="Kabul Et"
                      onClick={() => handleAcceptApplicant(applicant)}
                      style={{ marginRight: "10px" }}
                    />
                    <Button
                      label="Reddet"
                      onClick={() => handleRejectApplicant(applicant)}
                      className="p-button-danger"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="Ödev Ekle" visible={user.type == 1}>
            <Card style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "30px" }}>Yeni Ödev Ekle</h3>
              <div style={{ marginBottom: "30px" }}>
                <span className="p-float-label">
                  <InputText
                    id="assignmentTitle"
                    value={newAssignmentTitle}
                    onChange={(e) => setNewAssignmentTitle(e.target.value)}
                  />
                  <label htmlFor="assignmentTitle">Ödev Adı</label>
                </span>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <span className="p-float-label">
                  <Calendar
                    id="assignmentDueDate"
                    value={newAssignmentDueDate}
                    onChange={(e) => setNewAssignmentDueDate(e.value)}
                    showIcon
                  />
                  <label htmlFor="assignmentDueDate">Son Tarih</label>
                </span>
              </div>
              <Button
                label="Ekle"
                onClick={handleAddAssignment}
                style={{ marginTop: "10px" }}
              />
            </Card>
          </TabPanel>
          <TabPanel header="Dersi Sil" visible={user.type == 1}>
            <Card style={{ marginBottom: "20px" }}>
              <h3>Dersi Silmek İstediğinizden Emin Misiniz?</h3>
              <Button
                label="Evet"
                onClick={handleDeleteCourse}
                className="p-button-danger"
                style={{ marginTop: "10px" }}
              />
            </Card>
          </TabPanel>
        </TabView>

        <Dialog
          header="Ödev Yükle"
          visible={uploadDialogVisible}
          style={{ width: "50vw" }}
          modal
          onHide={() => setUploadDialogVisible(false)}
        >
          <FileUpload
            name="file"
            chooseLabel="Dosya Seç"
            customUpload
            auto
            accept=".pdf,.doc,.docx,.zip"
            uploadHandler={handleFileSelect}
          />
          <Button
            label="Yükle"
            onClick={handleFileUpload}
            style={{ marginTop: "10px" }}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
