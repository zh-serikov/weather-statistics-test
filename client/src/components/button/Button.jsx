import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css'

const Button = ({ text, onClick, isActive }) => {

  return (
    <div className={cx(styles.wrapper, { [styles.active]: isActive })} onClick={onClick}>
      <span>{text}</span>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

export default Button
