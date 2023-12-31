import { useState, useEffect } from "react";

function SearchBar({ search, setSearch, filter, setFilter }) {
  const status = ["Alive", "Dead", "Unknown"]; // api
  const species = [
    "Human",
    "Alien",
    "Animal",
    "Disease",
    "Cronenberg",
    "Mythological",
    "Humanoid",
    "Poopybutthole",
    "Unknown",
    "Robot",
    "Planet",
  ];
  const gender = ["Male", "Female", "Genderless", "Unknown"];

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(search);
    }, 3000);

    setFilter({ ...filter, name: search });

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const applyFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-center">
        <input
          className="border border-blue-500 focus:border-blue-700 border-solid m-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div class="relative inline-block text-left m-5">
          <div className="flex flex-row">
            <button
              type="button"
              class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={applyFilter}
            >
              Filter
              <svg
                class="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              className="inline-flex w-full ml-5 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() =>
                setFilter({
                  status: "",
                  gender: "",
                  species: "",
                })
              }
            >
              Clear Filter
            </button>
          </div>
          {showFilter && (
            <div
              class="flex absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div>
                <div className="text-center">Status</div>
                <div class="py-1" role="none">
                  {status.map((statusItem) => {
                    return (
                      <div
                        class="text-gray-700 block px-4 my-2 text-sm"
                        style={{
                          backgroundColor:
                            filter.status === statusItem ? "blue" : "white",
                        }}
                        role="menuitem"
                        tabindex="-1"
                        onClick={() => {
                          setFilter({ ...filter, status: statusItem });
                        }}
                      >
                        {statusItem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="my-3 border border-blue-500 border-solid" />
              <div>
                <div className="text-center">Species</div>
                <div class="py-1" role="none">
                  {species.map((speciesItem) => {
                    return (
                      <div
                        class="text-gray-700 block px-4 my-2 text-sm"
                        style={{
                          backgroundColor:
                            filter.species === speciesItem ? "blue" : "white",
                        }}
                        role="menuitem"
                        tabindex="-1"
                        onClick={() => {
                          setFilter({ ...filter, species: speciesItem });
                        }}
                      >
                        {speciesItem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="my-3 border border-blue-500 border-solid" />
              <div>
                <div className="text-center">Gender</div>
                <div class="py-1" role="none">
                  {gender.map((genderItem) => {
                    return (
                      <div
                        class="text-gray-700 block px-4 my-2 text-sm"
                        style={{
                          backgroundColor:
                            filter.gender === genderItem ? "blue" : "white",
                        }}
                        role="menuitem"
                        tabindex="-1"
                        onClick={() => {
                          setFilter({ ...filter, gender: genderItem });
                        }}
                      >
                        {genderItem}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
