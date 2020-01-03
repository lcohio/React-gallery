import React from "react";

const Photo = props => {
  return props.urls.map(url => 
    <li key={[url]}>
      <img src={url} alt=""></img>
    </li>
  )
}

export default Photo