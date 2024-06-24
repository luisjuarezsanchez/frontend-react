import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable/DataTable';
import NavBarLogin from '../components/NavBar/NavBarLogin';
import { fetchData } from '../services/api';

const DataTablePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return (
    <div>
      <NavBarLogin></NavBarLogin>
      <DataTable data={data} />
    </div>
  );
};

export default DataTablePage;
