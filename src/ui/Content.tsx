import React, { FC, ReactElement, useState } from 'react';
import { ContentEditor, EditorArgs, replaceInList, useWhppt, WhpptIcon } from '../index';
import { ComponentData, WhpptComponentDefinition } from '../ContentComponents/ComponentData';
import Spacing from '../setSpacings';
import { StandardPopup } from './Popups/Standard';

export type ContentTreeNode = {
  name: string;
  value: ComponentData[];
  onChange: (value: ComponentData[]) => void;
};

export type WhpptContentArgs = EditorArgs<ComponentData[]> & {
  componentDefinitions: WhpptComponentDefinition[];
  containerDefault?: boolean;
  renderComponent: (data: ComponentData, onChange: (data: ComponentData) => void) => ReactElement;
};

export const WhpptContent: FC<WhpptContentArgs> = ({ renderComponent, containerDefault = true, componentDefinitions, onChange, value }) => {
  const [deletePopup, setShowDeletePopup] = useState({} as ComponentData);

  const { editing, showEditor, editorState, setEditorState, hideEditor } = useWhppt();

  const deleteComponent = ({
    content,
    items,
    onChange,
  }: {
    content: ComponentData;
    items: ComponentData[];
    onChange: (value: ComponentData[]) => void;
  }) => {
    const updatedContent = items.filter(i => i._id !== content._id);
    onChange(updatedContent);
    setShowDeletePopup({} as ComponentData);
    setEditorState({ ...editorState, value: updatedContent });
  };

  const spacingClasses = (content: ComponentData) => {
    const { setMarginTop, setMarginBottom, setPaddingTop, setPaddingBottom } = Spacing({});

    const marginTop = setMarginTop({
      marginTopSmall: content.marginTopSmall,
      marginTopMedium: content.marginTopMedium,
      marginTopLarge: content.marginTopLarge,
    });
    const marginBottom = setMarginBottom({
      marginBottomSmall: content.marginBottomSmall,
      marginBottomMedium: content.marginBottomMedium,
      marginBottomLarge: content.marginBottomLarge,
    });
    const paddingTop = setPaddingTop({
      paddingTopSmall: content.paddingTopSmall,
      paddingTopMedium: content.paddingTopMedium,
      paddingTopLarge: content.paddingTopLarge,
    });
    const paddingBottom = setPaddingBottom({
      paddingBottomSmall: content.paddingBottomSmall,
      paddingBottomMedium: content.paddingBottomMedium,
      paddingBottomLarge: content.paddingBottomLarge,
    });

    return `${marginTop} ${marginBottom} ${paddingTop} ${paddingBottom}`;
  };

  const definitionActions = (content: ComponentData) => {
    const definition = componentDefinitions.find(c => c.key === content.definitionKey);
    //TODO impliment this on the other side. And get it working.
    return (definition && definition.actions) || [];
  };

  const actions = [
    {
      _id: 'spacing',
      info: 'Spacing Settings',
      icon: <WhpptIcon is="spacing"></WhpptIcon>,
      action: ({ content, onChange }: { content: ComponentData; onChange: (data: ComponentData) => void }) => {
        if (editorState.editor !== 'spacing') return showEditor('spacing', content, onChange, undefined);
        hideEditor();
      },
      isActive: (content: ComponentData) => {
        return editorState.editor === 'spacing' && editorState.value._id === content._id;
      },
    },
    {
      _id: 'delete',
      info: 'Delete Component',
      icon: <WhpptIcon is="bin"></WhpptIcon>,
      action: ({ content }: { content: ComponentData }) => {
        setShowDeletePopup(content);
      },
    },
    {
      _id: 'up',
      info: 'Move Up',
      icon: (
        <div className="whppt-content-actions__arrow-icon--up">
          <WhpptIcon is="back-arrow"></WhpptIcon>
        </div>
      ),
      action: ({ content }: { content: ComponentData }) => {
        const index = value.indexOf(content);
        const toIndex = index - 1;
        const items = [...value];
        items.splice(index, 1);
        items.splice(toIndex, 0, content);
        onChange(items);
      },
    },
    {
      _id: 'down',
      info: 'Move Down',
      icon: (
        <div className="whppt-content-actions__arrow-icon--down">
          <WhpptIcon is="back-arrow"></WhpptIcon>
        </div>
      ),
      action: ({ content }: { content: ComponentData }) => {
        const index = value.indexOf(content);
        const toIndex = index + 1;
        const items = [...value];
        items.splice(index, 1);
        items.splice(toIndex, 0, content);
        onChange(items);
      },
    },
  ];

  return (
    <ContentEditor<ComponentData>
      value={value}
      componentDefinitions={componentDefinitions}
      onChange={onChange}
      containerDefault={containerDefault}>
      {
        <div className={editing ? 'whppt-content whppt-content--editor-open' : ''}>
          {value.map(content => {
            return (
              <div key={content._id} className="whppt-content__component">
                {editing ? (
                  <div className="whppt-content-actions">
                    {deletePopup._id === content._id && (
                      <StandardPopup
                        cancel={() => setShowDeletePopup({} as ComponentData)}
                        accept={() => deleteComponent({ content, items: value, onChange })}
                        message={'Are you sure you want to delete this component?'}
                      />
                    )}
                    {actions.map(action => {
                      return (
                        <div key={action._id}>
                          <button
                            onClick={e => {
                              action.action({ content, onChange: changedValue => onChange(replaceInList(value, changedValue)) });
                              e.stopPropagation();
                            }}
                            className={`whppt-content-actions__action ${
                              action.isActive && action.isActive(content) ? 'whppt-content-actions__action--active' : ''
                            }`}>
                            <div>{action.icon}</div>
                            <div className="whppt-content-actions__action-info">{action.info}</div>
                          </button>
                        </div>
                      );
                    })}
                    {definitionActions(content).map(action => {
                      return (
                        <div key={action._id}>
                          <button
                            onClick={e => {
                              action.action({ content, onChange: changedValue => onChange(replaceInList(value, changedValue)) });
                              e.stopPropagation();
                            }}
                            className={`whppt-content-actions__action`}>
                            <div>{action.icon()}</div>
                            <div className="whppt-content-actions__action-info">{action.info}</div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ''
                )}
                <div
                  id={content._id}
                  className={`w-full ${spacingClasses(content)} ${
                    content?.backgroundSettings?.length && content?.backgroundSettings[0] && `theme-${content?.backgroundSettings[0]}`
                  } `}>
                  <div>{renderComponent(content, changedValue => onChange(replaceInList(value, changedValue)))}</div>
                </div>
              </div>
            );
          })}
          {editing && <div>Add your new components</div>}
        </div>
      }
    </ContentEditor>
  );
};
