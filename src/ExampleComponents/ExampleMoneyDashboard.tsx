export function ExampleMoneyDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">
          <span className="text-green-500">BANK</span>
          SYSTEM
          <div className="text-sm">PARADISE ISLAND</div>
        </div>
        <div className="text-xl">15321,00 $</div>
      </header>

      <main className="grid grid-cols-4 gap-4">
        <section className="col-span-1">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Szybka wypłata</h2>
            <div className="space-y-4">
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wypłać szybko
                <span className="text-red-500">100 $</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wypłać szybko
                <span className="text-red-500">500 $</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wypłać szybko
                <span className="text-red-500">1000 $</span>
              </button>
              <div className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                <input
                  type="number"
                  className="bg-transparent border-none w-full text-white"
                  placeholder="Wypłać dokładną ilość"
                />
                <button className="text-red-500">WYPŁAĆ</button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Szybka wpłata</h2>
            <div className="space-y-4">
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wpłać szybko
                <span className="text-green-500">100 $</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wpłać szybko
                <span className="text-green-500">500 $</span>
              </button>
              <button className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                Wpłać szybko
                <span className="text-green-500">1000 $</span>
              </button>
              <div className="flex items-center justify-between w-full p-2 bg-gray-800 rounded">
                <input
                  type="number"
                  className="bg-transparent border-none w-full text-white"
                  placeholder="Wpłać dokładną ilość"
                />
                <button className="text-red-500">WPŁAĆ</button>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-1">
          <h2 className="text-lg font-bold mb-4">Historia transakcji</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <div>
                <div>Braddy Cooper</div>
                <div className="text-sm text-gray-400">Osoba fizyczna</div>
              </div>
              <div className="text-right">
                <div>...1232</div>
                <div className="text-green-500">+500,00 USD</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <div>
                <div>Johanson Deepty</div>
                <div className="text-sm text-gray-400">Osoba fizyczna</div>
              </div>
              <div className="text-right">
                <div>...3232</div>
                <div className="text-green-500">+500,00 USD</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <div>
                <div>Alfredo Alcatraz</div>
                <div className="text-sm text-gray-400">Osoba fizyczna</div>
              </div>
              <div className="text-right">
                <div>...5623</div>
                <div className="text-green-500">+500,00 USD</div>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-1">
          <h2 className="text-lg font-bold mb-4">Przelew bankowy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <input
                type="text"
                className="bg-transparent border-none w-full text-white"
                placeholder="...0000"
              />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <input
                type="number"
                className="bg-transparent border-none w-full text-white"
                placeholder="Kwota"
              />
              <button className="text-green-500">Wyślij przelew</button>
            </div>
          </div>
        </section>

        <section className="col-span-1">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Moja karta</h2>
            <div className="p-4 bg-gray-800 rounded">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div>Johanson Deepty</div>
                  <div className="text-sm text-gray-400">...3232</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">04/20</div>
              <div className="text-right">
                <img src="https://via.placeholder.com/50" alt="Fleeca Bank" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Szczegóły karty</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>Imię</div>
                <div>Johanson</div>
              </div>
              <div className="flex justify-between">
                <div>Nazwisko</div>
                <div>Deepty</div>
              </div>
              <div className="flex justify-between">
                <div>Waluta</div>
                <div>USD</div>
              </div>
              <div className="flex justify-between">
                <div>Stan konta</div>
                <div>15321,00 $</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Abonamenty</h2>
            <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
              <div>Ubezpieczenie zdrowotne</div>
              <div className="text-red-500">-1000$ msc</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
