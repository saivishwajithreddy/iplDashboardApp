import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = ({team}) => {
  const {id, name, teamImageUrl} = team
  return (
    <li className="team-item">
      <Link to={`/team-matches/${id}`} className="team-link">
        <div className="team-card">
          <img className="team-logo" src={teamImageUrl} alt={name} />
          <p className="team-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default TeamCard
