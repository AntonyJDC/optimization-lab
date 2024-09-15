import numpy as np
import sympy as sp

# Funciones disponibles
def f1(x):
    return sp.sin(x)

def f2(x):
    return sp.cos(x)

def f3(x):
    return sp.exp(x)

def f4(x):
    return sp.log(x)

def f5(x):
    return x**2

# Función para obtener los coeficientes de la expansión en series de Taylor
def taylor_series(func, x0, n):
    x = sp.Symbol('x')
    f_sym = func(x)
    series = f_sym.series(x, x0, n).removeO()
    return sp.lambdify(x, series, "numpy")

# Función para obtener las funciones y calcular los valores
def calculate_taylor_series(func_choice, x0, n, a=-10, b=10):
    # Mapear la función seleccionada
    if func_choice == 1:
        func = f1
    elif func_choice == 2:
        func = f2
    elif func_choice == 3:
        func = f3
    elif func_choice == 4:
        func = f4
        a = max(0.1, a)  # Asegurarse de que el rango esté en el dominio válido
    elif func_choice == 5:
        func = f5
    else:
        raise ValueError("Función no válida")

    # Calcular los valores de x
    x_vals = np.linspace(a, b, 400)

    # Calcular la función original
    x_sym = sp.Symbol('x')
    original_func = sp.lambdify(x_sym, func(x_sym), "numpy")(x_vals)

    # Calcular la aproximación de Taylor
    approx_func = taylor_series(func, x0, n)(x_vals)

    return x_vals, original_func, approx_func
