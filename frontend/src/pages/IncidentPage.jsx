import { useState } from "react";
import IncidentForm from "../components/IncidentForm";
import IncidentList from "../components/IncidentList";

export default function IncidentPage() {
  const [refresh, setRefresh] = useState(0);

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
      <IncidentForm onAdded={() => setRefresh((r) => r + 1)} />
      <hr />
      <IncidentList refreshTrigger={refresh} />
    </div>
  );
}
