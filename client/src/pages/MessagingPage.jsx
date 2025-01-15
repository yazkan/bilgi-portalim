import React, { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import newRequest from "../utils/newRequest";

const MessagingPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, []);

  // fetchMessages içinde kullanıcıları ID'ye göre eşleyin
  useEffect(() => {
    if (users.length > 0 && selectedUser) {
      fetchMessages();
    }
  }, [users, selectedUser]);

  const fetchMessages = async () => {
    try {
      const response = await newRequest.get("/message", {
        params: {
          senderId: user.id,
          receiverId: selectedUser?.id || null,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await newRequest.get("/users");
      setUsers(response.data.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const messageEndRef = useRef(null);

  const convertToDateTime = (dateTimeStr) => {
    const [date, time] = dateTimeStr.split(" ");
    const [day, month, year] = date.split(".");
    const formattedDateTime = `${year}-${month}-${day} ${time}`;
    return formattedDateTime;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    const currentDateTime = new Date();
    const formattedDateTime = convertToDateTime(
      currentDateTime.toLocaleString()
    );

    const newMessage = {
      senderName: user.name,
      senderId: user.id,
      receiverId: selectedUser.id,
      timestamp: formattedDateTime,
      content: message,
    };

    try {
      await newRequest.post("/message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Message sent:", newMessage);
      console.log("Messages:", messages);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Scroll to the last message when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="p-grid" style={{ height: "100vh" }}>
      {/* Kullanıcı Listesi */}
      <div className="p-col-3" style={{ borderRight: "1px solid #ccc" }}>
        <h3>Kullanıcılar</h3>
        <ListBox
          value={selectedUser}
          options={users}
          optionLabel="name"
          onChange={(e) => {
            setSelectedUser(e.value);
            fetchMessages();
          }}
          style={{ maxHeight: "300px", overflowY: "auto" }} // Scrollbar için
          itemTemplate={(user) => (
            <div>
              <span>{user.name}</span>
              <span
                className={`ml-2 badge ${
                  user.status === "online" ? "bg-success" : "bg-secondary"
                }`}
              >
                {user.status}
              </span>
            </div>
          )}
        />
      </div>

      {/* Mesaj Alanı */}
      <div className="p-col-9">
        {selectedUser ? (
          <>
            <h3>{selectedUser.name} ile Mesajlaşma</h3>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {messages.map((msg, idx) => (
                <Card
                  style={{ position: "relative" }}
                  key={idx}
                  className="mb-2"
                >
                  <p>
                    <strong>{msg.senderName}: </strong>
                    {msg.content}
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
                    İleti Zamanı: {msg.timestamp}
                  </p>
                </Card>
              ))}
              <div ref={messageEndRef} />
            </div>
            <Divider />
            <div className="p-inputgroup">
              <InputTextarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`${selectedUser.name} için mesaj yazın...`}
                rows={3}
                autoResize
              />
              <Button
                label="Gönder"
                icon="pi pi-send"
                onClick={handleSendMessage}
              />
            </div>
          </>
        ) : (
          <p>Lütfen mesajlaşmak için bir kullanıcı seçin.</p>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
