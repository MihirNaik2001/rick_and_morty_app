import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Snackbar, Alert, Typography, Grid, Button } from "@mui/material";
import image from '../../background.jpeg'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { BASE_URL} from '../../constants.js';
import CircularProgress from '@mui/material/CircularProgress';

const CardDetail = ({ setShowDetail, cardId }) => {
  const [object, setObject] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/get_character`, { params: { id: cardId } })
      .then((res) => {
        setObject(res.data);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        setOpenSnackbar(true);
        setObject({})
      });
  }, [cardId])

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => { setOpenSnackbar(false) }}>
        <Alert onClose={() => { setOpenSnackbar(false) }} severity="error">
          <Typography>Sorry, Please try again later</Typography>
        </Alert>
      </Snackbar>{
        showLoader ? <Box marginTop={'30vh'} sx={{ display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress />
      </Box> :
      <div
        className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${image})`,
          minHeight: '100vh',
          overflowY: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid container sx={{height:{md:'70vh'}, mb:'auto'}} px={5}>
          <Grid item xs={12}  my={3}><Button onClick={() => {
              setShowDetail(false);
            }} variant="contained" size={'large'} sx={{backgroundColor:'black'}}><NavigateBeforeIcon/>Go Back</Button></Grid>
          
          <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent:{xs:'center', sm:'flex-end'}}}>
            <img src={object.image} alt={object.name} style={{ borderRadius: 20, width:'auto' }} ></img>
          </Grid>
          <Grid item xs={12} sm={6} sx={{display:'flex'}}>
            <Box sx={{ backgroundColor: 'white', opacity: 0.8, borderRadius: 5,width:'100%', height: '100%', p:5, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant="h3" border={'1px solid lightblue'} borderRadius={5} p={2}>{object.name}</Typography>
              <Box my={1.5}>
                <Typography variant="h5">Status:<RadioButtonCheckedIcon sx={{ml:1}} color="success" /><Typography variant="h6" display={'inline'}>{object.status}</Typography></Typography>
              </Box>
              <Box my={1.5}>
                <Typography variant="h5">Species:<BloodtypeIcon sx={{ml:1}} color="primary" /><Typography variant="h6" display={'inline'}>{object.species}</Typography></Typography>
              </Box>
              <Box my={1.5}>
                <Typography variant="h5">Type:<CategoryIcon sx={{ml:1}} color="warning" /><Typography variant="h6" display={'inline'}>{object.type?object.type:'N/A'}</Typography></Typography>
              </Box>
              <Box my={1.5}>
                <Typography variant="h5">Gender:{object.gender==='Male'?<ManIcon sx={{ml:1}}color="error" />:object.gender==='Female'?<WomanIcon sx={{ml:1}}color="secondary" />:<HelpCenterIcon sx={{ml:1}}color="gray" />}<Typography variant="h6" display={'inline'}>{object.gender}</Typography></Typography>
              </Box>
              <Box my={1.5}>
                <Typography variant="h5">Origin:<MyLocationIcon sx={{ml:1}} color="error" /><Typography variant="h6" display={'inline'}>{object.origin}</Typography></Typography>
              </Box>
              <Box my={1.5}>
                <Typography variant="h5">Location:<LocationOnIcon sx={{ml:1}} color="info" /><Typography variant="h6" display={'inline'}>{object.location}</Typography></Typography>
              </Box>
              
            </Box>

          </Grid>

        </Grid>
      </div>}
    </>
  );
};

export default CardDetail;
