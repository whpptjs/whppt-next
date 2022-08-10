import React, { FC, useRef, useState, useEffect } from 'react';
import { WhpptGalleryUploader } from '../ui/components/GalleryUploader';
import { GalleryTab } from './GalleryTab';
import { useWhppt } from '..';
import parse from 'html-react-parser';

export const Svgs: FC<GalleryTab> = ({ items, upload }) => {
  const { domain, api } = useWhppt();
  const [svgStrings, setSvgStrings] = useState([]);

  useEffect(() => {
    createTestSvgStrings();
  }, [items]);

  const createTestSvgStrings = () => {
    setSvgStrings([]);
    console.log(svgStrings);
    items.forEach(() => {
      fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg')
        .then(res => res.text())
        .then(text => setSvgStrings(svgStrings => [...svgStrings, { name: 'svgName', svgString: text }]));
    });
  };

  // useEffect(() => {
  //   createSvgStrings();
  // }, []);

  // const createSvgStrings = () => {
  //   items.map(({ _id, name }) => {
  //     api.gallery.svg
  //       .load('_id')
  //       .then(res => res.text())
  //       .then(svgString => setSvgStrings([...svgStrings, {name, svgString}]));
  //   });
  // };

  // const getSvgUrl = imgId => { //this one will change
  //   return `${process.env.NEXT_PUBLIC_BASE_API_URL}/gallery/image/${imgId}`;
  // };

  const uploadSvg = newFile => {
    const file = new FormData();
    file.append('file', newFile);
    file.append('type', 'svg');
    file.append('domainId', domain._id);
    upload(file);
  };

  return (
    <section className="whppt-gallery whppt-gallery__main-container">
      <div className="whppt-gallery-grid whppt-gallery-grid--svgs">
        <WhpptGalleryUploader upload={uploadSvg} />
        {svgStrings &&
          svgStrings.map(({ name, svgString }, index) => (
            <div className="whppt-gallery-grid--svgs svg-container" key={index}>
              {parse(svgString)}
              {<p className="whppt-gallery-grid--svgs svg-title">{name}</p>}
            </div>
          ))}
      </div>
    </section>
  );
};
