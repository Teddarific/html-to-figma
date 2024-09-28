import {
  BarChart2Icon,
  CheckCircleIcon,
  AlertOctagonIcon,
  UsersIcon,
  GitPullRequestIcon,
  TrendingUpIcon,
} from 'lucide-react'
import React from 'react'

export const ExampleGradient: React.FC = () => {
  return (
    <main
      className="bg-gradient-to-b from-blue-200 to-blue-500 min-h-screen p-6 max-w-full"
      data-id="element-0"
    >
      <h1
        className="text-4xl font-bold mb-8 text-yellow-400 font-mono"
        data-id="element-1"
      >
        SpongeBob's Krusty Krab Dashboard
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-id="element-2"
      >
        <div className="bg-white rounded-lg p-6 shadow-md" data-id="element-3">
          <div className="flex items-center mb-4" data-id="element-4">
            <div
              className="bg-red-500 text-white p-2 rounded-full mr-4"
              data-id="element-5"
            >
              <BarChart2Icon className="h-6 w-6" data-id="element-6" />
            </div>
            <h2 className="text-xl font-semibold" data-id="element-7">
              Krabby Patty Sales
            </h2>
          </div>
          <p className="text-3xl font-bold" data-id="element-8">
            1,234,567
          </p>
          <p className="text-gray-500" data-id="element-9">
            Total patties sold
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md" data-id="element-10">
          <div className="flex items-center mb-4" data-id="element-11">
            <div
              className="bg-green-500 text-white p-2 rounded-full mr-4"
              data-id="element-12"
            >
              <CheckCircleIcon className="h-6 w-6" data-id="element-13" />
            </div>
            <h2 className="text-xl font-semibold" data-id="element-14">
              Order Accuracy
            </h2>
          </div>
          <p className="text-3xl font-bold" data-id="element-15">
            99.7%
          </p>
          <p className="text-gray-500" data-id="element-16">
            Orders fulfilled correctly
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md" data-id="element-17">
          <div className="flex items-center mb-4" data-id="element-18">
            <div
              className="bg-yellow-500 text-white p-2 rounded-full mr-4"
              data-id="element-19"
            >
              <AlertOctagonIcon className="h-6 w-6" data-id="element-20" />
            </div>
            <h2 className="text-xl font-semibold" data-id="element-21">
              Plankton Alerts
            </h2>
          </div>
          <p className="text-3xl font-bold" data-id="element-22">
            3
          </p>
          <p className="text-gray-500" data-id="element-23">
            Attempted formula thefts
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md" data-id="element-24">
          <div className="flex items-center mb-4" data-id="element-25">
            <div
              className="bg-blue-500 text-white p-2 rounded-full mr-4"
              data-id="element-26"
            >
              <UsersIcon className="h-6 w-6" data-id="element-27" />
            </div>
            <h2 className="text-xl font-semibold" data-id="element-28">
              Bikini Bottom Visitors
            </h2>
          </div>
          <p className="text-3xl font-bold" data-id="element-29">
            42,000
          </p>
          <p className="text-gray-500" data-id="element-30">
            Unique customers this month
          </p>
        </div>

        <div
          className="bg-white rounded-lg p-6 col-span-1 md:col-span-2 shadow-md"
          data-id="element-31"
        >
          <div className="flex items-center mb-4" data-id="element-32">
            <div
              className="bg-purple-500 text-white p-2 rounded-full mr-4"
              data-id="element-33"
            >
              <GitPullRequestIcon className="h-6 w-6" data-id="element-34" />
            </div>
            <h2 className="text-xl font-semibold" data-id="element-35">
              Incoming Shipments
            </h2>
          </div>
          <ul className="space-y-4" data-id="element-36">
            <li
              className="flex justify-between border-b pb-2"
              data-id="element-37"
            >
              <span data-id="element-38">Buns from Mrs. Puff</span>
              <span className="font-semibold" data-id="element-39">
                1200 pcs
              </span>
            </li>
            <li
              className="flex justify-between border-b pb-2"
              data-id="element-40"
            >
              <span data-id="element-41">Lettuce from Sandy's Dome</span>
              <span className="font-semibold" data-id="element-42">
                500 lbs
              </span>
            </li>
            <li
              className="flex justify-between border-b pb-2"
              data-id="element-43"
            >
              <span data-id="element-44">Spatulas from Barg'N-Mart</span>
              <span className="font-semibold" data-id="element-45">
                20 units
              </span>
            </li>
            <li className="flex justify-between" data-id="element-46">
              <span data-id="element-47">Secret Formula</span>
              <span className="font-semibold" data-id="element-48">
                1 bottle
              </span>
            </li>
          </ul>
        </div>

        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-6 flex flex-col justify-between shadow-md"
          data-id="element-49"
        >
          <h2 className="text-xl font-semibold mb-4" data-id="element-50">
            Profit Growth
          </h2>
          <div data-id="element-51">
            <p className="text-3xl font-bold" data-id="element-52">
              15.8%
            </p>
            <p data-id="element-53">Q3 vs Q2</p>
          </div>
          <div className="self-end" data-id="element-54">
            <TrendingUpIcon className="h-12 w-12" data-id="element-55" />
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-600" data-id="element-56">
        Dashboard made with &#10084;&#65039; by SpongeBob SquarePants
      </footer>
    </main>
  )
}
