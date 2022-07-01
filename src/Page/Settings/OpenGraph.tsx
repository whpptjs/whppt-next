import React, { FC, useState } from "react";
import { WhpptInput } from "../../ui/components/Input";
import { WhpptButton, WhpptTextArea, WhpptTab } from "../../ui/components";

export const OpenGraph: FC<WhpptTab> = () => {
  const [title, setTitle] = useState("");
  const [keyWords, setKeywords] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    //const keyWordsArray = keyWords.replace(/ +/g, '').split(','); TODO: Move to helper and import?
    //const openGraphSettings = { title, description, keywords: keyWordsArray};
    //setPage(...page, openGraphSettings)
  };

  const error = "";
  const info = "";

  return (
    <form className="whppt-form">
      <section className="whppt-form-page-settings__actions">
        <div>
          <WhpptButton
            icon=""
            text="Save Settings"
            onClick={submit}
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
