export default function Header() {
  return (
    <section className="mb-16 relative text-white h-[650px] flex flex-col justify-center items-center text-center">
      <div className="absolute inset-0 bg-[url('./jumbotron.png')] bg-cover bg-center opacity-80"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold">Connect on DumbSound</h1>
        <p className="mt-4 text-lg">
          Discover, Stream, and share a constantly expanding mix of music from
          emerging and major artists around the world.
        </p>
      </div>
    </section>
  );
}
