import './index.css'

const MatchCard = ({match}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = match

  const getStatusClass = () => {
    if (matchStatus === 'Won') {
      return 'won'
    }
    if (matchStatus === 'Lost') {
      return 'lost'
    }
    return 'drawn'
  }

  return (
    <li className='match-card'>
      <img
        className='match-logo'
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className='match-team'>{competingTeam}</p>
      <p>{result}</p>
      <p className={`status ${getStatusClass()}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
