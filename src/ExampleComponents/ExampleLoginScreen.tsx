export function ExampleLoginScreen() {
  return (
    <section className="max-w-md mx-auto my-10 px-4 py-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mt-2">Join Our Newsletter</h2>
        <p className="text-gray-600 mt-1">
          Subscribe to receive exclusive content, special offers, and updates.
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="Your Email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Subscribe Now
        </button>
      </form>
      <p className="text-gray-500 text-xs mt-4">
        We respect your privacy. Read our{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">
          privacy policy
        </a>
        .
      </p>
      <div className="hidden" aria-live="polite">
        <div className="flex items-center mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p>
            Thank you for subscribing! Please check your email for a
            confirmation.
          </p>
        </div>
      </div>
    </section>
  );
}
