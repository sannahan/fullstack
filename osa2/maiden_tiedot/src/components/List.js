import React from 'react'

const Item = ({ name, handleClick }) => {
  return (
    <div>
      { name }&nbsp;
      <button onClick={handleClick(name)}>show</button>
    </div>
  )
}

const List = ({ list, errormessage, handleClick }) => {
  if (errormessage) {
    return (
      <div>
        { errormessage }
      </div>
    )
  } else {
    return (
        <div>
          {list.map(item => <Item key={ item.name.common } name={ item.name.common } handleClick={handleClick} />)}
        </div>
      )
  } 
}

export default List