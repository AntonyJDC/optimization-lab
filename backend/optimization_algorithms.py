import numpy as np
from scipy.optimize import minimize
import time

# Definir la función objetivo para minimizar
def objective_function(x):
    return x[0]**2 + x[1]**2 + 3*np.sin(x[0]) + 2*np.cos(x[1])

# Derivadas (Jacobian) de la función objetivo
def jacobian(x):
    return np.array([2*x[0] + 3*np.cos(x[0]), 2*x[1] - 2*np.sin(x[1])])

# Función para aplicar los diferentes métodos de optimización
def optimize_method(method, x0, options):
    start_time = time.time()
    if method == 'Newton-CG':
        result = minimize(objective_function, x0, method=method, jac=jacobian, options=options)
    else:
        result = minimize(objective_function, x0, method=method, options=options)
    end_time = time.time()
    duration = end_time - start_time
    return result, duration
