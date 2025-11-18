import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logs() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLogs(res.data));
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>System Logs</h2>

      <div
        style={{
          width: "50%",
          height: "500px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>User</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Action
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {log.user || "Unknown"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {log.action}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </div>
  );
}
