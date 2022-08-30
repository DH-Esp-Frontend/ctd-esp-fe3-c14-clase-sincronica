import type { GetStaticProps, NextPage } from 'next'
import { DataGrid,GridColDef } from '@mui/x-data-grid';


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
    { field: 'malt', headerName: 'Malt'},
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
    malt: beer.ingredients.malt[0].name
    }
   })


  return (
    <div style={{ height: "70vh", width: '100%' }}>
      <DataGrid
        rows={rows} 
        columns={columns}
      />
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
