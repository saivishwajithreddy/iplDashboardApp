import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = ({team}) => {
  const {id, name, teamImageUrl} = team
  return (
    <Link to={`/team-matches/${id}`} className="team-link">
      <li className="team-card">
        <img className="team-logo" src={teamImageUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
