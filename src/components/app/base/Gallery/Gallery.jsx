import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./gallery.css";

const LINK_ICON =
  "https://gist.githubusercontent.com/vas85/50fcbfb33fe23fa710b47d5e3ade6a08/raw/117fc9a568bd4a961d429a94e84b60bd9abb2239/link-square1x.svg";

function Gallery(props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const maxImages = props.maxImages || 6;

  if (!props.images) return <div />;

  const imagesSubset = props.images.slice(0, maxImages);
  let titleElement = (props) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="gallery-title"
      href={props.link}
    >
      {props.title}
      <img className="gallery-link-icon" src={LINK_ICON} alt="" />
    </a>
  );
  let captionElement = (props) => <span>{props.caption}</span>;
  return (
    <>
      <Row style={{ marginLeft: "2px" }}>
        {imagesSubset.map(({ image, title }, idx) => {
          return (
            <Col sm="2" md="2" lg="2" className="mt-2 gallery-box">
              <div
                onClick={() => {
                  setIsOpen(true);
                  setPhotoIndex(idx);
                }}
                className="article-image"
              >
                <img src={image} alt="" />
                {title && <span className="gallery-caption">{title}</span>}
              </div>
            </Col>
          );
        })}
        {props.images.length - imagesSubset.length > 0 && (
          <Col sm="2" md="2" lg="2" className="mt-2 gallery-box">
            <div
              onClick={() => {
                setIsOpen(true);
                setPhotoIndex(imagesSubset.length);
              }}
              className="article-image-add"
            >
              +{props.images.length - imagesSubset.length}
            </div>
          </Col>
        )}
      </Row>
      {isOpen && (
        <Lightbox
          imageTitle={titleElement({
            title: props.images[photoIndex].title,
            link: props.images[photoIndex].link,
          })}
          imageCaption={captionElement({
            caption: props.images[photoIndex].caption,
          })}
          mainSrc={props.images[photoIndex].image}
          nextSrc={props.images[(photoIndex + 1) % props.images.length].image}
          prevSrc={
            props.images[
              (photoIndex + props.images.length - 1) % props.images.length
            ].image
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + props.images.length - 1) % props.images.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % props.images.length)
          }
        />
      )}
    </>
  );
}

export default Gallery;
