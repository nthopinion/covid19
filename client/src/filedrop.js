import React from 'react';
// eslint-disable-next-line import/no-unresolved
import DragAndDrop from '@bit/bronz3beard.react-component-collection.drag-and-drop';

const handleDrop = (files) => {
  const tempFileList = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.name) {
      return;
    }
    // eslint-disable-next-line no-alert
    alert(file.name);
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
    />
  </DragAndDrop>
);
