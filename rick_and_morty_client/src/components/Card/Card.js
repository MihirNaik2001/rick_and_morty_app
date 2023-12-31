function Card({setShowDetail, card, setCardId}) {


  return (
    <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 mb-5">
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
        <img
          src={card.image}
          alt="sorry"
          width={"100%"}
          height={"auto"}
        />
      </div>
      <div class="p-6 text-center">
        <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {card.name}
        </h4>
        {/* <p class="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400"> */}
        <p class="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
          {card.species}
        </p>
      </div>
      <div class="p-6 pt-0 mb-0">
          <button
            class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={() =>{ 
              setShowDetail(true);
              setCardId(card.id);
            }}
          >
            Read More
          </button>
        </div>
    </div>
  );
}

export default Card;