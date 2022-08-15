import React, { FC, useState } from 'react';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../../Editor/';
import { WhpptSvgData } from './SvgData';
import { useWhppt } from '../../Context';
import { Gallery } from '../../Gallery';
import parse from 'html-react-parser';
import { GalleryItem } from '../../Gallery/Model';

export const WhpptSvgEditorPanel: FC<EditorArgs<WhpptSvgData, EditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel } = useWhppt();

  const useSvg = ({ _id, svgString }: GalleryItem & WhpptSvgData) => {
    onChange({ ...value, svgString, galleryItemId: _id });
  };

  return (
    <div>
      {value && value.svgString ? (
        <div className="whppt-gallery-grid--svgs svg-container">
          {parse(value.svgString)}
          {<p className="whppt-gallery-grid--svgs svg-title">{'no name'}</p>}
        </div>
      ) : (
        <div
          className="whppt-image-editor-panel__cropper--empty"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'svg',
              component: <Gallery onUse={useSvg} />,
            });
          }}>
          <button className="whppt-image-editor-panel__gallery-actions__button">{'Pick from Gallery'}</button>
        </div>
      )}
    </div>
  );
};
