"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

function OptimizationResults() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/optimize')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const methods = Object.keys(data);
    const times = methods.map(method => data[method].time);
    const iterations = methods.map(method => data[method].iterations);

    const tableData = methods.map(method => ({
        method: method,
        result: data[method].result,
        point_opt: data[method].point_opt,
        iterations: data[method].iterations,
        time: data[method].time
    }));

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-6 text-gray-800">
                <div className="flex-1 p-6">
                    <Plot
                        data={[
                            {
                                x: methods,
                                y: times,
                                type: 'bar',
                                name: 'Time (s)',
                                marker: { color: 'red' }
                            },
                            {
                                x: methods,
                                y: iterations,
                                type: 'scatter',
                                mode: 'lines+markers',
                                name: 'Iterations',
                                yaxis: 'y2',
                                marker: { color: 'blue' }
                            }
                        ]}
                        layout={{
                            title: 'Comparación de tiempo de ejecución e iteraciones',
                            yaxis: { title: 'Time (s)', side: 'left' },
                            yaxis2: {
                                title: 'Iterations',
                                overlaying: 'y',
                                side: 'right'
                            },
                            xaxis: { title: 'Method' },
                            plot_bgcolor: "transparent",
                            paper_bgcolor: "transparent"
                        }}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: '100%', height: '450px' }}
                    />

                </div>
                <div className="flex-1 p-6">
                    <p class="mb-4">
                        Comparamos el rendimiento de tres algoritmos de optimización sin restricciones:
                        <strong> BFGS</strong>, <strong>Newton-CG</strong> y <strong>Powell</strong>. Estos algoritmos son herramientas utilizadas para minimizar funciones matemáticas.
                        La función que estamos minimizando en este análisis es una combinación de
                        términos cuadráticos y funciones trigonométricas, lo que proporciona una base para evaluar la efectividad de cada algoritmo.
                    </p>

                    <h3 class="text-lg font-semibold mb-2">Métodos de Comparación</h3>
                    <p class="mb-4">
                        La comparación se basa en dos métricas clave: <strong>tiempo de ejecución</strong> y <strong>número de iteraciones</strong> requeridas para que
                        cada algoritmo alcance una solución óptima. El tiempo de ejecución mide la eficiencia computacional de cada algoritmo,
                        mientras que el número de iteraciones refleja la cantidad de pasos que un algoritmo necesita para converger al mínimo de
                        la función.
                    </p>
                    <p class="mb-4">
                        Para garantizar una comparación justa, cada algoritmo se ejecuta con el mismo punto de inicio y bajo las mismas condiciones.
                        Utilizamos una implementación de la función objetivo y sus derivadas para proporcionar información sobre las pendientes
                        (gradientes) necesarias para algunos de estos algoritmos, como <strong>Newton-CG</strong>.
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Método</th>
                            <th className="border border-gray-300 px-4 py-2">Tiempo de Ejecución (seg)</th>
                            <th className="border border-gray-300 px-4 py-2">iteraciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{row.method}</td>
                                <td className="border border-gray-300 px-4 py-2">{row.time}</td>
                                <td className="border border-gray-300 px-4 py-2">{row.iterations}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='py-8'>
                    <p class="mb-4">
                        Al observar los resultados, podemos notar diferencias significativas en el comportamiento de los algoritmos. El algoritmo
                        <strong> BFGS</strong>, demostró ser relativamente más lento en comparación con los otros dos
                        algoritmos, requirió un aproximado de <strong>20 iteraciones</strong> para converger a una solución. Esto se debe a que BFGS utiliza una aproximación de la matriz Hessiana, lo que puede aumentar el costo computacional, especialmente en funciones más complejas. 
                        Por otro lado,<strong> Newton-CG</strong> mostró un buen equilibrio entre tiempo de ejecución y número de iteraciones, beneficiándose del uso del jacobiano
                        para converger de manera más eficiente.
                    </p>
                    <p class="mb-4">
                        El algoritmo <strong>Powell</strong>, que no utiliza derivadas, fue notablemente rápido en términos de tiempo de ejecución y requirió
                        un aproximado de <strong>3 iteraciones </strong>para encontrar la solución en algunos casos. Esto sugiere que <strong>Powell</strong> puede ser adecuado para funciones
                        donde no se dispone de derivadas o donde las funciones son relativamente sencillas.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OptimizationResults;
