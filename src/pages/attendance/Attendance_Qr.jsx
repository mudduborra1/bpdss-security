import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axiosClient from "../../api/axiosClient";

export default function AttendanceQr() {
  const [qrUrl, setQrUrl] = useState("");
  const [scanned, setScanned] = useState(false);

  // =========================
  // Submit Attendance
  // =========================

  const submitAttendance = async (qrCode) => {
    try {
      const response = await axiosClient.post(
        "/v1/attendance/scan",
        {
          qr_code: qrCode,
        }
      );

      console.log("Attendance Response:", response.data);

    } catch (error) {
      console.error(
        "Attendance Error:",
        error
      );
    }
  };

  // =========================
  // Employee QR Image
  // =========================

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const empId = 6;

        const response = await axiosClient.get(
          `/v1/employees/${empId}/qr_image`,
          {
            responseType: "blob",
          }
        );

        const imageUrl = URL.createObjectURL(
          response.data
        );

        setQrUrl(imageUrl);

      } catch (error) {
        console.error(
          "QR Image Error:",
          error
        );
      }
    };

    fetchQr();
  }, []);

  // =========================
  // QR Scanner
  // =========================

  useEffect(() => {
     console.log("Starting scanner...");
     console.log(document.getElementById("reader"));
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    console.log("Starting scanner step 2 ...");

    scanner.render(
  (decodedText) => {
    alert(`Scanned: ${decodedText}`);
    console.log(decodedText);
  },
  () => {}
);

console.log("Starting scanner step 3 ...");
    // scanner.render(
    //   async (decodedText) => {

    //     if (scanned) return;

    //     setScanned(true);

    //     console.log(
    //       "QR Scanned:",
    //       decodedText
    //     );

    //     await submitAttendance(
    //       decodedText
    //     );

    //     setTimeout(() => {
    //       setScanned(false);
    //     }, 3000);
    //   },
    //   () => {}
    // );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanned]);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        QR Attendance
      </h1>

      {qrUrl && (
        <div className="mb-8">

          <h2 className="font-semibold mb-2">
            Employee QR
          </h2>

          <img
            src={qrUrl}
            alt="Employee QR"
            className="w-64 border rounded"
          />

        </div>
      )}

      <div>

        <h2 className="font-semibold mb-2">
          Scan QR
        </h2>

        <div id="reader"></div>

      </div>

    </div>
  );
}