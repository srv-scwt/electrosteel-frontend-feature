'use client';
import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

const HTMLRender = ({ htmlString, className }) => {
    const cleanHTML = useMemo(() => DOMPurify.sanitize(htmlString), [htmlString]);

    return <div className={className}>{parse(cleanHTML)}</div>;
};

export default HTMLRender;