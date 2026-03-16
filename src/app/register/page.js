"use client";

import Link from 'next/link';

export default function RegisterPage() {
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
    color: '#000000', // Texto que escribes en negro
    transition: '0.3s',
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
      {/* Botón Volver al Inicio */}
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
        transition: '0.3s',
        fontWeight: '500'
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
      >
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
        {/* Encabezado */}
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

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <style>{`
            input::placeholder { color: #9ca3af; opacity: 1; }
          `}</style>

          {/* NOMBRE */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
              Nombre completo
            </label>
            <input type="text" placeholder="Ej: Pepito Pérez" style={inputStyle} 
              onFocus={(e) => { e.target.style.borderColor = bluePrimary; e.target.style.backgroundColor = 'white'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f3f4f6'; e.target.style.backgroundColor = '#f9fafb'; }}
            />
          </div>

          {/* CORREO */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
              Correo electrónico
            </label>
            <input type="email" placeholder="pepito@ejemplo.com" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = bluePrimary; e.target.style.backgroundColor = 'white'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f3f4f6'; e.target.style.backgroundColor = '#f9fafb'; }}
            />
          </div>

          {/* CONTRASEÑA */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input type="password" placeholder="Mínimo 8 caracteres" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = bluePrimary; e.target.style.backgroundColor = 'white'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f3f4f6'; e.target.style.backgroundColor = '#f9fafb'; }}
            />
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>
              Confirmar contraseña
            </label>
            <input type="password" placeholder="Repite tu contraseña" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = bluePrimary; e.target.style.backgroundColor = 'white'; }}
              onBlur={(e) => { e.target.style.borderColor = '#f3f4f6'; e.target.style.backgroundColor = '#f9fafb'; }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: bluePrimary,
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
              marginTop: '10px',
              boxShadow: `0 10px 20px -5px rgba(37, 99, 235, 0.4)`
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = bluePrimary}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
          >
            Registrarse ahora
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#4b5563' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" style={{ color: bluePrimary, fontWeight: 'bold', textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}