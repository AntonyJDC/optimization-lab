from flask import Flask, jsonify, request
from flask_cors import CORS
from optimization import calculate_feasible_region_and_optimal_solution, calculate_cost

app = Flask(__name__)
CORS(app)  # Habilitar CORS en todas las rutas

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

    # Llama a la función combinada para obtener tanto la región factible como la solución óptima
    result = calculate_feasible_region_and_optimal_solution(a, b, c, d)

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
