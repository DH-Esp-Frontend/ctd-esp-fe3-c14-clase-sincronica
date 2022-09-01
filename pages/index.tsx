import type { GetStaticProps, NextPage } from 'next'


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

const Home: NextPage<Props> = ({ beers }) => {

  return (
    <div style={{ height: "70vh", width: '100%' }}>
     {/* Aqui deberias realizar tu tabla con Table o DataGrid */}
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
