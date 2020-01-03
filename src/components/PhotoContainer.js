import React from 'react';
import Photo from './Photo'

const PhotoContainer = (props) => {
	return (
		<div className="photo-container">
			<h2>{ props.title }</h2>
			<ul>
				<Photo urls={props.data} />
			</ul>
		</div>
	)
}

export default PhotoContainer