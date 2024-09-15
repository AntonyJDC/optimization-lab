import time
import psutil
from scipy.sparse import coo_matrix

class SparseMatrixCOO:
    def __init__(self, rows, cols, values):
        self.rows = rows
        self.cols = cols
        self.values = values

    def to_dense(self, shape):
        dense_matrix = [[0 for _ in range(shape[1])] for _ in range(shape[0])]
        for r, c, v in zip(self.rows, self.cols, self.values):
            dense_matrix[r][c] = v
        return dense_matrix

def generate_large_sparse_matrix(size, non_zero_elements):
    import random
    rows = []
    cols = []
    values = []
    
    for _ in range(non_zero_elements):
        row = random.randint(0, size - 1)
        col = random.randint(0, size - 1)
        value = random.randint(1, 100)
        rows.append(row)
        cols.append(col)
        values.append(value)
    
    return rows, cols, values

def compare_with_scipy():
    size = 5000  
    non_zero_elements = 10000 
    rows, cols, values = generate_large_sparse_matrix(size, non_zero_elements)

    # Medición de tiempo y memoria para tu implementación (COO)
    my_coo = SparseMatrixCOO(rows, cols, values)
    start_time = time.time()
    my_coo_dense = my_coo.to_dense((size, size))
    my_coo_time = time.time() - start_time
    my_coo_memory = psutil.Process().memory_info().rss / (1024 ** 2)

    # Medición de tiempo y memoria para Scipy COO
    start_time = time.time()
    scipy_coo = coo_matrix((values, (rows, cols)), shape=(size, size))
    scipy_coo_dense = scipy_coo.toarray()
    scipy_coo_time = time.time() - start_time
    scipy_coo_memory = psutil.Process().memory_info().rss / (1024 ** 2)

    # Comparativa
    comparison = {
        "my_coo": my_coo_dense,
        "scipy_coo": scipy_coo_dense.tolist(),
        "time_my_coo": my_coo_time,
        "time_scipy_coo": scipy_coo_time,
        "memory_my_coo": my_coo_memory,
        "memory_scipy_coo": scipy_coo_memory
    }

    return comparison
