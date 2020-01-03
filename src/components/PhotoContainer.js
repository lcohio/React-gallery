import React, { Component } from 'react';
import Photo from './Photo'

export default class PhotoContainer extends Component {
	render() {
		return (
			<div className="photo-container">
				<h2>{ this.props.title }</h2>
				<ul>
					<Photo />
				</ul>
			</div>
		)
	}
}