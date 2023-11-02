import React from "react";
import { LuSearch } from "react-icons/lu";
import styled from "styled-components";

const Bar = styled.section`
  margin-top: 0.25rem;
  display: flex;
  height: 4rem;
  justify-content: space-around;
  border-radius: 1.5rem;
  gap: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 15px;
  .input {
    margin-top: 0.5rem;
    padding-left: 3rem;
    padding-right: 3rem;
    display: block;
    width: 20rem;
    padding: 0.5rem;
    padding-left: 1.5rem;
    color: gray;
    border-radius: 1rem;
    border-width: 1px;
    border-radius: 1rem;
    font-size: bold;
  }
  @media not all and (min-width: 640px) {
    .input {
      width: 15rem;
    }
  }
`;
const Dropdown = styled.section`
  font-weight: 600;
  color: gray;
  margin-top: 1.25rem;
  &:hover {
    color: steelblue;
  }
`;

export default function SearchBar({ onSearchChange, onSortChange }) {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };
  return (
    <div>
      <Bar>
        <form>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="input "
              placeholder="Filter by brand's name"
              required
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <div className="absolute inset-y-0 right-6 flex items-center pl-3 pointer-events-none">
              <LuSearch style={{ color: "gray" }} />
            </div>
          </div>
        </form>

        <Dropdown>
          <select onChange={handleSortChange}>
            <option>Sort by</option>
            <option value="price">Price</option>
            <option value="year">Year</option>
          </select>
        </Dropdown>
      </Bar>
    </div>
  );
}
