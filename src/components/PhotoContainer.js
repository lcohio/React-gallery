import React from 'react';
import Photo from './Photo'
import NotFound from './NotFound';

const PhotoContainer = (props) => {
	return (
		<div className="photo-container">
			<h2>{ props.title }</h2>
			<ul>
				{props.data.length === 0 ? <NotFound /> :
				<Photo urls={props.data} /> }
			</ul>
		</div>
	)
}

export default PhotoContainer