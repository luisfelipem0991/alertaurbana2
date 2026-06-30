"use client";

import { useState } from "react";

export default function ReportarHueco() {
  const [formData, setFormData] = useState({
    descripcion: "",
    gravedad: "media",
    direccion: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Reporte enviado correctamente 🚧");
  };

  return (
    <main className="min-h-screen bg-gray-300 py-16 px-6">

      <div className="max-w-3xl mx-auto bg-gray-100 p-10 rounded-2xl shadow-lg text-black">

        <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">
          Reportar Hueco en la Vía
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Dirección */}
          <div>
            <label className="block font-medium mb-2">
              Dirección o referencia
            </label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Calle 45 con Carrera 70"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-medium mb-2">
              Descripción del hueco
            </label>
            <textarea
              name="descripcion"
              rows="4"
              placeholder="Describe el tamaño o el daño en la vía..."
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Nivel de gravedad */}
          <div>
            <label className="block font-medium mb-2">
              Nivel de gravedad
            </label>
            <select
              name="gravedad"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          {/* Imagen */}
          <div>
            <label className="block font-medium mb-2">
              Foto del hueco
            </label>
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          {/* Mapa (placeholder) */}
          <div>
            <label className="block font-medium mb-2">
              Ubicación en el mapa
            </label>

            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Mapa interactivo aquí 🗺️
            </div>

          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Enviar reporte
          </button>

        </form>
      </div>
    </main>
  );
}