import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

const formatMatch = match => ({
  umpires: match.umpires,
  result: match.result,
  manOfTheMatch: match.man_of_the_match,
  id: match.id,
  date: match.date,
  venue: match.venue,
  competingTeam: match.competing_team,
  competingTeamLogo: match.competing_team_logo,
  firstInnings: match.first_innings,
  secondInnings: match.second_innings,
  matchStatus: match.match_status,
})

const COLORS = ['#18ed66', '#e41f2d', '#a3a3a3']

const TeamMatches = () => {
  const {id} = useParams()
  const history = useHistory()

  const [teamData, setTeamData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getTeamMatches = async () => {
      setIsLoading(true)
      setHasError(false)

      try {
        const response = await fetch(`${teamMatchesApiUrl}${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch team matches')
        }
        const data = await response.json()

        setTeamData({
          teamBannerUrl: data.team_banner_url,
          latestMatch: formatMatch(data.latest_match_details),
          recentMatches: data.recent_matches.map(formatMatch),
        })
      } catch (error) {
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getTeamMatches()
  }, [id])

  const getPieData = () => {
    const allMatches = [teamData.latestMatch, ...teamData.recentMatches]
    const count = status =>
      allMatches.filter(match => match.matchStatus === status).length

    return [
      {name: 'Won', value: count('Won')},
      {name: 'Lost', value: count('Lost')},
      {name: 'Drawn', value: count('Drawn')},
    ]
  }

  const onClickBack = () => history.push('/')

  const renderContent = () => {
    const {teamBannerUrl, latestMatch, recentMatches} = teamData
    const pieData = getPieData()

    return (
      <>
        <img className='team-banner' src={teamBannerUrl} alt='team banner' />
        <h1 className='latest-heading'>Latest Matches</h1>
        <LatestMatch match={latestMatch} />

        <h1 className='latest-heading'>Match Statistics</h1>
        <div className='pie-container'>
          <PieChart width={320} height={300}>
            <Pie
              cx='50%'
              cy='50%'
              data={pieData}
              dataKey='value'
              innerRadius='40%'
              outerRadius='70%'
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend
              iconType='circle'
              layout='horizontal'
              verticalAlign='bottom'
              align='center'
            />
          </PieChart>
        </div>

        <ul className='recent-matches-list'>
          {recentMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </ul>

        <button type='button' className='back-button' onClick={onClickBack}>
          Back
        </button>
      </>
    )
  }

  return (
    <div className='team-matches-container'>
      {isLoading ? (
        <div data-testid='loader'>
          <Loader type='Oval' color='#ffffff' height={50} width={50} />
        </div>
      ) : hasError ? (
        <p>Something went wrong. Please try again.</p>
      ) : (
        renderContent()
      )}
    </div>
  )
}

export default TeamMatches
