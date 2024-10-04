import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import mediasoupClient from "mediasoup-client"; // Mediasoup client kütüphanesi
import io from "socket.io-client"; // WebSocket bağlantısı için socket.io-client

const VideoConference = () => {
  const [participants, setParticipants] = useState([]); // Katılımcı listesi
  const [isMuted, setIsMuted] = useState(false); // Sessiz mod kontrolü
  const [videoEnabled, setVideoEnabled] = useState(true); // Video açık/kapalı durumu
  const [socket, setSocket] = useState(null); // WebSocket bağlantısı
  const [producer, setProducer] = useState(null); // Mediasoup producer (video/ses akışı)
  const videoRef = useRef(null); // Video elemanına referans
  const toast = useRef(null); // Toast mesajı için referans

  useEffect(() => {
    // WebSocket bağlantısı oluşturuluyor
    const newSocket = io("http://localhost:3000"); // Backend'deki WebSocket adresine bağlanıyoruz
    setSocket(newSocket);

    // Socket.io bağlantısı kapatılırken temizleme
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Mediasoup client tarafı - Transport oluşturma ve video akışını başlatma
  useEffect(() => {
    if (!socket) return;

    // Sunucudan 'connect' eventi ile sinyali aldığımızda mediasoup producer başlatılır
    socket.on("connect", async () => {
      // Mediasoup router ile WebRTC transportlarını kur
      const device = new mediasoupClient.Device();

      // Sunucudan RTP capabilities bilgisi alınıyor
      const rtpCapabilities = await socket.emit("getRouterRtpCapabilities");
      await device.load({ routerRtpCapabilities: rtpCapabilities });

      // WebRTC producer (video/ses akışı) oluşturuluyor
      const transport = await createSendTransport(socket, device);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const videoTrack = stream.getVideoTracks()[0];

      // Producer oluşturarak video akışını sunucuya yönlendirme
      const newProducer = await transport.produce({ track: videoTrack });
      setProducer(newProducer);

      videoRef.current.srcObject = stream; // Yerel video akışını ekrana bağla
    });

    // Hata yakalama
    socket.on("error", (err) => {
      toast.current.show({
        severity: "error",
        summary: "Socket error",
        detail: err.message,
      });
    });
  }, [socket]);

  // Sessiz modu yönetir
  const toggleMute = () => {
    if (producer) {
      producer.pause(); // Üreticiyi durdur
      setIsMuted(!isMuted);
    }
  };

  // Video aç/kapa işlevi
  const toggleVideo = () => {
    if (producer) {
      videoEnabled ? producer.pause() : producer.resume();
      setVideoEnabled(!videoEnabled);
    }
  };

  // WebRTC Send Transport oluşturulması (Mediasoup backend ile işbirliği içinde)
  const createSendTransport = async (socket, device) => {
    const transportParams = await socket.emit("createWebRtcTransport", {
      consumer: false,
    });
    const transport = device.createSendTransport(transportParams);

    // Transport eventleri
    transport.on("connect", ({ dtlsParameters }, callback, errback) => {
      socket.emit("connectTransport", { dtlsParameters });
      callback();
    });

    transport.on("produce", ({ kind, rtpParameters }, callback, errback) => {
      socket.emit("produce", { kind, rtpParameters }, (producerId) => {
        callback({ id: producerId });
      });
    });

    return transport;
  };

  return (
    <div
      className="p-grid p-align-center p-justify-center"
      style={{ height: "100vh" }}
    >
      <div className="p-col-12 p-md-8 p-lg-6">
        <Panel header="Conference Room" className="p-mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            style={{ width: "100%" }}
          />
        </Panel>

        {/* Kontrol düğmeleri */}
        <div className="p-d-flex p-ai-center p-jc-between p-mt-3">
          <Button
            label={isMuted ? "Unmute" : "Mute"}
            icon="pi pi-volume-off"
            onClick={toggleMute}
            className="p-button-rounded p-button-secondary"
          />
          <Button
            label={videoEnabled ? "Stop Video" : "Start Video"}
            icon="pi pi-video"
            onClick={toggleVideo}
            className="p-button-rounded p-button-warning"
          />
          <Button
            label="End Call"
            icon="pi pi-times"
            className="p-button-rounded p-button-danger"
          />
        </div>
      </div>

      {/* Katılımcı listesi */}
      <div className="p-col-12 p-md-4 p-lg-3">
        <Panel header="Participants" className="p-mb-4">
          {participants.length === 0 ? (
            <p>No participants yet.</p>
          ) : (
            participants.map((participant, index) => (
              <div key={index} className="p-d-flex p-ai-center p-jc-between">
                <span>{participant.name}</span>
              </div>
            ))
          )}
        </Panel>
        <Toast ref={toast} />
      </div>
    </div>
  );
};

export default VideoConference;
