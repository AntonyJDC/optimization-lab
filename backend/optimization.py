import numpy as np
from scipy.optimize import linprog


def calculate_feasible_region_and_optimal_solution(a=10, b=20, c=500, d=40):
    # Calcular la región factible
    x = np.linspace(0, 40, 100)

    # Primera restricción modificada: aX + bY >= c
    y_restriction_1 = (c - a * x) / b
    y_restriction_1[y_restriction_1 < 0] = 0  # Asegura que Y no sea negativo

    # Segunda restricción modificada: X + Y <= d
    y_restriction_2 = d - x

    # Resolver el problema de optimización (calcular la solución óptima)
    c_obj = [150 * 300, 200 * 300]  # Función de costo para minimizar el costo

    # Coeficientes de las restricciones
    A = [
        [-a, -b],  # aX + bY >= c => -aX - bY <= -c
        [1, 1]     # X + Y <= d
    ]
    b_ub = [-c, d]  # Lado derecho de las restricciones

    # Limites de las variables: X >= 0 y Y >= 0
    x_bounds = (0, None)
    y_bounds = (0, None)

    # Resolver el problema de programación lineal
    result = linprog(c=c_obj, A_ub=A, b_ub=b_ub, bounds=[x_bounds, y_bounds], method='highs')

    # Obtener la solución óptima
    if result.success:
        x_optimal = result.x[0]
        y_optimal = result.x[1]
        min_cost = result.fun  # El valor de la función objetivo minimizada
    else:
        x_optimal = None
        y_optimal = None
        min_cost = None

    # Retornar tanto la región factible como la solución óptima
    return {
        "x": x.tolist(),
        "y1": y_restriction_1.tolist(),
        "y2": y_restriction_2.tolist(),
        "x_optimal": x_optimal,
        "y_optimal": y_optimal,
        "min_cost": min_cost
    }

def calculate_cost(x, y):
    return 150 * x * 300 + 200 * y * 300
