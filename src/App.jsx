
import { useEffect, useState } from 'react';
import './App.css';

const equiposIniciales = [
  {
    id: 1,
    nombre: 'Junior FC',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Escudo%20de%20Atl%C3%A9tico%20Junior.svg',
  },
  {
    id: 2,
    nombre: 'Atlético Nacional',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Atletico%20Nacional%20Logo.svg',
  },
  {
    id: 3,
    nombre: 'Santa Fe',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Independiente%20Santa%20Fe%20logo.svg',
  },
  {
    id: 4,
    nombre: 'Cúcuta Deportivo',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Escudo%20del%20C%C3%BAcuta%20Deportivo.svg',
  },
  {
    id: 5,
    nombre: 'América de Cali',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Escudo%20Am%C3%A9rica%20de%20Cali%202019.png',
  },
  {
    id: 6,
    nombre: 'Deportivo Cali',
    escudo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Escudo%20del%20Deportivo%20Cali.svg',
  },
];

export default function App() {
  const [equipos] = useState(equiposIniciales);

  const [partidos, setPartidos] = useState(() => {
    try {
      const guardados = localStorage.getItem('partidosFutbol');
      return guardados ? JSON.parse(guardados) : [];
    } catch {
      return [];
    }
  });

  const [local, setLocal] = useState('1');
  const [visitante, setVisitante] = useState('2');
  const [golesLocal, setGolesLocal] = useState('0');
  const [golesVisitante, setGolesVisitante] = useState('0');
  const [editando, setEditando] = useState(null);
  const [filtroEquipo, setFiltroEquipo] = useState('todos');

  useEffect(() => {
    localStorage.setItem('partidosFutbol', JSON.stringify(partidos));
  }, [partidos]);

  function guardarPartido(e) {
    e.preventDefault();

    if (local === visitante) {
      alert('Debes elegir dos equipos diferentes.');
      return;
    }

    if (
      golesLocal === '' ||
      golesVisitante === '' ||
      !Number.isInteger(Number(golesLocal)) ||
      !Number.isInteger(Number(golesVisitante)) ||
      Number(golesLocal) < 0 ||
      Number(golesVisitante) < 0
    ) {
      alert('Ingresa goles enteros y no negativos.');
      return;
    }

    const partido = {
      id: editando ?? Date.now(),
      local: Number(local),
      visitante: Number(visitante),
      golesLocal: Number(golesLocal),
      golesVisitante: Number(golesVisitante),
    };

    if (editando !== null) {
      setPartidos(prev =>
        prev.map(p => (p.id === editando ? partido : p))
      );
      setEditando(null);
    } else {
      setPartidos(prev => [...prev, partido]);
    }

    setGolesLocal('0');
    setGolesVisitante('0');
  }

  function editarPartido(partido) {
    setLocal(String(partido.local));
    setVisitante(String(partido.visitante));
    setGolesLocal(String(partido.golesLocal));
    setGolesVisitante(String(partido.golesVisitante));
    setEditando(partido.id);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setEditando(null);
    setGolesLocal('0');
    setGolesVisitante('0');
    setLocal('1');
    setVisitante('2');
  }

  function eliminarPartido(id) {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar este resultado?'
    );

    if (confirmar) {
      setPartidos(prev => prev.filter(p => p.id !== id));

      if (editando === id) {
        cancelarEdicion();
      }
    }
  }

  const tabla = equipos
    .map(equipo => {
      const datos = {
        ...equipo,
        pj: 0,
        pg: 0,
        pe: 0,
        pp: 0,
        gf: 0,
        gc: 0,
        pts: 0,
      };

      partidos.forEach(p => {
        if (p.local !== equipo.id && p.visitante !== equipo.id) {
          return;
        }

        datos.pj++;

        if (p.local === equipo.id) {
          datos.gf += p.golesLocal;
          datos.gc += p.golesVisitante;
        } else {
          datos.gf += p.golesVisitante;
          datos.gc += p.golesLocal;
        }

        if (p.golesLocal === p.golesVisitante) {
          datos.pe++;
          datos.pts++;
        } else {
          const gano =
            p.local === equipo.id
              ? p.golesLocal > p.golesVisitante
              : p.golesVisitante > p.golesLocal;

          if (gano) {
            datos.pg++;
            datos.pts += 3;
          } else {
            datos.pp++;
          }
        }
      });

      datos.dg = datos.gf - datos.gc;
      return datos;
    })
    .sort(
      (a, b) =>
        b.pts - a.pts ||
        b.dg - a.dg ||
        b.gf - a.gf
    );

  const nombreEquipo = id =>
    equipos.find(e => e.id === id)?.nombre ?? 'Equipo desconocido';

  const partidosFiltrados = partidos.filter(p =>
    filtroEquipo === 'todos' ||
    p.local === Number(filtroEquipo) ||
    p.visitante === Number(filtroEquipo)
  );

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="etiqueta">TORNEO DE FÚTBOL</p>
        <h1>Tabla de posiciones</h1>
        <p>Los resultados actualizan la clasificación automáticamente.</p>
      </header>

      <section className="panel">
        <h2>
          {editando !== null ? 'Editar resultado' : 'Registrar partido'}
        </h2>

        <form onSubmit={guardarPartido}>
          <div className="formulario">
            <label>
              Equipo local
              <select
                value={local}
                onChange={e => setLocal(e.target.value)}
              >
                {equipos.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Goles local
              <input
                type="number"
                min="0"
                step="1"
                required
                value={golesLocal}
                onChange={e => setGolesLocal(e.target.value)}
              />
            </label>

            <label>
              Goles visitante
              <input
                type="number"
                min="0"
                step="1"
                required
                value={golesVisitante}
                onChange={e => setGolesVisitante(e.target.value)}
              />
            </label>

            <label>
              Equipo visitante
              <select
                value={visitante}
                onChange={e => setVisitante(e.target.value)}
              >
                {equipos.map(eq => (
                  <option key={eq.id} value={eq.id}>
                    {eq.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit">
            {editando !== null ? 'Guardar cambios' : 'Registrar resultado'}
          </button>

          {editando !== null && (
            <button
              type="button"
              className="secundario"
              onClick={cancelarEdicion}
            >
              Cancelar edición
            </button>
          )}
        </form>
      </section>

      <section className="panel">
        <h2>Clasificación</h2>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>DG</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {tabla.map((eq, i) => (
                <tr key={eq.id}>
                  <td>{i + 1}</td>
                  <td className="equipo">
                    <img
                      src={eq.escudo}
                      alt={`Escudo de ${eq.nombre}`}
                      className="escudo"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {eq.nombre}
                  </td>
                  <td>{eq.pj}</td>
                  <td>{eq.pg}</td>
                  <td>{eq.pe}</td>
                  <td>{eq.pp}</td>
                  <td>{eq.gf}</td>
                  <td>{eq.gc}</td>
                  <td>{eq.dg > 0 ? '+' : ''}{eq.dg}</td>
                  <td><strong>{eq.pts}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Resultados registrados</h2>

        <label>
          Filtrar por equipo
          <select
            value={filtroEquipo}
            onChange={e => setFiltroEquipo(e.target.value)}
          >
            <option value="todos">Todos los equipos</option>
            {equipos.map(eq => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </select>
        </label>

        {partidosFiltrados.length === 0 ? (
          <p className="vacio">
            {partidos.length === 0
              ? 'Todavía no has registrado partidos.'
              : 'Este equipo no tiene partidos registrados.'}
          </p>
        ) : (
          partidosFiltrados.map(p => (
            <div className="resultado" key={p.id}>
              <span>{nombreEquipo(p.local)}</span>
              <strong>{p.golesLocal} - {p.golesVisitante}</strong>
              <span>{nombreEquipo(p.visitante)}</span>

              <button
                type="button"
                className="secundario"
                onClick={() => editarPartido(p)}
              >
                Editar
              </button>

              <button
                type="button"
                className="secundario"
                onClick={() => eliminarPartido(p.id)}
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
