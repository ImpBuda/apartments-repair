import React, {useEffect, useState} from 'react';
import {Pagination, TextField} from "@mui/material";
import "../css/searchspecialist.css"
import {$host} from "../utils/http";
import Board from "./Board";

const SearchSpecialists = (searchValue) => {

    const [searchData, setSearchData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("desk");

    useEffect(() => {
        fetchSearchData();
        console.log(searchValue)
    }, [currentPage, sort, searchValue])

    const changePage = (page) => {
        setCurrentPage(page - 1);
        window.scrollTo({top: 0, left: 0});
    }

    const fetchSearchData = async () => {
        const response = await $host.get("api/auth/search", {params: {title: searchValue.title, pageNumber: currentPage, sortDir: sort?.sortDir}});
        setSearchData(response.data);
    }

    return (
        <div className="container-wrapper">
             <div className="block-cards">
                    <Board adverts = {searchData.content}/>
             </div>
            <div className="pagination">
                <Pagination sx={{button:{"&:hover":{backgroundColor: 'rgb(0,246,255)'}}}} size="large" color="primary" count={searchData.totalPages} onChange={(e, value) => changePage(value)}/>
            </div>
        </div>
    );
};

export default SearchSpecialists;