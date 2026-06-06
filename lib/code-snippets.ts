export type Language = "javascript" | "python" | "typescript" | "cpp" | "java" | "php"
export type Difficulty = "beginner" | "intermediate" | "pro"

export interface CodeSnippet {
  id: string
  language: Language
  difficulty: Difficulty
  title: string
  code: string
  description: string
}

export const codeSnippets: CodeSnippet[] = [
  // JavaScript - Beginner
  {
    id: "js-1",
    language: "javascript",
    difficulty: "beginner",
    title: "Hello World",
    code: `function greet(name) {
  return "Hello, " + name + "!";
}

const message = greet("World");
console.log(message);`,
    description: "Basic function declaration and string concatenation",
  },
  {
    id: "js-2",
    language: "javascript",
    difficulty: "beginner",
    title: "Array Sum",
    code: `function sum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}`,
    description: "Calculate sum of array elements using for loop",
  },
  // JavaScript - Intermediate
  {
    id: "js-3",
    language: "javascript",
    difficulty: "intermediate",
    title: "Array Filter",
    code: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];

const adults = users.filter(user => user.age >= 18);
console.log(adults);`,
    description: "Filter array using arrow functions",
  },
  {
    id: "js-4",
    language: "javascript",
    difficulty: "intermediate",
    title: "Async Function",
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}`,
    description: "Async/await with error handling",
  },
  // JavaScript - Pro
  {
    id: "js-5",
    language: "javascript",
    difficulty: "pro",
    title: "Debounce Function",
    code: `function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log("Searching:", query);
}, 300);`,
    description: "Implement debounce utility function",
  },
  // Python - Beginner
  {
    id: "py-1",
    language: "python",
    difficulty: "beginner",
    title: "Hello World",
    code: `def greet(name):
    return f"Hello, {name}!"

message = greet("World")
print(message)`,
    description: "Basic function with f-string formatting",
  },
  {
    id: "py-2",
    language: "python",
    difficulty: "beginner",
    title: "List Operations",
    code: `numbers = [1, 2, 3, 4, 5]
squared = [x ** 2 for x in numbers]
print(squared)

total = sum(numbers)
print(f"Sum: {total}")`,
    description: "List comprehension and built-in functions",
  },
  // Python - Intermediate
  {
    id: "py-3",
    language: "python",
    difficulty: "intermediate",
    title: "Dictionary Comprehension",
    code: `students = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

grade_book = {
    name: score for name, score in zip(students, scores)
}

for name, score in grade_book.items():
    print(f"{name}: {score}")`,
    description: "Dictionary comprehension with zip",
  },
  // Python - Pro
  {
    id: "py-4",
    language: "python",
    difficulty: "pro",
    title: "Decorator Pattern",
    code: `def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done"`,
    description: "Creating a timing decorator",
  },
  // TypeScript - Beginner
  {
    id: "ts-1",
    language: "typescript",
    difficulty: "beginner",
    title: "Type Annotations",
    code: `interface User {
  name: string;
  age: number;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
};`,
    description: "Basic interface and type annotations",
  },
  // TypeScript - Intermediate
  {
    id: "ts-2",
    language: "typescript",
    difficulty: "intermediate",
    title: "Generic Function",
    code: `function identity<T>(value: T): T {
  return value;
}

function mapArray<T, U>(
  arr: T[],
  fn: (item: T) => U
): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const doubled = mapArray(numbers, (n) => n * 2);`,
    description: "Generic functions with type parameters",
  },
  // TypeScript - Pro
  {
    id: "ts-3",
    language: "typescript",
    difficulty: "pro",
    title: "Utility Types",
    code: `type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Omit<User, "password">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;

function updateUser(
  id: number,
  updates: UserUpdate
): Promise<PublicUser> {
  // Implementation
  return Promise.resolve({} as PublicUser);
}`,
    description: "Advanced TypeScript utility types",
  },
  // C++ - Beginner
  {
    id: "cpp-1",
    language: "cpp",
    difficulty: "beginner",
    title: "Hello World",
    code: `#include <iostream>
#include <string>

int main() {
    std::string name = "World";
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}`,
    description: "Basic C++ program structure",
  },
  // C++ - Intermediate
  {
    id: "cpp-2",
    language: "cpp",
    difficulty: "intermediate",
    title: "Vector Operations",
    code: `#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> nums = {5, 2, 8, 1, 9};
    
    std::sort(nums.begin(), nums.end());
    
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    return 0;
}`,
    description: "STL vectors and algorithms",
  },
  // Java - Beginner
  {
    id: "java-1",
    language: "java",
    difficulty: "beginner",
    title: "Hello World",
    code: `public class Main {
    public static void main(String[] args) {
        String name = "World";
        System.out.println("Hello, " + name + "!");
    }
}`,
    description: "Basic Java program structure",
  },
  // Java - Intermediate
  {
    id: "java-2",
    language: "java",
    difficulty: "intermediate",
    title: "Stream API",
    code: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);
        
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .filter(n -> n > 4)
            .collect(Collectors.toList());
    }
}`,
    description: "Java Stream API with lambdas",
  },
  // PHP - Beginner
  {
    id: "php-1",
    language: "php",
    difficulty: "beginner",
    title: "Hello World",
    code: `<?php
function greet($name) {
    return "Hello, " . $name . "!";
}

$message = greet("World");
echo $message;
?>`,
    description: "Basic PHP function",
  },
  // PHP - Intermediate
  {
    id: "php-2",
    language: "php",
    difficulty: "intermediate",
    title: "Array Functions",
    code: `<?php
$users = [
    ["name" => "Alice", "age" => 25],
    ["name" => "Bob", "age" => 17],
    ["name" => "Charlie", "age" => 30]
];

$adults = array_filter($users, function($user) {
    return $user["age"] >= 18;
});

print_r($adults);
?>`,
    description: "PHP array filtering with callbacks",
  },
]

export function getSnippetsByLanguage(language: Language): CodeSnippet[] {
  return codeSnippets.filter((s) => s.language === language)
}

export function getSnippetsByDifficulty(difficulty: Difficulty): CodeSnippet[] {
  return codeSnippets.filter((s) => s.difficulty === difficulty)
}

export function getFilteredSnippets(
  language?: Language,
  difficulty?: Difficulty
): CodeSnippet[] {
  return codeSnippets.filter((s) => {
    if (language && s.language !== language) return false
    if (difficulty && s.difficulty !== difficulty) return false
    return true
  })
}

export function getRandomSnippet(
  language?: Language,
  difficulty?: Difficulty
): CodeSnippet {
  const filtered = getFilteredSnippets(language, difficulty)
  return filtered[Math.floor(Math.random() * filtered.length)]
}
