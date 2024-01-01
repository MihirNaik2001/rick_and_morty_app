import { useState, useEffect } from "react";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Button,Box, Card, TextField, Typography, Divider} from "@mui/material";

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

    setFilter({ ...filter, name: search, page: 1 });

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const applyFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-center">
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} sx={{py:1, px:2, my:'auto'}} size="small"/>
        <div class="relative inline-block text-left m-5">
          <div className="flex flex-row" style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={applyFilter}
              variant="outlined">

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
            </Button>
            <Button sx={{ ml: 2 }}>
              <FilterAltOffIcon onClick={() => {
                setFilter({ ...filter, species: "", status: "", gender: "", page: 1})
              }} sx={{ border: "1px solid", borderColor: 'rgba(25, 118, 210, 0.5)', borderRadius: 1 }} fontSize="large" />
            </Button>
          </div>
          {showFilter && (
            <div
              class="flex absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <Card>
              <Typography variant="h6" textAlign={'center'}>Status</Typography>
              <Divider/>
                <div class="py-1" role="none">
                  {status.map((statusItem) => {
                    return (
                      <>
                      <Box my={1} mx={2} borderRadius={3} border={'1px solid rgba(25, 118, 210, 0.5)'} sx={{
                          backgroundColor:
                            filter.status === statusItem ? "#1976d2" : "white",
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                          if(filter.status===statusItem){
                            setFilter({ ...filter, status: '', page: 1});
                          }
                          else{
                            setFilter({ ...filter, status: statusItem, page: 1});
                          }       
                        }} >
                        <Typography px={1} textAlign={'center'}fontWeight={100} fontSize={15} mx={'auto'} sx={{color: filter.status === statusItem ? "white" : "black"}}>
                        {statusItem}
                        </Typography>
                      </Box>
                      </>
                    );
                  })}
                </div>
              </Card>
            
              <Card sx={{mx:'4px'}}>
              <Typography variant="h6" textAlign={'center'}>Species</Typography>
              <Divider/>
                <div class="py-1" role="none">
                  {species.map((speciesItem) => {
                    return (
                      <>
                      <Box my={1} mx={2} borderRadius={3} border={'1px solid rgba(25, 118, 210, 0.5)'} sx={{
                          backgroundColor:
                            filter.species === speciesItem ? "#1976d2" : "white",
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                          if(filter.species===speciesItem){
                            setFilter({ ...filter, species: '', page: 1});
                          }
                          else{
                            setFilter({ ...filter, species: speciesItem, page: 1});
                          }       
                        }} >
                        <Typography px={1} textAlign={'center'}fontWeight={100} fontSize={15} mx={'auto'} sx={{color: filter.species === speciesItem ? "white" : "black"}}>
                        {speciesItem}
                        </Typography>
                      </Box>
                      </>
                    );
                  })}
                </div>
              </Card>
              <Card>
              <Typography variant="h6" textAlign={'center'}>Gender</Typography>
              <Divider/>
                <div class="py-1" role="none">
                  {gender.map((genderItem) => {
                    return (
                      <>
                      <Box my={1} mx={2} borderRadius={3} border={'1px solid rgba(25, 118, 210, 0.5)'} sx={{
                          backgroundColor:
                            filter.gender === genderItem ? "#1976d2" : "white",
                            cursor: 'pointer',
                        }}
                       
                        onClick={() => {
                          if(filter.gender===genderItem){
                            setFilter({ ...filter, gender: '', page: 1});
                          }
                          else{
                            setFilter({ ...filter, gender: genderItem, page: 1});
                          }                        
                        }} >
                        <Typography px={1} textAlign={'center'}fontWeight={100} fontSize={15} mx={'auto'} sx={{color: filter.gender === genderItem ? "white" : "black"}}>
                        {genderItem}
                        </Typography>
                      </Box>
                      </>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
