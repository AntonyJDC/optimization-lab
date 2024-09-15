from flask import Flask, jsonify, request
from flask_cors import CORS
from optimization import calculate_feasible_region_and_optimal_solution, calculate_cost
from sparse_matrix import compare_with_scipy
from taylor_series import calculate_taylor_series
from optimization_algorithms import optimize_method
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/calculate-cost', methods=['POST'])
def cost():
    data = request.get_json()
    x = data.get('x', 0)
    y = data.get('y', 0)
    cost_value = calculate_cost(x, y)
    return jsonify({'cost': cost_value})

@app.route('/update-restrictions', methods=['POST'])
def update_restrictions():
    data = request.get_json()
    
    a = data.get('a', 10)
    b = data.get('b', 20)
    c = data.get('c', 500)
    d = data.get('d', 40)

    result = calculate_feasible_region_and_optimal_solution(a, b, c, d)

    return jsonify(result)

@app.route('/compare_sparse', methods=['GET'])
def compare_sparse_matrices():
    comparison = compare_with_scipy()
    
    return jsonify(comparison)

@app.route('/taylor_series', methods=['POST'])
def get_taylor_series():
    data = request.get_json()

    # Obtener los parámetros
    func_choice = data.get('func_choice')
    n = int(data.get('n_terms'))
    x0 = float(data.get('x0'))

    try:
        # Llamar a la función que calcula la serie de Taylor
        x_vals, original_func, approx_func = calculate_taylor_series(func_choice, x0, n)

        # Retornar los datos en formato JSON
        return jsonify({
            'x_vals': x_vals.tolist(),
            'original_vals': original_func.tolist(),
            'taylor_vals': approx_func.tolist()
        })
    except ValueError as e:
        return jsonify({'error': str(e)})
    
    
@app.route('/optimize', methods=['GET'])
def optimize():
    x0 = np.array([2, 2])  # Punto inicial
    options = {'maxiter': 1000, 'disp': False}
    methods = ['BFGS', 'Newton-CG', 'Powell']

    results = {}

    for method in methods:
        res, duration = optimize_method(method, x0, options)
        results[method] = {
            'result': res.fun,
            'point_opt': res.x.tolist(),
            'iterations': res.nit,
            'time': duration
        }

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
