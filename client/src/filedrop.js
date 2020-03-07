import React from 'react';
import DragAndDrop from '@bit/bronz3beard.react-component-collection.drag-and-drop';

const handleDrop = (files) => {
	let tempFileList = [];

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (!file.name) {
			return;
		}
		alert(file.name)
		tempFileList.push(file);
	}
};

export default (
	<DragAndDrop handleDrop={handleDrop}>
		<div
			type="file"
			name="files"
			accept="image/*"
			multiple
			style={{ height: `${300}px`, width: `${500}px` }}
		></div>
	</DragAndDrop>
)