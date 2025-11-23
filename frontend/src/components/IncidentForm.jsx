import { useEffect, useState } from "react";
import axios from "axios";

export default function IncidentForm({ onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  const submitIncident = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/incidents", {
        title,
        description,
        reported_by: user.id,
      });
      setTitle("");
      setDescription("");
      onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2>Report Incident</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={submitIncident} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <hr />
    </div>
  );
}
