"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  // ✅ ESTADOS (NUEVO)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const blueDark = "#1e3a8a"; 
  const bluePrimary = "#2563eb"; 
  const blueLight = "#eff6ff";

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '14px',
    border: '2px solid #f3f4f6',
    backgroundColor: '#f9fafb',
    boxSizing: 'border-box',
    outline: 'none',
    fontSize: '16px',
    color: '#000000',
    transition: '0.3s',
  };

  // 🔐 REGISTRO (NUEVO)
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Usuario registrado correctamente");

      // 🔥 Redirige al login
      router.push("/login");

    } catch (error) {
      alert("Error al registrar");
    }
  };

  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 100%)`,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>

      <Link href="/" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: '10px 20px',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)',
        fontWeight: '500'
      }}>
        ← Volver al Inicio
      </Link>

      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '420px',
      }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            backgroundColor: blueLight,
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            border: `2px solid ${bluePrimary}`,
            fontSize: '30px',
            transform: 'rotate(5deg)'
          }}>
            📝
          </div>
          <h1 style={{ fontSize: '26px', color: '#111827', margin: '0', fontWeight: '800' }}>Crear Cuenta</h1>
          <p style={{ color: '#4b5563', fontSize: '14px', marginTop: '8px' }}>Únete a nuestra plataforma</p>
        </div>

        {/* ✅ FORM CON LÓGICA */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <style>{`
            input::placeholder { color: #9ca3af; opacity: 1; }
          `}</style>

          {/* NOMBRE */}
          <div>
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder="Ej: Pepito Pérez"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="pepito@ejemplo.com"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            backgroundColor: bluePrimary,
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
          }}>
            Registrarse ahora
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
}