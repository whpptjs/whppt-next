import React, { FC, useState } from 'react';
import { EditorArgs } from '../EditorArgs';
import { EditorOptions } from '../../Editor/';
import { WhpptSvgData } from './SvgData';
import { useWhppt } from '../../Context';
import { Gallery } from '../../Gallery';
import { GalleryItem } from '../../Gallery/Model';
import parse from 'html-react-parser';

export const WhpptSvgEditorPanel: FC<EditorArgs<WhpptSvgData, EditorOptions>> = ({ value, onChange }) => {
  const { toggleSettingsPanel, api } = useWhppt();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [svgString, setSvgString] = useState('');

  const useSvg = ({ _id }: GalleryItem) => {
    setLoading(true);
    onChange({ ...value, galleryItemId: _id });

    api.gallery
      .loadSvg(_id)
      .then(setSvgString)
      .catch(err => setError(err.message || err))
      .finally(() => setLoading(false));
  };

  return error ? (
    <>
      <p>Svg could not be loaded</p> {error}
    </>
  ) : loading ? (
    <p>loading ...</p>
  ) : (
    <div className="whppt-svg-editor-panel">
      {svgString ? (
        <>
          <div className="whppt-svg-editor-panel__svg">{parse(svgString)}</div>
          <div className="whppt-svg-editor-panel__gallery-actions">
            <button
              className="whppt-svg-editor-panel__gallery-actions__button"
              onClick={() => {
                toggleSettingsPanel({
                  key: 'gallery',
                  activeTab: 'svg',
                  component: <Gallery onUse={useSvg} />,
                });
              }}>
              {'Choose a different svg'}
            </button>
            <button
              className="whppt-svg-editor-panel__gallery-actions__button"
              onClick={() => {
                setSvgString('');
                onChange({ ...value, galleryItemId: '' });
              }}>
              Remove
            </button>
          </div>
        </>
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
