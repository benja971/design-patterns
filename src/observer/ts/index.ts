export namespace ObserverPattern {
	/**
	 * Subscriber (Observer) interface that defines how observers receive updates
	 */
	interface Subscriber<T = void> {
		update(): void;
		updateWithDetails(details: T): void;
	}

	/**
	 * Publisher (Subject) interface that defines core notification mechanism
	 */
	interface Publisher<T = void> {
		notifySubscribers(): void;
		subscribe(subscriber: Subscriber<T>): void;
		unsubscribe(subscriber: Subscriber<T>): void;
	}

	class ConcreteSubscriber implements Subscriber<number> {
		private readonly name: string;

		constructor(name: string = 'Anonymous') {
			this.name = name;
		}

		update(): void {
			console.log(
				`[${this.name}] Can now react to the publisher state changes`,
			);
		}

		updateWithDetails(details: number) {
			console.log(
				`[${this.name}] Can now get some details from the publisher: ${details}`,
			);
		}
	}

	class ConcretePublisher implements Publisher<number> {
		private readonly subscribers: Subscriber<number>[] = [];
		private mainState: number = 0;

		notifySubscribers(): void {
			console.log('Notifying subscribers');

			this.subscribers.forEach((s: Subscriber<number>) => s.update());
		}

		subscribe(subscriber: Subscriber<number>): void {
			const index = this.subscribers.indexOf(subscriber);

			if (index !== -1) {
				console.warn('Subscriber already subscribed');
				return;
			}

			console.log('New subscriber added');
			this.subscribers.push(subscriber);
		}

		unsubscribe(subscriber: Subscriber<number>): void {
			const index = this.subscribers.indexOf(subscriber);

			if (index === -1) {
				console.warn('Subscriber not subscribed');
				return;
			}

			console.log('Subscriber removed');
			this.subscribers.splice(index, 1);
		}

		updateState(): void {
			this.mainState++;
			console.log('Publisher state updated');

			this.notifySubscribers();
			this.notifySubscribersWithDetails();
		}

		notifySubscribersWithDetails(): void {
			console.log('Notifying subscribers with details');
			this.subscribers.forEach((s: Subscriber<number>) =>
				s.updateWithDetails(this.mainState),
			);
		}

		get state(): number {
			return this.mainState;
		}
	}

	export function runExample() {
		const subscriber = new ConcreteSubscriber('Subscriber 1');

		const publisher = new ConcretePublisher();
		publisher.subscribe(subscriber);

		publisher.updateState();

		const subscriber2 = new ConcreteSubscriber('Subscriber 2');
		publisher.subscribe(subscriber2);

		publisher.updateState();
		publisher.updateState();

		publisher.unsubscribe(subscriber);

		publisher.updateState();

		console.log(`Final publisher state: ${publisher.state}`);
	}
}

ObserverPattern.runExample();
