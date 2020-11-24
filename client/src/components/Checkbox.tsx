import React, { ComponentProps } from 'react'

export const CheckBox = (props: any) => {
  return (
    <div>
      <input className="form-check-input" key={props.id} onChange={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.username} /> {props.username}
    </div>
  )
}


export default CheckBox