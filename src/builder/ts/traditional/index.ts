// Traditional Object-Oriented approach to Builder Pattern

export namespace TraditionalBuilderPattern {
	// Product class
	class House {
		protected foundation: string = '';
		protected structure: string = '';
		protected roof: string = '';

		setFoundation(foundation: string): void {
			this.foundation = foundation;
		}

		setStructure(structure: string): void {
			this.structure = structure;
		}

		setRoof(roof: string): void {
			this.roof = roof;
		}

		describe(): void {
			console.log('House Specifications (Traditional OOP Variant):');
			console.log(`- Foundation: ${this.foundation}`);
			console.log(`- Structure: ${this.structure}`);
			console.log(`- Roof: ${this.roof}`);
		}
	}

	// Concrete product class
	class ModernHouse extends House {
		private smartHome: boolean = false;
		private openFloorPlan: boolean = false;
		private minimalDesign: boolean = false;

		setSmartHome(smartHome: boolean): void {
			this.smartHome = smartHome;
		}

		setOpenFloorPlan(openFloorPlan: boolean): void {
			this.openFloorPlan = openFloorPlan;
		}

		setMinimalDesign(minimalDesign: boolean): void {
			this.minimalDesign = minimalDesign;
		}

		override describe(): void {
			console.log('Modern House Specifications (Traditional OOP Variant):');
			console.log(`- Foundation: ${this.foundation}`);
			console.log(`- Structure: ${this.structure}`);
			console.log(`- Roof: ${this.roof}`);
			console.log(`- Smart Home: ${this.smartHome ? 'Yes' : 'No'}`);
			console.log(`- Open Floor Plan: ${this.openFloorPlan ? 'Yes' : 'No'}`);
			console.log(`- Minimal Design: ${this.minimalDesign ? 'Yes' : 'No'}`);
		}
	}

	// Abstract Builder
	export abstract class HouseBuilder {
		protected house: House;

		abstract buildFoundation(): this;
		abstract buildStructure(): this;
		abstract buildRoof(): this;

		getHouse(): House {
			return this.house;
		}
	}

	// Concrete Builder
	export class ModernHouseBuilder extends HouseBuilder {
		constructor() {
			super();
			this.house = new ModernHouse();
		}

		buildFoundation(): this {
			this.house.setFoundation('Concrete Slab');
			return this;
		}

		buildStructure(): this {
			this.house.setStructure('Steel Frame');
			return this;
		}

		buildRoof(): this {
			this.house.setRoof('Flat Roof');
			return this;
		}

		addSmartHomeTechnology(): this {
			(this.house as ModernHouse).setSmartHome(true);
			return this;
		}

		addOpenFloorPlan(): this {
			(this.house as ModernHouse).setOpenFloorPlan(true);
			return this;
		}

		addMinimalDesign(): this {
			(this.house as ModernHouse).setMinimalDesign(true);
			return this;
		}
	}

	// Director
	export class HouseDirector {
		private builder: HouseBuilder;

		constructor(builder: HouseBuilder) {
			this.builder = builder;
		}

		changeBuilder(builder: HouseBuilder): void {
			this.builder = builder;
		}

		buildMinimalHouse(): House {
			return this.builder.buildFoundation().buildRoof().getHouse();
		}
	}

	// Example runner function
	export function runExample(): void {
		const modernHouseBuilder = new ModernHouseBuilder();
		const director = new HouseDirector(modernHouseBuilder);

		// Create a basic house with director
		const basicHouse = director.buildMinimalHouse();
		basicHouse.describe();

		// Create a fully-featured house directly with the builder
		const fullFeaturedHouse = modernHouseBuilder
			.buildFoundation()
			.buildStructure()
			.buildRoof()
			.addSmartHomeTechnology()
			.addOpenFloorPlan()
			.addMinimalDesign()
			.getHouse();

		console.log('\nNow building a full-featured house:');
		fullFeaturedHouse.describe();
	}
}

// Execute the example
TraditionalBuilderPattern.runExample();
