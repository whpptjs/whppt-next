import React, { FC } from 'react';
import { ComponentData, EditorArgs, WhpptInput } from '../../index';

export const WhpptSpacingEditorPanel: FC<EditorArgs<ComponentData>> = ({ onChange, value }) => {
  console.log('🚀 ~ file: Panel.tsx ~ line 5 ~ value', value);

  // const { setPage, page } = useWhppt();

  // const changeHeader = (type: string) => {
  //   setPage({ ...page, header: { ...page.header, type } });
  // };

  return (
    <div>
      <div className="whppt-editor-spacing">
        <h3 className="whppt-editor-spacing__title">Desktop</h3>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-large'}
            label={'Margin Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginTopLarge}
            onChange={e => onChange({ ...value, marginTopLarge: e })}
          />
          <WhpptInput
            id={'spacing-pt-large'}
            label={'Padding Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingTopLarge}
            onChange={e => onChange({ ...value, paddingTopLarge: e })}
          />
        </div>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-large'}
            label={'Margin Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginBottomLarge}
            onChange={e => onChange({ ...value, marginBottomLarge: e })}
          />
          <WhpptInput
            id={'spacing-pt-large'}
            label={'Padding Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingBottomLarge}
            onChange={e => onChange({ ...value, paddingBottomLarge: e })}
          />
        </div>
      </div>
      <div className="whppt-editor-spacing">
        <h3 className="whppt-editor-spacing__title">Tablet</h3>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-medium'}
            label={'Margin Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginTopMedium}
            onChange={e => onChange({ ...value, marginTopMedium: e })}
          />
          <WhpptInput
            id={'spacing-pt-medium'}
            label={'Padding Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingTopMedium}
            onChange={e => onChange({ ...value, paddingTopMedium: e })}
          />
        </div>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-medium'}
            label={'Margin Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginBottomMedium}
            onChange={e => onChange({ ...value, marginBottomMedium: e })}
          />
          <WhpptInput
            id={'spacing-pt-large'}
            label={'Padding Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingBottomMedium}
            onChange={e => onChange({ ...value, paddingBottomMedium: e })}
          />
        </div>
      </div>
      <div className="whppt-editor-spacing">
        <h3 className="whppt-editor-spacing__title">Mobile</h3>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-small'}
            label={'Margin Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginTopSmall}
            onChange={e => onChange({ ...value, marginTopSmall: e })}
          />
          <WhpptInput
            id={'spacing-pt-small'}
            label={'Padding Top'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingTopSmall}
            onChange={e => onChange({ ...value, paddingTopSmall: e })}
          />
        </div>
        <div className="whppt-editor-spacing__split">
          <WhpptInput
            id={'spacing-mt-small'}
            label={'Margin Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.marginBottomSmall}
            onChange={e => onChange({ ...value, marginBottomSmall: e })}
          />
          <WhpptInput
            id={'spacing-pt-small'}
            label={'Padding Bottom'}
            max={8}
            min={0}
            type={'number'}
            value={value.paddingBottomSmall}
            onChange={e => onChange({ ...value, paddingBottomSmall: e })}
          />
        </div>
      </div>
    </div>
  );
};
