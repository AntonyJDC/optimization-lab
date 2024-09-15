from flask import Flask, jsonify, request
from flask_cors import CORS
from optimization import calculate_feasible_region, calculate_cost, calculate_optimal_solution

app = Flask(__name__)
CORS(app)  # Habilitar CORS en todas las rutas

@app.route('/feasible-region', methods=['GET'])
def feasible_region():
    region = calculate_feasible_region()
    return jsonify(region)

@app.route('/calculate-cost', methods=['POST'])
def cost():
    data = request.get_json()
    x = data.get('x', 0)
    y = data.get('y', 0)
    cost_value = calculate_cost(x, y)
    return jsonify({'cost': cost_value})

@app.route('/optimal-solution', methods=['GET'])
def optimal_solution():
    solution = calculate_optimal_solution()
    return jsonify(solution)

if __name__ == '__main__':
    app.run(debug=True)
