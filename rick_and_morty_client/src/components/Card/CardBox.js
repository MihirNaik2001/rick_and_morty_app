import { useState, useEffect } from "react";
import axios from "axios";
import _debounce from 'lodash/debounce';
import { Button, Typography, Alert, Snackbar,TextField, Box, Grid } from "@mui/material";
import Card from "./Card.js";

function CardBox({ setShowDetail, filter, setFilter, setCardId }) {
  const [cardItems, setCardItems] = useState([]);
  const [cardInfo, setInfo] = useState({});
  const [openSnackbar,setOpenSnackbar] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5001/list_characters", { params: filter })
      .then((res) => {
        setInfo({ curr_page: res.data.curr_page, pages: res.data.pages });
        setCardItems(() => [...res.data.results]);
        setOpenSnackbar(false);
      })
      .catch((error) => {

        setInfo({curr_page:'1',pages:1})
        setCardItems([]);
        setOpenSnackbar(true);
      });

  }, [filter]);

  const handlePrevPage = () => {
    setFilter({ ...filter, page: filter.page - 1 });
  }

  const handleNextPage = () => {
    setFilter({ ...filter, page: filter.page + 1 });
  }

  const handleJumpToPage = _debounce((event) => {
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= cardInfo.pages) {
      setFilter({ ...filter, page: pageNumber });
    }
  }, 500);

  return (
    <>
    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={()=>{setOpenSnackbar(false)}}>
      <Alert onClose={()=>{setOpenSnackbar(false)}} severity="info">
        <Typography>No Data Found</Typography>
      </Alert>
    </Snackbar>
      <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} my={3} spacing={{xs:1,sm:2}}>
        <Grid item xs={12} sm={7}>
          <Grid sx={{display:'flex', justifyContent:{xs:'center', sm:'flex-end'}}}>
            <Button variant="contained" disabled={cardInfo.curr_page === '1'} onClick={handlePrevPage}>Prev</Button>
            <Typography mx={1} my={'auto'}> Page {cardInfo.curr_page} of {cardInfo.pages}</Typography>
            <Button variant="contained" disabled={cardInfo?.curr_page === cardInfo?.pages?.toString()} onClick={handleNextPage} >Next</Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5}sx={{display:'flex', justifyContent:{xs:'center', sm:'flex-start'}}}>
          {cardInfo.pages > 1 && (
            <Box >
              <TextField size="small" label="Page no." type="number" variant="outlined" sx={{ maxWidth: 120}} 
                onChange={handleJumpToPage}
                inputProps={{
                  min: 1,
                  max: cardInfo.pages
                }}
              />

            </Box>
          )}
        </Grid>
      </Grid>

      <div className="flex flex-wrap justify-around">
        {cardItems.map((card) => {
          return (
            <Card
              setShowDetail={setShowDetail}
              card={card}
              setCardId={setCardId}
            />
          );
        })}
      </div>
    </>
  );
}

export default CardBox;
