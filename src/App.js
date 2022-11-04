import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,GridValueGetterParams,  GridRowsProp, ptBR, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  {
    field: 'nome',
    headerName: 'Nome',
    width: 200,
  },
  {
    field: 'link',
    headerName: 'Link',
    width: 380,
  },
  {
    field: 'dataCriacao',
    headerName: 'Data de Criação',
    width: 200,
  },
  {
    field: 'ativo',
    headerName: 'Ativo',
    width: 100,
    
  },
  {
    field: 'acessar',
    headerName: 'Acessar',
    width: 100,
    renderCell: (params) =>
      <SearchIcon sx={{color: '#0A84FF', marginLeft: '5px'}} onClick={()=>{
        window.location.href = 'https://github.com/EB28?tab=repositories'
      }}>

      </SearchIcon>
  }
];

const rows = [
  {id: 1, nome: 'teste', link: 'teste'}
]
let arrayValores = []

export default function App() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users/EB28/repos')
    .then(async res =>{
      if(!res.ok){
          throw new Error(res.status)
      }
    
      var data = await res.json()
      arrayValores = []
      data.map(item =>{
          let nome = item.name
          let link = item.url
          let dataCriacao = item.created_at
          let linha = {"id": item.id, "nome": nome, "link": link, "dataCriacao": dataCriacao, "ativo": "ATIVO"}
          arrayValores.push(linha)
      })
      setTableData(arrayValores)
    }).catch(e => console.log(e))
  })
  console.log(arrayValores)
  return (
    <>
      <p style={{display: 'flex', justifyContent: 'center', fontSize: '20px', fontWeight: '600'}}>Relação de Repositórios</p>
      <Box sx={{ height: 307, width: 1 }}>
        <DataGrid
          columns={columns}
          rows={arrayValores.length !== 0 ? arrayValores : rows}
          components={{ Toolbar: GridToolbar }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </>

  );
}

