import React from 'react';
import { useWhppt } from '../../Context';
import { OpenGraph } from '../../CommonSettings/OpenGraph';
import { WhpptTab } from '../../ui/components/WhpptTab';

export const PageOpenGraph = ({ name, label }: WhpptTab) => {
  const { api, page, setPage } = useWhppt();

  const save = (title, keywords, description) => {
    const settings = { ...page.settings, og: { title, keywords, description } };
    const updatedPage = { ...page, settings: { ...settings } };

    return api.page.save({ page: updatedPage }).then(() => {
      setPage(updatedPage);
    });
  };

  return (
    <OpenGraph
      name={name}
      label={label}
      save={save}
      title={page.settings.og && page.settings.og.title}
      keywords={page.settings.og && page.settings.og.keywords}
      description={page.settings.og && page.settings.og.description}
    />
  );
};
