# Design Patterns Implementation

A comprehensive collection of software design pattern implementations in TypeScript and other languages.

## Overview

This repository contains practical implementations of common software design patterns, helping developers understand how to apply these patterns in real-world scenarios. Each pattern is thoroughly documented with examples and use cases.

## Patterns Included

### Creational Patterns

- [ ] Abstract Factory
- [x] Builder
- [ ] Factory Method
- [ ] Prototype
- [ ] Singleton

### Structural Patterns

- [ ] Adapter
- [ ] Bridge
- [ ] Composite
- [ ] Decorator
- [ ] Facade
- [ ] Flyweight
- [ ] Proxy

### Behavioral Patterns

- [ ] Chain of Responsibility
- [ ] Command
- [ ] Interpreter
- [ ] Iterator
- [ ] Mediator
- [ ] Memento
- [ ] Observer
- [ ] State
- [ ] Strategy
- [ ] Template Method
- [ ] Visitor

## Project Structure

```
.
├── src/
│   ├── builder/
│   │   ├── ts/       							# TypeScript implementation
│   │   │   └── variant1/
│   │   │       ├── index.ts					# Source code
│   │   │       └── ...       					# Other files
│   │   └── python/     						# Python implementation
│   │       ├── variant1/
│   │       │   ├── main.py						# Source code
│   │       │   └── ...       					# Other files
│   │       └── variant2/
│   │           ├── main.py						# Source code
│   │           └── ...       					# Other files
│   ├── ...           							# Other patterns
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- TypeScript (v4 or later)

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/design-patterns.git
cd design-patterns
```

Install dependencies:

```bash
npm install
```

### Running Examples

To run a specific pattern example:

```bash
# For TypeScript examples
npx ts-node src/[pattern]/ts/[variant]/index.ts

# Example for Builder pattern
npx ts-node src/builder/ts/functional/index.ts
```

## Builder Pattern

The Builder pattern allows for the step-by-step construction of complex objects using the correct sequence of actions. The construction is controlled by a director object that only needs to know the type of object it is to create.

### Implementation Details

Our implementation features:

- Abstract `House` base class
- Concrete house types (Modern, Traditional, Eco-Friendly)
- Builder interface and concrete builders
- Director class to create pre-configured objects

### Usage Example

```typescript
// Create builders
const modernBuilder = new ModernHouseBuilder();
const traditionalBuilder = new TraditionalHouseBuilder();
const ecoBuilder = new EcoFriendlyHouseBuilder();

// Use the director
const director = new HouseDirector();
const modernHouse = director.constructFullFeaturedModernHouse(
	new ModernHouseBuilder(),
);
const traditionalHouse = director.constructFullFeaturedTraditionalHouse(
	new TraditionalHouseBuilder(),
);

// Or configure manually
const customEcoHouse = ecoBuilder
	.setFoundation('Recycled Concrete')
	.setStructure('Sustainable Timber')
	.setRoof('Green Roof')
	.addSolarPanels()
	.build();

// Display house details
modernHouse.describe();
traditionalHouse.describe();
customEcoHouse.describe();
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-pattern`)
3. Commit your changes (`git commit -m 'Add some amazing pattern'`)
4. Push to the branch (`git push origin feature/amazing-pattern`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or suggestions, please contact [me](mailto:nddm.benjamin@gmail.com)

## Acknowledgments

- "Design Patterns: Elements of Reusable Object-Oriented Software" by Gang of Four
- Modern TypeScript best practices
