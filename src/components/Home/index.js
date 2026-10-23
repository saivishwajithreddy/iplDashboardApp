import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

const Home = () => {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(teamsApiUrl)
      const data = await response.json()
      setTeams(
        data.teams.map(team => ({
          id: team.id,
          name: team.name,
          teamImageUrl: team.team_image_url,
        })),
      )
      setIsLoading(false)
    }
    getTeams()
  }, [])

  return (
    <div className="home-container">
      <div className="home-header">
        <img
          className="ipl-logo"
          src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          alt="ipl logo"
        />
        <h1 className="home-heading">IPL Dashboard</h1>
      </div>
      {isLoading ? (
        <div data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <ul className="teams-list">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home
