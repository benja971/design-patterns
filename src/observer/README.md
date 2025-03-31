# Observer Pattern

## Overview

The Observer pattern defines a one-to-many dependency between objects so that when one object (the subject/publisher) changes state, all its dependents (observers/subscribers) are notified and updated automatically. This pattern is a key component in implementing distributed event handling systems.

## Purpose

- Defines a one-to-many dependency between objects
- Promotes loose coupling between publishers and subscribers
- Allows sending notifications to multiple objects without making assumptions about recipient objects
- Supports broadcast communication

## Components

### Publisher/Subject

- Maintains a list of subscribers/observers
- Provides methods to add and remove subscribers
- Notifies subscribers of state changes

### Subscribers/Observers

- Define an update interface/method that gets called when the subject's state changes
- Can receive notifications with or without details about the change

## Implementation

The TypeScript implementation in this project demonstrates:

- Generic interfaces for both Publisher and Subscriber with type parameters
- Methods for subscribing, unsubscribing, and notifying subscribers
- State management in the Publisher
- Both basic and detailed notification mechanisms

## Example Usage

```typescript
// Create subscribers
const subscriber1 = new ConcreteSubscriber('Subscriber 1');
const subscriber2 = new ConcreteSubscriber('Subscriber 2');

// Create publisher and add subscribers
const publisher = new ConcretePublisher();
publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

// Update publisher state - all subscribers will be notified
publisher.updateState();

// Remove a subscriber
publisher.unsubscribe(subscriber1);
```

## Real-World Applications

- Event management systems
- User interface notifications
- Publish-subscribe messaging systems
- Data binding in MVC/MVVM architectures
- Real-time data monitoring and updates
