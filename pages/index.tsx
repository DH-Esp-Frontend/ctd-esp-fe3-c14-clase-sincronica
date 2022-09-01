import type { GetStaticProps, NextPage } from 'next'
import { DataGrid,GridColDef } from '@mui/x-data-grid';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


type Ingredient = {
  name: string
}

type Beer = {
    id: number
    name: string,
    first_brewed: string,
    food_pairing: string,
    abv: string,
    attenuation_level: string,
    ingredients: {
      yeast: string,
      malt:Ingredient[]
    }
}

interface Props {
  beers: Beer[]
}

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name'},
    { field: 'first_brewed', headerName: 'First Brewed'},
    { field: 'food_pairing', headerName: 'Food Pairing'},
    { field: 'abv', headerName: 'ABV'},
    { field: 'attenuation_level', headerName: 'Attenuation level'},
    { field: 'yeast', headerName: 'Yeast', width: 200},
    { field: 'malt', headerName: 'Malt', valueGetter: (params) => params.row.name},
]

const Home: NextPage<Props> = ({ beers }) => {
  const rows = beers.map(beer => {
    return{
    id: beer.id,
    name: beer.name,
    first_brewed: beer.first_brewed,
    food_pairing: beer.food_pairing,
    abv: beer.abv,
    attenuation_level: beer.attenuation_level,
    yeast: beer.ingredients.yeast,
    malt: beer.ingredients.malt[0]
    }
   })


  return (
    <div style={{ height: "70vh", width: '100%' }}>
      <DataGrid
        rows={rows} 
        columns={columns}
      />

      {/* Opcion con Table */}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>First Brewed</TableCell>
              <TableCell>ABV</TableCell>
              <TableCell>Food Pairing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beers.map(beer=>(
              <TableRow key={beer.id}>
                <TableCell>{beer.name} </TableCell>
                <TableCell>{beer.first_brewed} </TableCell>
                <TableCell>{beer.abv} </TableCell>
                <TableCell>{beer.food_pairing} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async()=>{
  const res = await fetch("https://api.punkapi.com/v2/beers")
  const beers: Beer[]  = await res.json()

  return {
    props: {
      beers
    }
  }

}
