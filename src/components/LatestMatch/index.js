import './index.css'

const LatestMatch = ({match}) => {
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = match

  return (
    <div className="latest-match-card">
      <div className="latest-left">
        <p className="latest-team">{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        className="latest-logo"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <div className="latest-right">
        <p className="label">First Innings</p>
        <p>{firstInnings}</p>
        <p className="label">Second Innings</p>
        <p>{secondInnings}</p>
        <p className="label">Man Of The Match</p>
        <p>{manOfTheMatch}</p>
        <p className="label">Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
