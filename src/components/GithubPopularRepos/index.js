import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const fetchStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    fetchStatus: fetchStatusConstants.initial,
    activeLanguageFilter: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  updateActiveLanguageFilter = id =>
    this.setState({activeLanguageFilter: id}, this.fetchData)

  onSuccessFetch = data => {
    const transformedDataList = data.popular_repos.map(eachRepo => ({
      avatarUrl: eachRepo.avatar_url,
      forksCount: eachRepo.forks_count,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      name: eachRepo.name,
      starsCount: eachRepo.stars_count,
    }))
    this.setState({
      reposList: transformedDataList,
      fetchStatus: fetchStatusConstants.success,
    })
  }

  onFailedFetch = () => {
    console.log('onFailedFetch Called')
    this.setState({fetchStatus: fetchStatusConstants.failure})
  }

  fetchData = async () => {
    this.setState({fetchStatus: fetchStatusConstants.inProgress})
    const {activeLanguageFilter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilter}`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessFetch(data)
    } else {
      this.onFailedFetch()
    }
  }

  renderLanguageList = () => {
    const {activeLanguageFilter} = this.state
    return (
      <ul className="nav-container">
        {languageFiltersData.map(eachData => (
          <LanguageFilterItem
            key={eachData.id}
            itemDetails={eachData}
            activeLanguageFilter={activeLanguageFilter}
            updateActiveLanguageFilter={this.updateActiveLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repo-list-container">
        {reposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <div className="failure-view-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-view-image"
        />
      </div>
      <p className="failure-message">Something Went Wrong</p>
    </div>
  )

  renderFetchResult = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case fetchStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )

      case fetchStatusConstants.success:
        return this.renderSuccessView()

      case fetchStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="inner-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguageList()}
          {this.renderFetchResult()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
