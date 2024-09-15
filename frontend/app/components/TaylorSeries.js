"use client";

"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function TaylorSeries() {
    const [funcChoice, setFuncChoice] = useState("1");
    const [x0, setX0] = useState(0);
    const [nTerms, setNTerms] = useState(5);
    const [plotData, setPlotData] = useState(null);

    const handleCalculate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/taylor_series', {
                func_choice: parseInt(funcChoice, 10),
                x0: parseFloat(x0),
                n_terms: parseInt(nTerms, 10),
            });

            setPlotData(response.data);
        } catch (error) {
            console.error("Error al obtener los datos del servidor:", error);
        }
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">

                <p>
                    Ingresa la cantidad de términos de la expansión, el punto de expansión y la función a representar y nosotros gráficamos la función original y la aproximación de Taylor.
                </p>
                <div className="flex flex-col py-12 lg:flex-row gap-6">
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Calculadora de Series de Taylor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCalculate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="function">Función:</Label>
                                    <Select
                                        value={funcChoice}
                                        onValueChange={setFuncChoice}
                                    >
                                        <SelectTrigger id="function">
                                            <SelectValue placeholder="Selecciona una función" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">sin(x)</SelectItem>
                                            <SelectItem value="2">cos(x)</SelectItem>
                                            <SelectItem value="3">exp(x)</SelectItem>
                                            <SelectItem value="4">log(x)</SelectItem>
                                            <SelectItem value="5">x^2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="x0">Punto de expansión (x0):</Label>
                                    <Input
                                        id="x0"
                                        type="number"
                                        value={x0}
                                        onChange={(e) => setX0(Number(e.target.value))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nTerms">Número de términos:</Label>
                                    <Input
                                        id="nTerms"
                                        type="number"
                                        value={nTerms}
                                        onChange={(e) => setNTerms(Number(e.target.value))}
                                    />
                                </div>

                                <Button type="submit" className="w-full">Calcular</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="flex-1">
                        <CardContent className="pt-6">
                            {plotData ? (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">Gráfico de la función original y la aproximación de Taylor</h2>
                                    <Plot
                                        data={[
                                            {
                                                x: plotData.x_vals,
                                                y: plotData.original_vals,
                                                type: 'scatter',
                                                mode: 'lines',
                                                name: 'Función Original',
                                                line: { color: 'blue' }
                                            },
                                            {
                                                x: plotData.x_vals,
                                                y: plotData.taylor_vals,
                                                type: 'scatter',
                                                mode: 'lines',
                                                name: `Aproximación de Taylor (${nTerms} términos)`,
                                                line: { color: 'red', dash: 'dash' }
                                            },
                                        ]}
                                        layout={{
                                            title: `Aproximación de Taylor para la función seleccionada`,
                                            xaxis: { title: 'x' },
                                            yaxis: { title: 'y' },
                                            autosize: true,
                                            margin: { l: 50, r: 50, b: 50, t: 50, pad: 4 }
                                        }}
                                        config={{ responsive: true, displayModeBar: false }}
                                        style={{ width: '100%', height: '450px' }}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500 text-center">El gráfico aparecerá aquí después de calcular</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}