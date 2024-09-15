import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Cards() {
  const problems = [
    {
      title: "Two-Variable Optimization",
      description: "Develop a program that allows users to input a cost function and constraints for a two-variable optimization problem. The program should calculate the cost function value for given (x,y) points and visualize how the feasible region changes with constraint modifications.",
    },
    {
      title: "Sparse Matrix Representation",
      description: "Implement a sparse matrix representation method from scratch in Python. Compare your implementation's performance and memory usage with Python's built-in libraries for sparse matrices.",
    },
    {
      title: "Taylor Series Expansion",
      description: "Create a program that implements Taylor series expansion. Users should be able to input the number of terms, expansion point, and choose from at least 5 different functions. The program should display both the original function and its Taylor series approximation graphically.",
    },
    {
      title: "Unconstrained Optimization Algorithms",
      description: "Select 3 unconstrained optimization algorithms and analyze how changes in their parameters and initial points affect the results, convergence time, and number of iterations. Use Python libraries and provide graphical or tabular support for your conclusions.",
    },
  ]

  return (
    <div className="mx-auto px-5 mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problems.map((problem, index) => (
          <Card key={index} className="flex flex-col hover:border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 font-bold">{problem.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-gray-600">{problem.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}