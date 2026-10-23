import './index.css'

const MatchCard = ({match}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = match
  const statusClass = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="match-card">
      <img
        className="match-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="match-team">{competingTeam}</p>
      <p>{result}</p>
      <p className={`status ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
