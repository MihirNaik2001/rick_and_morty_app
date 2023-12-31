import { useState, useEffect } from "react";
import axios from "axios";
import _debounce from 'lodash/debounce';

import Card from "./Card.js";

function CardBox({ setShowDetail, filter, setFilter, setCardId }) {
  const [cardItems, setCardItems] = useState([]);
  const [cardInfo, setInfo] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/list_characters", { params: filter })
      .then((res) => {
        console.log(res);
        setInfo({curr_page: res.data.curr_page, pages: res.data.pages});
        setCardItems(() => [...res.data.results]);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [filter]);

  const handlePrevPage = () => {
    setFilter({...filter, page: filter.page - 1});
  }

  const handleNextPage = () => {
    setFilter({...filter, page: filter.page + 1});
  }

  const handleJumpToPage = _debounce((event) => {
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= cardInfo.pages) {
      setFilter({...filter, page: pageNumber});
    }
  }, 500);
 
  return (
    <>
      <div className="h-10 w-100 flex justify-center items-center mb-5">
        <button className="bg-blue-500 text-white p-3 m-5" disabled={cardInfo.curr_page === '1'} onClick={handlePrevPage}>
          Previous
        </button>
        <span>
          Page {cardInfo.curr_page} of {cardInfo.pages}
        </span>
        <button className="bg-blue-500 text-white p-3 m-5" disabled={cardInfo?.curr_page === cardInfo?.pages?.toString()} onClick={handleNextPage}>
          Next
        </button>

        {cardInfo.pages > 1 && (
          <div>
            <input
              className="border border-blue-500 focus:border-blue-700 border-solid m-5"
              type="number"
              min="1"
              max={cardInfo.pages}
              onChange={handleJumpToPage}
            />
          </div>
        )}
      </div>
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
