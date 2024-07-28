import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, updateActiveLanguageFilter, activeLanguageFilter} = props
  const {id, language} = itemDetails

  const onClickFilterItem = () => {
    updateActiveLanguageFilter(id)
  }

  const dynamicClass =
    activeLanguageFilter === id
      ? 'active-button filter-button'
      : 'filter-button'

  console.log(activeLanguageFilter === id)

  return (
    <li className="filter-list-item">
      <button
        type="button"
        onClick={onClickFilterItem}
        className={dynamicClass}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
