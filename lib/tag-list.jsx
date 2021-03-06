import React, { PropTypes } from 'react'
import classNames from 'classnames'
import EditableList from './editable-list'
import { get } from 'lodash'

export default React.createClass( {

	propTypes: {
		onSelectTag: PropTypes.func.isRequired,
		onEditTags: PropTypes.func.isRequired,
		onRenameTag: PropTypes.func.isRequired,
		onTrashTag: PropTypes.func.isRequired,
		onReorderTags: PropTypes.func.isRequired,
		tags: PropTypes.array.isRequired
	},

	render() {
		var classes = classNames( 'tag-list', {
			'tag-list-editing': this.props.editingTags
		} );

		return (
			<div className={classes}>
				<div className="tag-list-title">
					<h2 className="panel-title theme-color-fg-dim">Tags</h2>
					<button className="tag-list-edit-toggle button button-borderless" tabIndex="0" onClick={this.props.onEditTags}>
						{this.props.editingTags ? 'Done' : 'Edit' }
					</button>
				</div>
				<EditableList
					className="tag-list-items"
					items={this.props.tags}
					editing={this.props.editingTags}
					renderItem={this.renderItem}
					onRemove={this.props.onTrashTag}
					onReorder={this.props.onReorderTags}
					selectedTag={this.props.selectedTag} />
			</div>
		);
	},

	renderItem( tag ) {
		const { selectedTag } = this.props;
		const valueLink = {
			value: tag.data.name,
			requestChange: this.props.onRenameTag.bind( null, tag )
		};

		const isSelected = tag.data.name === get( selectedTag, 'data.name', '' );
		const classes = classNames( 'tag-list-input', 'theme-color-fg', {
			active: isSelected
		} );

		return (
			<input
				className={classes}
				readOnly={!this.props.editingTags}
				onClick={this.onSelectTag.bind( this, tag )}
				valueLink={valueLink} />
		);
	},

	onSelectTag( tag, event ) {
		if ( !this.props.editingTags ) {
			event.preventDefault();
			event.currentTarget.blur();
			this.props.onSelectTag( tag );
		}
	}
} );
