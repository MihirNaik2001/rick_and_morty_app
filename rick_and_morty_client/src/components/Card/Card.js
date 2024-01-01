import { Box, Button, Typography } from "@mui/material";

function Card({setShowDetail, card, setCardId}) {


  return (
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mb-5 mx-2">

      <Box sx={{
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
        
        },
        borderRadius: 5
      }}>
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
        <img
          src={card.image}
          alt={card.name}
          width={"100%"}
          height={"auto"}
        />
      </div>
      <div class="p-6 text-center">
        <Typography variant="h4">
        {card.name}
        </Typography>
        <Typography variant="h6">
        {card.species}
        </Typography>
      </div>
      <div class="p-6 pt-0 mb-0">
          <Button
              onClick={()=>{
                setShowDetail(true);
                setCardId(card.id);
              }}
              
              variant="contained"
              sx={{backgroundColor:'rgba(17,24,39);'}}
            >
              Know More
          </Button>
        </div>
        </Box>
    </div>
  );
}

export default Card;