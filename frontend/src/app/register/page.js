"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // ✅ ESTADOS (NUEVO)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const blueDark = "#1e3a8a"; 
  const bluePrimary = "#2563eb"; 
  const blueLight = "#ece5e5";

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '14px',
    border: '2px solid #696a6d',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
    outline: 'none',
    fontSize: '16px',
    color: '#000000',
    transition: '0.3s',
  };

  const labelStyle = {
    display: 'block',
    color: '#111827',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
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
      const res = await fetch(`${apiBaseUrl}/api/register`, {
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

      // ✅ Mostrar el modal en vez del alert()
      setShowSuccess(true);

      // 🔥 Redirige al login automáticamente después de un momento
      setTimeout(() => {
        router.push("/login");
      }, 2200);

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
            @keyframes popIn {
              0% { transform: scale(0.7); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes checkDraw {
              0% { stroke-dashoffset: 40; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
          `}</style>

          {/* NOMBRE */}
          <div>
            <label style={labelStyle}>Nombre completo</label>
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
            <label style={labelStyle}>Correo electrónico</label>
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
            <label style={labelStyle}>Contraseña</label>
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
            <label style={labelStyle}>Confirmar contraseña</label>
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
          <p style={{ fontSize: '14px', color: '#374151' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" style={{ color: bluePrimary, fontWeight: 'bold' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>

      {/* 🎉 MODAL DE ÉXITO */}
      {showSuccess && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '28px',
              padding: '40px 32px',
              width: '90%',
              maxWidth: '360px',
              textAlign: 'center',
              boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.45)',
              animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12.5L9.5 18L20 6"
                  stroke="#16a34a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="40"
                  style={{ animation: 'checkDraw 0.5s 0.2s ease-out forwards' }}
                />
              </svg>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: 0 }}>
              ¡Cuenta creada!
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '10px', lineHeight: '1.5' }}>
              Tu registro fue exitoso. Te estamos llevando al inicio de sesión...
            </p>

            <button
              onClick={() => router.push("/login")}
              style={{
                marginTop: '24px',
                width: '100%',
                padding: '13px',
                backgroundColor: bluePrimary,
                color: 'white',
                fontSize: '15px',
                fontWeight: 'bold',
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Ir a iniciar sesión ahora
            </button>
          </div>
        </div>
      )}
    </main>
  );
}