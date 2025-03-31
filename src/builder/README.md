# Builder Design Pattern

## Overview

The Builder pattern is a creational design pattern that separates the construction of a complex object from its representation. It allows you to create different types and representations of an object using the same construction process.

## Key Components

### 1. Builder Interface

Defines the steps required to build a product, with methods for each construction step.

### 2. Concrete Builders

Implement the Builder interface, providing specific implementations for the building steps and maintaining a product instance.

### 3. Product

The complex object being built.

### 4. Director

Defines the order in which to call construction steps, allowing for the creation of different product variations.

## Why Pass Builders to the Director Instead of Instantiating Internally?

In our implementation, builders are passed as parameters to the director's methods rather than being instantiated within the director. This approach offers several advantages:

### 1. Dependency Injection

By injecting the builder as a parameter, we follow the dependency injection principle, which improves code flexibility and testability.

### 2. Flexibility

Clients can control which specific builder instance to use, allowing for pre-configuration or reuse of builders.

```typescript
// Client code has control over which builder to use
const customBuilder = new ModernHouseBuilder().setFoundation(
	'Special Custom Foundation',
);
const house = director.constructFullFeaturedModernHouse(customBuilder);
```

### 3. Testability

During testing, we can easily provide mock builders to the director without modifying its code.

### 4. Reusability

The same builder instance can potentially be reused across multiple construction processes.

### 5. Customization

Clients can customize the builder before passing it to the director, adding steps or configurations not covered by the director's methods.

### 6. Adhering to SOLID Principles

This approach follows the Dependency Inversion Principle, depending on abstractions rather than concrete implementations.

## Comparison with Internal Instantiation

If the director instantiated builders internally:

```typescript
// Director instantiates the builder internally
createFullFeaturedModernHouse(): ModernHouse {
  const builder = new ModernHouseBuilder();
  return builder
    .setFoundation('Concrete Slab')
    .setStructure('Steel Frame')
    .setRoof('Flat Roof')
    .addSmartHomeTechnology()
    .addOpenFloorPlan()
    .addMinimalDesign()
    .build();
}
```

This approach:

- Creates tight coupling between the director and specific builder implementations
- Makes it difficult to use customized builders
- Reduces testability since you cannot inject mock builders
- Limits flexibility and reusability

## Example Use Case

Our example demonstrates building different types of houses (Modern, Traditional, Eco-Friendly) using specific builders. The director defines common construction sequences, while concrete builders handle the specific implementation details for each house type.

## Running the Example

The TypeScript implementation of the Builder pattern can be executed to see different house types being created both directly with builders and through the director:

```typescript
BuilderPattern.runExample();
```
