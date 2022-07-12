import React, { FC, useState, useEffect } from "react";
import { WhpptInput } from "../ui/components/Input";
import { splitKeywords } from "../helpers";

import {
  WhpptButton,
  WhpptTextArea,
  WhpptTab,
} from "../ui/components";

type SeoProps = WhpptTab & {
  save: (title, keywords, description, priority, frequency) => void;
  loadedSeoData: any;
}

export const Seo: FC<SeoProps> = ({ save, loadedSeoData }) => {
  const [title, setTitle] = useState("");
  const [keyWords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [frequency, setFrequency] = useState("");

  const error = "";
  const info = "";

  useEffect(() => {
    if (loadedSeoData) {
      setTitle(loadedSeoData.title);
      setKeywords(loadedSeoData.keywords.join(','));
      setDescription(loadedSeoData.description);
      setPriority(loadedSeoData.priority);
      setFrequency(loadedSeoData.frequency);
    }
  }, []);

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton
            icon=""
            text="Save Settings"
            onClick={() => save(title, splitKeywords(keyWords), description, priority, frequency)}
            disabled={
              !title ||
              !keyWords ||
              !description ||
              !priority ||
              !frequency
            }
          />
        </div>
      </section>

      <section className="whppt-form-section whppt-form-page-settings__form whppt-form-section--bottom-gap">
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
        <WhpptInput
          id="whppt-plaintext-input"
          label="Priority"
          type="text"
          placeholder="Set page priority"
          error={error}
          info={info}
          value={priority}
          onChange={setPriority}
        />
        <WhpptInput
          id="whppt-plaintext-input"
          label=""
          type="text"
          placeholder="Set page frequency"
          error={error}
          info={info}
          value={frequency}
          onChange={setFrequency}
        />
      </section>
    </form>
  );
};
