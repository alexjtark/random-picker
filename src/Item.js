import React from 'react';

const Item = (props) => {
  return(
    <div style={{minWidth: '15%', height: '100%'}}>
      <div className={'item level' +  props.level} style={{
        animation: `slidebg 0.4s ease-in`,
        backgroundImage: `url(${props.id}.jpg)`}}>
          {props.id !== "logo" ? props.id.replace(/_/g, " ") : ""}
      </div>
    </div>
  )
}

export default Item
