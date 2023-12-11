import { useState } from 'react';
import SearchSlider from './SearchSlider/SearchSlider';
import SearchCards from './SearchCards/SearchCards';
import SearchSideBar from './SearchSideBar/SearchSideBar';
import './SearchPage.css';
import { Helmet } from 'react-helmet';

const SearchPage = () => {
    const [filters, setFilters] = useState({ title:'', minPrice: '', maxPrice: '', location: '' , subCategoryID:'', Categoryid:'' });

    const handleFilterChange = (filterValues) => {
        setFilters(filterValues);
    };

    return (
        <>
            <Helmet>
                <title>search</title>
            </Helmet>
            <div className='container my-5'>
                <div className='row d-flex'>
                    <div className='col-xxl-3 col-0'>
                        <SearchSideBar onFilterChange={handleFilterChange} />
                    </div>
                    <div className='col-xxl-9 col-12'>
                        <SearchSlider />
                        <SearchCards filters={filters} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
