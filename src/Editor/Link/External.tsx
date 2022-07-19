import React, { FC } from 'react';
import { WhpptInput, WhpptLinkData, WhpptTab } from '../../ui/components';
import { EditorArgs } from '../EditorArgs';

export const ExternalLinkTab: FC<WhpptTab & EditorArgs<WhpptLinkData>> = ({ value, onChange }) => {
  return (
    <form className="whppt-form">
      <section className="whppt-form-section whppt-form-section--bottom-gap">
        <WhpptInput
          id="whppt-editor-link-text"
          label="Text to show in the link"
          type="text"
          error=""
          info=""
          value={value.text}
          onChange={text => onChange({ ...value, text })}
        />

        <WhpptInput
          id="whppt-editor-link-href"
          label="External url to link to"
          type="text"
          error=""
          info=""
          value={value.href}
          onChange={href => onChange({ ...value, href })}
        />
      </section>
    </form>
  );
};
