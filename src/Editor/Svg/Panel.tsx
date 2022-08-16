import React, { FC } from 'react';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../../Editor/';
import { WhpptSvgData } from './SvgData';
import { useWhppt } from '../../Context';
import { Gallery } from '../../Gallery';
import { GalleryItem } from '../../Gallery/Model';
import parse from 'html-react-parser';

export const WhpptSvgEditorPanel: FC<EditorArgs<WhpptSvgData, EditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel } = useWhppt();

  const useSvg = ({ _id, svgString, fileInfo }: GalleryItem & WhpptSvgData) => {
    onChange({ ...value, svgString, fileInfo, galleryItemId: _id });
  };

  return (
    <div>
      {value && value.svgString ? (
        <div className="whppt-svg-editor-panel__svg">
          {parse(value.svgString)}
          {<p className="">{value.fileInfo?.originalname || ''}</p>}
        </div>
      ) : (
        <div
          className="whppt-svg-editor-panel--empty"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'svg',
              component: <Gallery onUse={useSvg} />,
            });
          }}>
          <button className="whppt-svg-editor-panel__gallery-link">{'Pick from Gallery'}</button>
        </div>
      )}
    </div>
  );
};
