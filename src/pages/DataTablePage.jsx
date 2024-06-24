import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import NavBar from '../components/NavBar/NavBar';
import { fetchData } from '../services/api';

const DataTablePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <DataTable data={data} />
    </div>
  );
};

export default DataTablePage;
