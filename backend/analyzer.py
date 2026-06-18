import ast


class ComplexityVisitor(ast.NodeVisitor):
    def __init__(self):
        self.functions = 0
        self.loops = 0
        self.conditions = 0

        self.current_depth = 0
        self.max_depth = 0

    def update_depth(self):
        self.max_depth = max(self.max_depth, self.current_depth)

    def visit_FunctionDef(self, node):
        self.functions += 1

        self.current_depth += 1
        self.update_depth()

        self.generic_visit(node)

        self.current_depth -= 1

    def visit_For(self, node):
        self.loops += 1

        self.current_depth += 1
        self.update_depth()

        self.generic_visit(node)

        self.current_depth -= 1

    def visit_While(self, node):
        self.loops += 1

        self.current_depth += 1
        self.update_depth()

        self.generic_visit(node)

        self.current_depth -= 1

    def visit_If(self, node):
        self.conditions += 1

        self.current_depth += 1
        self.update_depth()

        self.generic_visit(node)

        self.current_depth -= 1


def calculate_score(functions, loops, conditions, depth):
    score = (
        functions * 1
        + loops * 2
        + conditions * 2
        + depth * 3
    )

    return min(score, 10)


def generate_suggestions(functions, loops, conditions, depth):
    suggestions = []

    if depth > 3:
        suggestions.append(
            "Reduce nesting depth by extracting helper functions."
        )

    if loops > 3:
        suggestions.append(
            "Too many loops detected. Consider optimizing iterations."
        )

    if functions <= 1:
        suggestions.append(
            "Break code into smaller reusable functions."
        )

    if conditions > 5:
        suggestions.append(
            "Too many conditional branches. Consider refactoring."
        )

    if not suggestions:
        suggestions.append(
            "Code structure looks good."
        )

    return suggestions


def analyze_code(code: str):
    try:
        tree = ast.parse(code)

        visitor = ComplexityVisitor()
        visitor.visit(tree)

        score = calculate_score(
            visitor.functions,
            visitor.loops,
            visitor.conditions,
            visitor.max_depth
        )

        suggestions = generate_suggestions(
            visitor.functions,
            visitor.loops,
            visitor.conditions,
            visitor.max_depth
        )

        return {
            "functions": visitor.functions,
            "loops": visitor.loops,
            "conditions": visitor.conditions,
            "nesting_depth": visitor.max_depth,
            "complexity_score": score,
            "suggestions": suggestions
        }

    except SyntaxError:
        return {
            "error": "Invalid Python code."
        }