import React, { useState } from "react";
import { MdOutlineLocalGasStation } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdAutoMode } from "react-icons/md";
import { MdShutterSpeed } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import CardData from "./CardData";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { stag } from "./Anim";
import { motion } from "framer-motion";
const itemsPerPage = 8;

//styled components

const Button = styled.section`
  height: 2.5rem;
  width: 6rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  --tw-bg-opacity: 1;
  background-color: rgb(2 132 199 / var(--tw-bg-opacity));
  color: rgb(255 255 255);
  text-align: center;

  &:hover {
    scale: 1.1;
    transition: 0.5s ease;
  }
`;
const Box = styled.section`
  border-radius: 0.75rem;
  width: 24rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 15px;
  padding: 0.75rem;

  &:hover {
    scale: 0.97;
    transition: 0.5s ease;
  }
  .year {
    height: 1.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 0.5rem;
    width: 3.5rem;
    border-width: 2px;
    border-style: dashed;
    --tw-border-opacity: 1;
    border-color: rgb(125 211 252 / var(--tw-border-opacity));
    border-radius: 0.75rem;
    color: gray;
  }
`;
const Options = styled.section`
  gap: 4rem;
  margin-top: 0.5rem;
  display: flex;

  .icons {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    gap: 0.25rem;
    display: flex;
  }
`;
const Paginations = styled.section`
  .paginationBttns {
    width: 80%;
    height: 40px;
    list-style: none;
    display: flex;
    margin-top: 1rem;
    font-weight: 500;
    color: rgb(129, 117, 117);
  }

  .paginationBttns a {
    padding: 4px;
    padding-left: 8px;
    padding-right: 10px;
    margin: 8px;
    border-radius: 10px;
    height: 2rem;
    width: 2rem;
    background-color: white;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    cursor: pointer;
    margin-top: 20px;
  }

  .paginationBttns a:hover {
    color: white;
    background-color: #0785da;
  }

  .paginationActive a {
    color: white;
    background-color: #0785da;
  }
  @media not all and (min-width: 640px) {
    .paginationBttns a {
      padding-left: 7px;
      padding-right: 7px;
    }
  }
`;
const Bar = styled.section`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-around;
  border-radius: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 15px;
`;
const HorBar = styled.section`
  border-top: 0.6px solid #d1d5db;
  margin-top: 1rem;
`;
export default function () {
  //For search funtionality !
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  const filteredData = CardData.filter((card) =>
    card.car_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //For pagination funtionality !
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(CardData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Sorting function !
  const [sortBy, setSortBy] = useState("");
  const handleSortChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
  };
  const sortbyData = (data, sortBy) => {
    switch (sortBy) {
      case "year":
        return data.slice().sort((a, b) => a.year - b.year);

      case "price":
        return data.slice().sort((a, b) => a.price - b.price);
      default:
        return data;
    }
  };
  const sortedData = sortbyData(filteredData, sortBy);

  return (
    <div>
      <div>
        <SearchBar
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
        <div>
          <div className=" mt-8 flex flex-wrap gap-10  justify-center items-center ">
            {sortedData.slice(startIndex, endIndex).map((card, i) => (
              <Box>
                <motion.div
                  variants={stag}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  key={i}
                >
                  <img
                    src={card.imageUrl}
                    className="h-42 w-90 rounded-xl  "
                    alt="img"
                  />
                  <div className="flex  mt-2 justify-between">
                    <h3 className="mt-2 font-semibold text-gray-800 text-2xl ">
                      {card.car_name}
                    </h3>
                    <div>
                      <div className="year">
                        <p className=" px-3 font-semibold ">{card.year}</p>
                      </div>
                    </div>
                  </div>{" "}
                  <p className="text-sm text-gray-400 font-semibold mt-2">
                    {card.des}
                  </p>
                  <Options>
                    <div>
                      <p className="icons">
                        <MdOutlinePeopleAlt
                          size={20}
                          className="fill-sky-400"
                        />
                        {card.quantity} People
                      </p>
                      <p className="icons">
                        <MdShutterSpeed size={20} className="fill-sky-400" />
                        {card.distance}
                      </p>
                    </div>
                    <div>
                      <p className="icons">
                        <MdOutlineLocalGasStation
                          size={20}
                          className="fill-sky-400"
                        />
                        {card.gas}
                      </p>
                      <p className="icons">
                        <MdAutoMode size={20} className="fill-sky-400" />
                        {card.mode}
                      </p>
                    </div>
                  </Options>
                  <HorBar />
                  <div className="flex gap-x-20 mt-4">
                    <div className="flex gap-1">
                      <h1 className="text-3xl font-medium">${card.price}</h1>
                      <p className="mt-2">/month</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 ">
                        <FiHeart
                          size={23}
                          style={{ color: "skyblue" }}
                          className="rounded-lg  m-2 cursor-pointer hover:fill-sky-600"
                        />
                      </div>
                      <Button>Rent now</Button>
                    </div>
                  </div>
                </motion.div>
              </Box>
            ))}
          </div>
        </div>

        <Bar>
          {" "}
          <p className="mt-4 ml-2 font-medium text-gray-500 max-sm:hidden">
            {currentPage + 1} from {pageCount}
          </p>
          <Paginations>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"paginationBttns"}
              activeClassName={"paginationActive"}
            />
          </Paginations>
        </Bar>
      </div>
    </div>
  );
}
