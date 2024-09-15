"use client";

import { useEffect, useState } from 'react';
import CodeBlock from './CodeBlock';

export default function SparseMatrix() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Llamar a la API Flask
        fetch('http://127.0.0.1:5000/compare_sparse')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-2xl p-12">Cargando...</div>;
    }

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 text-gray-800">
                <p className='mb-12'>
                    El objetivo de este punto es comparar dos implementaciones del formato COO (Coordinate List) para manejar matrices dispersas: una implementación personalizada y la de la librería optimizada scipy.sparse. 
                    Buscamos medir y analizar las diferencias en tiempo de ejecución y uso de memoria entre ambas implementaciones. Para ellos utilizamos los siguientes códigos:
                </p>
                <CodeBlock />
                <p className='my-8'>
                    Para comparar ambas implementaciones, utilizamos una matriz dispersa de tamaño 5000x5000 y ejecutamos dos bloques de código diferentes. En la implementación personalizada (COO), 
                    definimos una clase que toma los índices de filas, columnas y valores no nulos, y luego genera una matriz densa mediante el método to_dense(), asignando los valores en sus posiciones 
                    correspondientes. En la implementación de scipy.sparse (COO), utilizamos la función coo_matrix para crear la matriz dispersa y convertirla a matriz densa con toarray(). 
                    En ambos casos, medimos el tiempo de ejecución y el uso de memoria para comparar el rendimiento de cada enfoque. <br></br>Estos fueron los resultados obtenidos:
                </p>
                {/* Tabla de comparación */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Implementación</th>
                                <th className="border border-gray-300 px-4 py-2">Tiempo de Ejecución (seg)</th>
                                <th className="border border-gray-300 px-4 py-2">Uso de Memoria (MB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Nuestra Implementación (COO)</td>
                                <td className="border border-gray-300 px-4 py-2">{data.time_my_coo.toFixed(6)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.memory_my_coo.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Scipy Implementación (COO)</td>
                                <td className="border border-gray-300 px-4 py-2">{data.time_scipy_coo.toFixed(6)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.memory_scipy_coo.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
