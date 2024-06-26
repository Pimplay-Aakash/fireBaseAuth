import React, { useState, useEffect } from 'react';
import Select from "./Select";

const MyTable = ({ columns, data, perPageLimit, pageBtnLimit, styleClass }) => {
  const [pageNation, setPageNation] = useState(1);
  const [sorting, setSorting] = useState({ key: null, direction: 'asc' });
  const [searchValue, setSearchValue] = useState('');
  const [pageData, setPageData] = useState(perPageLimit);
  const [checkboxes, setCheckboxes] = useState(Array(data.length).fill(false));
  const [headCheckbox, setHeadCheckbox] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const totalPages = Math.ceil(filteredData.length / pageData);

  const FiltColumns = columns.filter(col => 
    col.display !== false
    //  && (typeof col.render === 'function' || data.some(item => item[col.key] !== undefined))
  );

  const [selectedColumns, setSelectedColumns] = useState(FiltColumns.map(col => col.key));
  const FiltereColumns = FiltColumns.filter(col => selectedColumns.includes(col.key) && col.display !== false);

  useEffect(() => {
    let processedData = [...data];

    // Apply search filter
    if (searchValue) {
      processedData = processedData.filter(item =>
        columns.some(col => {
          const itemValue = item[col.key];
          return itemValue && itemValue.toString().toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sorting.key) {
      processedData.sort((a, b) => {
        if (a[sorting.key] < b[sorting.key]) {
          return sorting.direction === 'asc' ? -1 : 1;
        }
        if (a[sorting.key] > b[sorting.key]) {
          return sorting.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredData(processedData);
    setPageNation(1); // Reset to first page on data change
  }, [data, searchValue, sorting, columns]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sorting.key === key && sorting.direction === 'asc') {
      direction = 'desc';
    }
    setSorting({ key, direction });
  };

  const nextPage = () => {
    if (pageNation < totalPages) {
      setPageNation(pageNation + 1);
    }
  };

  const prevPage = () => {
    if (pageNation > 1) {
      setPageNation(pageNation - 1);
    }
  };

  const handleCheckbox = (index) => (e) => {
    const checked = e.target.checked;
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = checked;
    setCheckboxes(newCheckboxes);
    setHeadCheckbox(newCheckboxes.every((checkbox) => checkbox));
  };

  const handleHeadCheckbox = (e) => {
    const checked = e.target.checked;
    setHeadCheckbox(checked);
    setCheckboxes(Array(data.length).fill(checked));
  };

  const renderPageButtons = () => {
    let startPage = Math.max(1, pageNation - Math.floor(pageBtnLimit / 2));
    let endPage = Math.min(totalPages, startPage + pageBtnLimit - 1);

    if (endPage - startPage + 1 < pageBtnLimit) {
      startPage = Math.max(1, endPage - pageBtnLimit + 1);
    }

    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPageNation(i)}
          className={`border-2 px-3 rounded-md text-black font-extrabold ${pageNation === i ? 'bg-blue-600' : 'bg-white'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const startIndex = (pageNation - 1) * pageData;
  const pagedData = filteredData.slice(startIndex, startIndex + pageData);

  const handlePageData = (value) => {
    const numValue = Number(value);
    setPageData(numValue);
    setPageNation(1);
  };

  const dataToShow = [2, 4, 6, 8, 10, 12, 14, 16];

  return (
    <div className='flex flex-col justify-center items-center mt-5 w-full'>
      <div className='flex gap-10'>
        {/* <label className='text-white'>
          Show
          <select className='text-black ml-2 px-2 py-1' onChange={(e) => handlePageData(e.target.value)}>
            {dataToShow.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </label> */}

        <input placeholder='Search' className='px-2 bg-white py-1 rounded-sm' value={searchValue} onChange={(e) => handleSearch(e.target.value)} />

        <Select
          label={"Column Selector"}
          columns={FiltColumns}
          onSelectionChange={(newSelection) => setSelectedColumns(newSelection)}
          renderOption={(col) => (
            <>
              <input
                type='checkbox'
                className='mr-2'
                value={col.key}
                checked={selectedColumns.includes(col.key)}
                onChange={() => setSelectedColumns(
                  selectedColumns.includes(col.key)
                    ? selectedColumns.filter(c => c !== col.key)
                    : [...selectedColumns, col.key]
                )}
              />
              {col.label}
            </>
          )}
        />
      </div>

      <table className='mt-6'>
        <thead>
          <tr className='bg-white text-black border border-gray-300'>
            <td>
              <input type='checkbox' className='mx-2 my-3' name='HeadSelect' checked={headCheckbox} onChange={handleHeadCheckbox} />
            </td>
            {FiltereColumns.map((col, index) => (
              <th key={index}
                  className='pr-6 p-2 cursor-pointer border border-gray-300'
                  onClick={() => col.sorting !== false && sortData(col.key)}>
                {col.label}
                {col.sorting !== false && <span>{sorting.key === col.key ? (sorting.direction === 'asc' ? '⬆️' : '⬇️') : '⬆️'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((Data, Index) => (
            <tr key={Index} className={`border border-gray-300 ${Index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'} ${styleClass ? styleClass(Data) : ''}`}>
              <td>
                <input type='checkbox' name={data.key}
                       className='mx-2 my-3' checked={checkboxes[(pageNation - 1) * perPageLimit + Index]}
                       onChange={handleCheckbox((pageNation - 1) * perPageLimit + Index)} />
              </td>
              {FiltereColumns.map((col, i) => {
                const content = col.render ? col.render(Data[col.key], Index, Data) : Data[col.key];
                const handleClick = col.action ? () => col.action(Data[col.key], Index) : undefined;
                return (
                  <td
                    key={`${Index}-${i}`}
                    onClick={handleClick}
                    className={`p-2 border border-gray-300 text-black ${col.action ? 'cursor-pointer' : ''}`}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='self-center mt-10 flex gap-3'>
        <button onClick={prevPage}
                disabled={pageNation === 1}
                className={`${pageNation === 1 ? 'text-gray-600 bg-gray-400' : 'text-black bg-white '} border-2 px-3 py-1 font-bold rounded-md`}>Previous</button>
        {renderPageButtons()}
        <button onClick={nextPage}
                disabled={pageNation === totalPages}
                className={`${pageNation === totalPages ? 'text-gray-600 bg-gray-400' : 'text-black bg-white '} border-2 px-3 py-1 font-bold rounded-md`}>Next</button>
      </div>
    </div>
  );
};

export default MyTable;
