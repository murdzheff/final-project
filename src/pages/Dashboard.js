import { useState } from 'react'
import LeftSideContainer from '../components/leftside-dashboard/LeftsideDashboard'
// import DashboardHeader from '../components/dashhboardHeader/DashboardHeader'
// import userManager from '../model/userManager'
import TinderCard from 'react-tinder-card'
 
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("token").userId || null)
  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://phantom-marca.unidadeditorial.es/f33d05336aaec8dc128495e07476089c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/04/09/16495083426532.jpg'
    }
  ]

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  return (
    <div className='dashboard'>
      <LeftSideContainer user={user} />
   
    <div className='swipe-container'>

      <div className='card-container'>
      {characters.map((character) =>
          <TinderCard  className='swipe' key={character.name} 
                   onSwipe={(dir) => swiped(dir, character.name)} 
                 onCardLeftScreen={() => outOfFrame(character.name)}>
             <div style={{ backgroundImage: 'url(' + character.url + ')' }}
                 className='card'>

              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
        <div className='swipe-info'> 
        {lastDirection ? <p>Yo swiped {lastDirection}</p>:<p/> }
         </div>
      </div>

    </div>
    
  </div>

  )

}
export default Dashboard