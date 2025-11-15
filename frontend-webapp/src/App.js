import React, { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BFF_URL + "/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Usuarios desde BFF</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.Id}>{u.Nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;