import React from 'react'
import PropTypes from 'prop-types'

const StrengthLevel = (props) => {
  const { className } = props
  return (
    <div
      className={`${className} border border-slate-300 h-6 w-2 mysm:h-8 mysm:w-3 mr-2 transition-all duration-300`}
    ></div>
  )
}
StrengthLevel.propTypes = {
  className: PropTypes.any
}

export default StrengthLevel
