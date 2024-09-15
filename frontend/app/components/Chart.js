"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Importamos Plotly.js dinámicamente para evitar problemas de SSR en Next.js
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function Chart() {
    // Estados para los valores del gráfico
    const [xValues, setXValues] = useState([]);
    const [y1Values, setY1Values] = useState([]);
    const [y2Values, setY2Values] = useState([]);
    const [xOptimal, setXOptimal] = useState(null);
    const [yOptimal, setYOptimal] = useState(null);
    const [minCost, setMinCost] = useState(null);
    const [customX, setCustomX] = useState('');
    const [customY, setCustomY] = useState('');
    const [customCosto, setCustomCosto] = useState(null);

    // Estados para los parámetros de las restricciones
    const [a, setA] = useState(10);
    const [b, setB] = useState(20);
    const [c, setC] = useState(500);
    const [d, setD] = useState(40);

    const calcularCosto = async () => {
        try {
            const response = await axios.post('http://localhost:5000/calculate-cost', {
                x: parseFloat(customX),
                y: parseFloat(customY),
            });
            setCustomCosto(response.data.cost);
        } catch (error) {
            console.error('Error calculando el costo:', error);
        }
    };

    const fetchRegionAndOptimalSolution = async (params) => {
        try {
          const response = await axios.post('http://localhost:5000/update-restrictions', params);

          // Imprime la respuesta para ver si está llegando correctamente
            console.log('Respuesta de la API:', response.data);
          
          // Actualizar los valores de la región factible
          setXValues(response.data.x);
          setY1Values(response.data.y1);
          setY2Values(response.data.y2);
          
          // Actualizar los valores óptimos
          setXOptimal(response.data.x_optimal);
          setYOptimal(response.data.y_optimal);
          setMinCost(response.data.min_cost);
          
        } catch (error) {
          console.error('Error fetching region and optimal solution:', error);
        }
      };    

    useEffect(() => {
        const initialParams = { a, b, c, d };
        fetchRegionAndOptimalSolution(initialParams);
    }, []);

    const updateRestrictions = async (event) => {
        event.preventDefault();
        const params = {
          a: parseFloat(a),
          b: parseFloat(b),
          c: parseFloat(c),
          d: parseFloat(d),
        };
        fetchRegionAndOptimalSolution(params);
      };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 p-6">
                    <h2 className="text-xl font-semibold mb-4">Gráfico de Región Factible</h2>
                    <Plot
                        data={[
                            {
                                x: xValues,
                                y: y1Values,
                                type: 'scatter',
                                mode: 'lines',
                                name: `${a}X + ${b}Y ≥ ${c}`,
                                line: { color: 'blue' },
                            },
                            {
                                x: xValues,
                                y: y2Values,
                                type: 'scatter',
                                mode: 'lines',
                                name: `X + Y ≤ ${d}`,
                                line: { color: 'orange' },
                            },
                            {
                                x: xValues,
                                y: y2Values.map((_, i) => Math.min(y1Values[i], y2Values[i])),
                                type: 'scatter',
                                mode: 'none',
                                fill: 'tozeroy',
                                name: 'Región factible',
                                fillcolor: 'rgba(128, 128, 128, 0.5)',
                            },
                            {
                                x: [xOptimal],
                                y: [yOptimal],
                                type: 'scatter',
                                mode: 'markers',
                                name: 'Solución Óptima',
                                marker: { color: 'red', size: 10 },
                            },
                        ]}
                        layout={{
                            title: 'Región Factible y Solución Óptima',
                            xaxis: { title: 'Cantidad de camiones pequeños (X)' },
                            yaxis: { title: 'Cantidad de camiones grandes (Y)', range: [0, 50] },
                        }}
                        config={{ responsive: true, displayModeBar: false }}
                        style={{ width: '100%', height: '450px' }}
                    />
                </div>

                <div className="flex-1 p-6">
                    <h2 className="text-xl font-semibold mb-4">Valores óptimos</h2>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Parámetro</th>
                                <th className="px-4 py-2 text-left">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">X</td>
                                <td className="border px-4 py-2">{xOptimal}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Y</td>
                                <td className="border px-4 py-2">{yOptimal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-xl font-semibold my-4">Costo de transporte</h2>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Parámetro</th>
                                <th className="px-4 py-2 text-left">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Costo Total</td>
                                <td className="border px-1 py-2">{minCost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-xl font-semibold my-4">Más opciones</h2>
                    <div className="flex mt-6 justify-around items-center">
                        {/* Dialog para calcular costo personalizado */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-800 text-white font-normal rounded-2xl hover:bg-gray-950 hover:transition-all">Calcular Costo Personalizado</Button>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold mb-4">Calcular Costo Personalizado</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="number"
                                            placeholder="Valor de X"
                                            value={customX}
                                            onChange={(e) => setCustomX(e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Valor de Y"
                                            value={customY}
                                            onChange={(e) => setCustomY(e.target.value)}
                                            className="p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <Button onClick={calcularCosto} className="bg-gray-800 text-white p-2 rounded hover:bg-gray-950 hover:transition-all font-normal">Calcular costo</Button>
                                    {customCosto !== null && (
                                        <p className="text-lg font-semibold">El costo del transporte es: <span className='text-green-700'>${customCosto}</span></p>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-800 text-white font-normal rounded-2xl hover:bg-gray-950 hover:transition-all">Cambiar Restricciones</Button>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold mb-4">Cambiar Restricciones</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={updateRestrictions} className="grid gap-4">
                                    <p>Toneladas camiones pequeños:</p>
                                    <Input
                                        type="number"
                                        name="a"
                                        value={a}
                                        onChange={(e) => setA(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <p>Toneladas camiones grandes:</p>
                                    <Input
                                        type="number"
                                        name="b"
                                        value={b}
                                        onChange={(e) => setB(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <p>Cantidad minima de toneladas:</p>
                                    <Input
                                        type="number"
                                        name="c"
                                        value={c}
                                        onChange={(e) => setC(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <p>Cantidad maxima de camiones:</p>
                                    <Input
                                        type="number"
                                        name="d"
                                        value={d}
                                        onChange={(e) => setD(e.target.value)}
                                        className="p-2 border border-gray-300 rounded"
                                    />
                                    <Button type="submit" className="bg-gray-800 text-white p-2 rounded hover:bg-gray-950 hover:transition-all font-normal">Actualizar</Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
        </div>
    );
}
