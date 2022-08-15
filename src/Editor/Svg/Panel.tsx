import React, { FC } from 'react';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../../Editor/';
import { WhpptSvgData } from './SvgData';
import { useWhppt } from '../../Context';
import { Gallery } from '../../Gallery';
import parse from 'html-react-parser';

export const WhpptSvgEditorPanel: FC<EditorArgs<WhpptSvgData, EditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel } = useWhppt();

  return (
    <div>
      {value && value.svg ? (
        <div className="whppt-gallery-grid--svgs svg-container">
          {parse(value.svg)}
          {<p className="whppt-gallery-grid--svgs svg-title">{value.name}</p>}
          <button onClick={() => onChange({ ...value, svg: value.svg })}>onChange</button>
        </div>
      ) : (
        <div
          className="whppt-image-editor-panel__cropper--empty"
          onClick={() => {
            toggleSettingsPanel({
              key: 'gallery',
              activeTab: 'svg',
              component: <Gallery />,
            });
          }}>
          <button className="whppt-image-editor-panel__gallery-actions__button">{'Pick from Gallery'}</button>
        </div>
      )}
    </div>
  );
};
