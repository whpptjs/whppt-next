import React from 'react';
import { ComponentData } from './ComponentData';
import { FormattedTextComponent, FormattedTextComponentData } from './FormattedText';
import { ImageComponent, ImageComponentData } from './Image';
import { PlainTextComponent, PlainTextPageComponentData } from './PlainText';
import { RichTextComponent, RichTextComponentData } from './RichText';
import { SvgComponent, SvgComponentData } from './Svg';

export const UseWhpptContentComponents = (componentData: ComponentData, onChange: (data: ComponentData) => void) => {
  if (componentData.definitionKey === 'PlainText')
    return (
      <PlainTextComponent
        data={componentData.data as PlainTextPageComponentData}
        container={componentData.container as boolean}
        onChange={value => onChange({ ...componentData, data: value })}
      />
    );
  if (componentData.definitionKey === 'RichText')
    return (
      <RichTextComponent
        data={componentData.data as RichTextComponentData}
        container={componentData.container as boolean}
        onChange={value => onChange({ ...componentData, data: value })}
      />
    );
  if (componentData.definitionKey === 'Image')
    return (
      <ImageComponent
        data={componentData.data as ImageComponentData}
        container={componentData.container as boolean}
        onChange={value => onChange({ ...componentData, data: value })}
      />
    );
  if (componentData.definitionKey === 'FormattedText')
    return (
      <FormattedTextComponent
        data={componentData.data as FormattedTextComponentData}
        container={componentData.container as boolean}
        onChange={value => onChange({ ...componentData, data: value })}
      />
    );
  if (componentData.definitionKey === 'Svg')
    return <SvgComponent data={componentData.data as SvgComponentData} onChange={value => onChange({ ...componentData, data: value })} />;
};
