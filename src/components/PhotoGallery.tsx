'use client'

import React, { useEffect, useState } from 'react';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export interface Photo {
    src: string;
    width: number;
    height: number;
}

interface PhotoGalleryProps {
    photos: Photo[];
    overtitle: string;
    heading: string;
}

export default function PhotoGallery({ photos, overtitle, heading }: PhotoGalleryProps) {
    const [index, setIndex] = useState<number>(-1);
    const [width, setWidth] = useState<number>(0);


    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);

    return (
        <div className="">
            <div className="text-center lg:pb-[60px] pb-[40px]">
                <h5 className="section-sub-title-v1">{overtitle}</h5>
                <h2 className="section-title-v1">{heading}</h2>
            </div>
            <PhotoAlbum
                key={width}  // Add key prop to force re-render on width change
                photos={photos}
                layout="masonry"
                columns={width > 768 ? 3 : 1}
                targetRowHeight={150}
                onClick={({ index }) => setIndex(index)}
            />
            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </div>
    );
}
