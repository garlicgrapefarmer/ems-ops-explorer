export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>EMS Ops Explorer</h1>
      
      <section style={{ marginTop: 20 }}>
        <h2>Territory</h2>
        <p>Kansas City Metro (Sample)</p>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2>Morning Brief</h2>
        <ul>
          <li>High call volume in urban core</li>
          <li>Response times elevated overnight</li>
          <li>Staffing constraints impacting coverage</li>
        </ul>
      </section>
    </main>
  );
}
