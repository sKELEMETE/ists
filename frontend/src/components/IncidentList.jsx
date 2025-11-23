import { useEffect, useState } from "react";
import axios from "axios";

export default function IncidentList({ refreshTrigger }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const fetchIncidents = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("http://localhost:5000/api/incidents");
      setIncidents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [refreshTrigger]); // refresh when trigger changes

  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p>{error}</p>;
  if (incidents.length === 0) return <p>No incidents reported.</p>;

  return (
    <div>
      <h2>Incident Reports</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Reported By</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.reported_by}</td>
              <td>{new Date(i.date_reported).toLocaleString()}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
