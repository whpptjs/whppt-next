import React, { FC, useState } from "react";
import { WhpptInput } from "../ui/components/Input";
import { WhpptButton, WhpptTextArea, WhpptTab } from "../ui/components";
import { splitKeywords } from "../helpers";

type OpenGraphProps = WhpptTab & { save: (title, keywords, description) => void }

export const OpenGraph: FC<OpenGraphProps> = ({ save }) => {
  const [title, setTitle] = useState("");
  const [keyWords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  const error = "";
  const info = "";

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
