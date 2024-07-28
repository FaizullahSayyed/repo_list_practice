import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <li className="repo-list-item">
      <div className="repo-avatar-container">
        <img src={avatarUrl} alt={name} className="repo-avatar" />
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="tiny-image"
        />
        <p className="repo-details-paragraph">{starsCount} stars</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="tiny-image"
        />
        <p className="repo-details-paragraph">{forksCount} forks</p>
      </div>
      <div className="repo-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="tiny-image"
        />
        <p className="repo-details-paragraph">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
