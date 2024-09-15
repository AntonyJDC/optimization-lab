import numpy as np
from scipy.optimize import linprog


def calculate_feasible_region():
    x = np.linspace(0, 40, 1000)
    
    y_restriction_1 = (500 - 10 * x) / 20
    y_restriction_1[y_restriction_1 < 0] = 0 

    y_restriction_2 = 40 - x

    return {
        'x': x.tolist(),
        'y1': y_restriction_1.tolist(),
        'y2': y_restriction_2.tolist()
    }

def calculate_cost(x, y):
    return 150 * x * 300 + 200 * y * 300

def calculate_optimal_solution():
    c = [150 * 300, 200 * 300]

    # Coeficientes de las restricciones
    A = [
        [-10, -20],
        [1, 1]
    ]
    b = [-500, 40]  # Lado derecho de las restricciones

    # Limites de las variables: X >= 0 y Y >= 0
    x_bounds = (0, None)
    y_bounds = (0, None)

    # Resolver el problema de programación lineal
    result = linprog(c, A_ub=A, b_ub=b, bounds=[x_bounds, y_bounds], method='highs')

    if result.success:
        x_optimal = result.x[0]
        y_optimal = result.x[1]
        max_benefit = -result.fun  # La función linprog minimiza, pero necesitamos maximizar
        return {
            'x': x_optimal,
            'y': y_optimal,
            'maxBenefit': max_benefit
        }
    else:
        return {'error': 'No se pudo encontrar una solución óptima'}
