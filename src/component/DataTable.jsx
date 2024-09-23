import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// import DetailView from "./DetailView";



const DetailShow = ({selectedRow}) => {
return(
  <>
    <h1>Product Name : {selectedRow.name}</h1>
    <h3>Id : {selectedRow.id}</h3>
    <h3>Category : {selectedRow.main_category}</h3>
    <h3>Created Date : {selectedRow.created_date}</h3>
    <h3>Modified Date : {selectedRow.modified_date}</h3>
  </>
)
}

const DataTable = () => {
  // const [pageNo, setPageNo] = useState(1);
  const columns = [
    { field: "images.front", headerName: "Image", width: 175 },
    { field: "name", headerName: "Product Name", width: 175 },
    { field: "id", headerName: "ID", width: 175 },
    { field: "hs_code", headerName: "Price", width: 175 },
    { field: "main_category", headerName: "Category", width: 175 },
    { 
  
      field: 'actions', 
  
      headerName: 'Actions', 
  
      width: 100, 
  
      renderCell: (params) => (
  
        <button onClick={() => handleActionClick(params.row)}>View Details</button>
  
      )
  
    },
    {
      width:100,
      renderCell: () => (
        <button >Add to Cart</button>
      )
    }
  ];
  const [tableData, setTableData] = useState([]);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  
  const handleActionClick = (row) => {
  
    // Do something with the row data
    setShowOtherComponent(!showOtherComponent);
    setSelectedRow(row);
    console.log('Row clicked:', row);
  
  };
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
      const url = `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products`;
      const response = await axios.get(url);
      setTableData(response.data.products);
    }
    // console.log(tableData[0].mrp.mrp);
//   const rows = [
//     for(let i=0; i<tableData.length)
// ];

  // function handleClick() {
  //   setPageNo(pageNo + 1);
  // }


  return (
    <>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={tableData} getRowId={(row) => row.sku_code} columns={columns}           initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          />
    </Box>
    {showOtherComponent && <DetailShow selectedRow={selectedRow} />}
    </>
  );
};

export default DataTable;
