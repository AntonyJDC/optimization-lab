import Chart from './Chart';
import Katex from './Katex';

export default function Optimization() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="space-y-6 text-gray-800">
                    <p>
                        Una empresa de logística desea optimizar su operación de distribución de productos entre dos ciudades,
                        Ciudad A y Ciudad B, minimizando los costos totales de transporte. La empresa cuenta con dos tipos de camiones:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Camiones pequeños (X): Pueden transportar hasta 10 toneladas de productos. El costo por kilómetro recorrido es de 150 euros.</li>
                        <li>Camiones grandes (Y): Pueden transportar hasta 20 toneladas de productos. El costo por kilómetro recorrido es de 200 euros.</li>
                    </ul>
                    <p>
                        Cada semana, la empresa debe transportar al menos 500 toneladas de productos en total entre ambas ciudades,
                        y cada camión pequeño o grande debe recorrer una distancia promedio de 300 km.
                    </p>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Función de costo:</h3>
                    <p>
                        La empresa desea minimizar el costo total de transporte en función de la cantidad de camiones pequeños (X)
                        y camiones grandes (Y) utilizados, de acuerdo con la fórmula:
                    </p>
                    <div className="text-center" aria-label="Función de costo">
                        <Katex expression={`C(X,Y) = 150X \\cdot 300 + 200Y \\cdot 300`} />
                    </div>
                    <h3 className="text-2xl font-semibold mt-8 mb-4">Restricciones:</h3>
                    <ol className="list-decimal pl-6 space-y-4">
                        <li>
                            <p>La cantidad total de productos transportados debe ser de al menos 500 toneladas:</p>
                            <Katex expression={`10X + 20Y \\geq 500`} />
                        </li>
                        <li>
                            <p>La empresa solo dispone de un máximo de 40 camiones (entre pequeños y grandes) cada semana:</p>
                            <Katex expression={`X + Y \\leq 40`} />
                        </li>
                        <li>
                            <p>No se pueden utilizar cantidades negativas de camiones:</p>
                            <Katex expression={`X \\geq 0, Y \\geq 0`} />
                        </li>
                    </ol>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Objetivo:</h3>
                    <p>
                        Determinar cuántos camiones pequeños (X) y cuántos camiones grandes (Y) debe utilizar la empresa
                        para minimizar el costo total de transporte, cumpliendo con las restricciones establecidas.
                    </p>
                    <Chart />
                </div>
            </div>
        </section>
    )
}