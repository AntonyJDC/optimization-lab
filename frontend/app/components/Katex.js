import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Katex = ({ expression }) => {
    const html = katex.renderToString(expression, {
        throwOnError: false,
    });

    return (
        <div className="py-5 text-center" aria-label="Función de costo">
            <p dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default Katex;