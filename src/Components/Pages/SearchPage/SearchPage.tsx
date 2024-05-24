import React, { SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../../company';
import { searchCompanies } from '../../../api';
import Navbar from '../../Navbar/Navbar';
import ListPortfolio from '../../Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../CardList/CardList';
import Search from '../../Search/Search';

interface Props  {}

const SearchPage = (props: Props) => {

  const [search, setSearch] = useState<string>("");
  const [portfolioValues , setPortfoliovalues] =useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e : any) =>{
    e.preventDefault();

    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists){return}
    // synthetic event will not allo use e.target[0].value
    const updatedPortfolio =[...portfolioValues ,e.target[0].value]
    setPortfoliovalues(updatedPortfolio);
    console.log(e);
  }

  const onPortfolioDelete = (e:any) =>{

    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;

    });
    setPortfoliovalues(removed);
  }
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await searchCompanies(search);
      console.log( result);
      if (typeof result === 'string') {
        setServerError(result);
      } else if (Array.isArray(result)) {
        setSearchResult(result);
        setServerError(""); // Clear any previous errors
      }
    } catch (error) {
      setServerError("An error occurred while fetching data.");
    }
  };

  
  return (
    <div className="App">
    <Search 
    onSearchSubmit={onSearchSubmit} 
    search={search} 
    handleSearchChange={handleSearchChange} />
    {serverError && <h1>{serverError}</h1>}
    <ListPortfolio 
    portfolioValues={portfolioValues}
    onPortfolioDelete = {onPortfolioDelete}/>
    <CardList  searchResults ={searchResult} onPortfolioCreate={onPortfolioCreate} />
  </div>
  )
}

export default SearchPage