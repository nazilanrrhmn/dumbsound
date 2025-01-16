import React from "react";

interface Music {
  id: number;
  title: string;
  artist: string;
  releaseYear: number;
}

const mockMusicData: Music[] = [
  { id: 1, title: "Song A", artist: "Artist A", releaseYear: 2020 },
  { id: 2, title: "Song B", artist: "Artist B", releaseYear: 2021 },
  { id: 3, title: "Song C", artist: "Artist C", releaseYear: 2022 },
];

export default function ListMusic() {
  const handleEdit = (id: number) => {
    console.log(`Edit music with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id: number) => {
    console.log(`Delete music with ID: ${id}`);
    // Add your delete logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Music List</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Artist</th>
            <th className="border border-gray-300 px-4 py-2">Release Year</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockMusicData.map((music, index) => (
            <tr key={music.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {music.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {music.artist}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {music.releaseYear}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(music.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(music.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
