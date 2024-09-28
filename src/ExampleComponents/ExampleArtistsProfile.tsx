export function ExampleArtistsProfile() {
  return (
    <main className="max-w-4xl mx-auto p-4 bg-white">
      <section className="mb-8 text-center">
        <img
          src="https://i.scdn.co/image/ab6761610000e5eb6c7d7bba740ab74390d184b9"
          alt="Artist Profile"
          className="w-48 h-48 rounded-full mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold">Artist Name</h1>
        <p className="text-gray-600">Genre: Pop</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-blue-600 hover:text-blue-800"
          >
            Facebook
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-blue-400 hover:text-blue-600"
          >
            Twitter
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-pink-600 hover:text-pink-800"
          >
            Instagram
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-red-600 hover:text-red-800"
          >
            YouTube
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Biography</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Discography</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://media.pitchfork.com/photos/641dcc9c67f587dc8ca9fb74/1:1/w_320,c_limit/The-National-Trouble-Will-Find-Me.jpg"
              alt="Album Cover"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Album Name</h3>
            <p className="text-center text-gray-600">Release Year</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Album Cover"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Album Name</h3>
            <p className="text-center text-gray-600">Release Year</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Album Cover"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Album Name</h3>
            <p className="text-center text-gray-600">Release Year</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Music Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Video Thumbnail"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Video Title</h3>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Video Thumbnail"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Video Title</h3>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src="https://i.ytimg.com/vi/ne43u8suEAg/hqdefault.jpg"
              alt="Video Thumbnail"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl text-center">Video Title</h3>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tour Dates</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl">City, Venue</h3>
              <p className="text-gray-600">Date</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl">City, Venue</h3>
              <p className="text-gray-600">Date</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl">City, Venue</h3>
              <p className="text-gray-600">Date</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ratings & Reviews</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">User Name</h3>
            <p className="text-gray-600">Rating: ⭐⭐⭐⭐⭐</p>
            <p>Excellent artist and amazing music!</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">User Name</h3>
            <p className="text-gray-600">Rating: ⭐⭐⭐⭐☆</p>
            <p>Great albums and very inspiring.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">User Name</h3>
            <p className="text-gray-600">Rating: ⭐⭐⭐⭐☆</p>
            <p>Really enjoyed the concert!</p>
          </div>
        </div>
      </section>
    </main>
  )
}
