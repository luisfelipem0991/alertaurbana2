"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [huecos, setHuecos] = useState([]);

  // 🔐 PROTEGER POR ROL
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "ADMIN" && payload.role !== "SUPERADMIN") {
      router.push("/huecos");
    }

  }, []);

  // 🔥 CARGAR DATOS
  useEffect(() => {
    fetchUsers();
    fetchHuecos();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHuecos = async () => {
    try {
      const res = await fetch("/api/huecos");
      const data = await res.json();
      setHuecos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ ELIMINAR USUARIO
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  return (
   <main style={{ 
  padding: "30px", 
  background: "#f3f4f6", 
  minHeight: "100vh",
  color: "#111827" // 👈 TEXTO NEGRO
}}>

      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>
          Panel de Administración
      </h1>

      {/* 👥 USUARIOS */}
      <section style={{ marginTop: "30px" }}>
        <h2>Usuarios</h2>

        {users.map((user) => (
          <div key={user.id} style={card}>
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
            <p>Rol: {user.role}</p>

            <button style={deleteBtn} onClick={() => deleteUser(user.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </section>

      {/* 📍 HUECOS */}
      <section style={{ marginTop: "40px" }}>
        <h2>Huecos</h2>

        {huecos.map((h) => (
          <div key={h.id} style={card}>
            <p><strong>Ubicación:</strong> {h.location}</p>
            <p><strong>Estado:</strong> {h.status}</p>
          </div>
        ))}
      </section>

    </main>
  );
}

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "10px",
};

const deleteBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};