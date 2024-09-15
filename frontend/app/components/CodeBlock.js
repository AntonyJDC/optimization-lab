import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const customCode = `
class SparseMatrixCOO:
    def __init__(self, rows, cols, values):
        self.rows = rows
        self.cols = cols
        self.values = values

    def to_dense(self, shape):
        dense_matrix = [[0 for _ in range(shape[1])] for _ in range(shape[0])]
        for r, c, v in zip(self.rows, self.cols, self.values):
            dense_matrix[r][c] = v
        return dense_matrix
`

const scipyCode = `
from scipy.sparse import coo_matrix

# Generación de una matriz dispersa con Scipy
scipy_coo = coo_matrix((values, (rows, cols)), shape=(size, size))
scipy_coo_dense = scipy_coo.toarray()
`
export default function CodeBlock() {

    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Implementación Personalizada (COO)</h3>
                <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    className="rounded-lg shadow-md h-72 overflow-auto"
                >
                    {customCode}
                </SyntaxHighlighter>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Implementación Scipy (COO)</h3>
                <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    className="rounded-lg shadow-md h-72 overflow-auto"
                >
                    {scipyCode}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

