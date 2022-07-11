import React, { FC, useState, useEffect } from "react";
import { WhpptInput } from "../ui/components/Input";
import { WhpptButton, WhpptTextArea, WhpptTab } from "../ui/components";
import { splitKeywords } from "../helpers";

type OpenGraphProps = WhpptTab & {
  save: (title, keywords, description) => void;
  loadedOgData: any;
};

export const OpenGraph: FC<OpenGraphProps> = ({ save, loadedOgData }) => {
  const [title, setTitle] = useState("");
  const [keyWords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  const error = "";
  const info = "";

  useEffect(() => {
    if (loadedOgData) {
      setTitle(loadedOgData.title);
      setKeywords(loadedOgData.keywords.join(','));
      setDescription(loadedOgData.description);
    }
  }, []);

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton
            icon=""
            text="Save Settings"
            onClick={() => save(title, splitKeywords(keyWords), description)}
            disabled={!title || !keyWords || !description}
          />
        </div>
      </section>

      <section className="whppt-form-section whppt-form-page-settings__form">
        <WhpptInput
          id="whppt-plaintext-input"
          label="Title"
          type="text"
          error={error}
          info={info}
          value={title}
          onChange={setTitle}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label="Keywords"
          type="text"
          error={error}
          info={info}
          value={keyWords}
          onChange={setKeywords}
        />
        <WhpptTextArea
          id="whppt-plaintext-input"
          label="Description"
          error={error}
          info={info}
          value={description}
          onChange={setDescription}
        />
      </section>
    </form>
  );
};
