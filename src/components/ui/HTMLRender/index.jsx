'use client';
import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

const HTMLRender = ({ htmlString, className }) => {
    const cleanHTML = useMemo(() => sanitizeHtml(htmlString), [htmlString]);

    return <div className={className}>{parse(cleanHTML)}</div>;
};

export default HTMLRender;
