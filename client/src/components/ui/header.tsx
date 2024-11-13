export default function Header() {
  return (
    <section
      className="relative bg-cover bg-center h-[600px] text-center text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('./jumbotron.png')" }}
    >
      <h2 className="text-4xl font-bold mb-2">Connect on DumbSound</h2>
      <p className="text-lg">
        Discover, stream, and share a constantly expanding mix of music from
        emerging and major artists around the world
      </p>
    </section>
  );
}
