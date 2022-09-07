import React from 'react'
import PropTypes from 'prop-types'

const MyCheckBox = (props) => {
  const { title, checked, onChange } = props
  return (
    <div className="mt-2 ">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="w-6 h-6 accent-green-400 border-0 rounded-md focus:ring-0 mr-6"
          checked={checked}
          onChange={onChange}
        />
        <span className="text-sm mysm:text-base">{title}</span>
      </label>
    </div>
  )
}
MyCheckBox.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default MyCheckBox
