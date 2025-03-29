// Comprehensive Builder Pattern Implementation

export namespace BuilderPattern {
	// Abstract House base class
	abstract class House {
		// Common properties for all houses
		protected foundation: string;
		protected structure: string;
		protected roof: string;

		constructor(foundation: string, structure: string, roof: string) {
			this.foundation = foundation;
			this.structure = structure;
			this.roof = roof;
		}

		abstract describe(): void;
	}

	// Concrete House classes
	class ModernHouse extends House {
		private readonly smartHome: boolean;
		private readonly openFloorPlan: boolean;
		private readonly minimalDesign: boolean;

		constructor(
			foundation: string,
			structure: string,
			roof: string,
			smartHome: boolean = false,
			openFloorPlan: boolean = false,
			minimalDesign: boolean = false,
		) {
			super(foundation, structure, roof);
			this.smartHome = smartHome;
			this.openFloorPlan = openFloorPlan;
			this.minimalDesign = minimalDesign;
		}

		describe(): void {
			console.log('Modern House Specifications:');
			console.log(`- Foundation: ${this.foundation}`);
			console.log(`- Structure: ${this.structure}`);
			console.log(`- Roof: ${this.roof}`);

			if (this.smartHome) console.log('- Smart home technology');
			if (this.openFloorPlan) console.log('- Open floor plan');
			if (this.minimalDesign) console.log('- Minimal design aesthetic');
		}
	}

	class TraditionalHouse extends House {
		private readonly woodenDetails: boolean;
		private readonly fireplace: boolean;
		private readonly formalDiningRoom: boolean;

		constructor(
			foundation: string,
			structure: string,
			roof: string,
			woodenDetails: boolean = false,
			fireplace: boolean = false,
			formalDiningRoom: boolean = false,
		) {
			super(foundation, structure, roof);
			this.woodenDetails = woodenDetails;
			this.fireplace = fireplace;
			this.formalDiningRoom = formalDiningRoom;
		}

		describe(): void {
			console.log('Traditional House Specifications:');
			console.log(`- Foundation: ${this.foundation}`);
			console.log(`- Structure: ${this.structure}`);
			console.log(`- Roof: ${this.roof}`);

			if (this.woodenDetails) console.log('- Wooden architectural details');
			if (this.fireplace) console.log('- Classic fireplace');
			if (this.formalDiningRoom) console.log('- Formal dining room');
		}
	}

	class EcoFriendlyHouse extends House {
		private readonly solarPanels: boolean;
		private readonly rainwaterHarvesting: boolean;
		private readonly energyEfficientInsulation: boolean;

		constructor(
			foundation: string,
			structure: string,
			roof: string,
			solarPanels: boolean = false,
			rainwaterHarvesting: boolean = false,
			energyEfficientInsulation: boolean = false,
		) {
			super(foundation, structure, roof);
			this.solarPanels = solarPanels;
			this.rainwaterHarvesting = rainwaterHarvesting;
			this.energyEfficientInsulation = energyEfficientInsulation;
		}

		describe(): void {
			console.log('Eco-Friendly House Specifications:');
			console.log(`- Foundation: ${this.foundation}`);
			console.log(`- Structure: ${this.structure}`);
			console.log(`- Roof: ${this.roof}`);

			if (this.solarPanels) console.log('- Solar panels installed');
			if (this.rainwaterHarvesting)
				console.log('- Rainwater harvesting system');
			if (this.energyEfficientInsulation)
				console.log('- Energy efficient insulation');
		}
	}

	// Builder interface
	interface HouseBuilder {
		setFoundation(foundation: string): HouseBuilder;
		setStructure(structure: string): HouseBuilder;
		setRoof(roof: string): HouseBuilder;
		build(): House;
	}

	// Concrete Builders
	export class ModernHouseBuilder implements HouseBuilder {
		private foundation: string = '';
		private structure: string = '';
		private roof: string = '';
		private smartHome: boolean = false;
		private openFloorPlan: boolean = false;
		private minimalDesign: boolean = false;

		setFoundation(foundation: string): this {
			this.foundation = foundation;
			return this;
		}

		setStructure(structure: string): this {
			this.structure = structure;
			return this;
		}

		setRoof(roof: string): this {
			this.roof = roof;
			return this;
		}

		addSmartHomeTechnology(): this {
			this.smartHome = true;
			return this;
		}

		addOpenFloorPlan(): this {
			this.openFloorPlan = true;
			return this;
		}

		addMinimalDesign(): this {
			this.minimalDesign = true;
			return this;
		}

		build(): ModernHouse {
			return new ModernHouse(
				this.foundation,
				this.structure,
				this.roof,
				this.smartHome,
				this.openFloorPlan,
				this.minimalDesign,
			);
		}
	}

	export class TraditionalHouseBuilder implements HouseBuilder {
		private foundation: string = '';
		private structure: string = '';
		private roof: string = '';
		private woodenDetails: boolean = false;
		private fireplace: boolean = false;
		private formalDiningRoom: boolean = false;

		setFoundation(foundation: string): this {
			this.foundation = foundation;
			return this;
		}

		setStructure(structure: string): this {
			this.structure = structure;
			return this;
		}

		setRoof(roof: string): this {
			this.roof = roof;
			return this;
		}

		addWoodenDetails(): this {
			this.woodenDetails = true;
			return this;
		}

		addFireplace(): this {
			this.fireplace = true;
			return this;
		}

		addFormalDiningRoom(): this {
			this.formalDiningRoom = true;
			return this;
		}

		build(): TraditionalHouse {
			return new TraditionalHouse(
				this.foundation,
				this.structure,
				this.roof,
				this.woodenDetails,
				this.fireplace,
				this.formalDiningRoom,
			);
		}
	}

	export class EcoFriendlyHouseBuilder implements HouseBuilder {
		private foundation: string = '';
		private structure: string = '';
		private roof: string = '';
		private solarPanels: boolean = false;
		private rainwaterHarvesting: boolean = false;
		private energyEfficientInsulation: boolean = false;

		setFoundation(foundation: string): this {
			this.foundation = foundation;
			return this;
		}

		setStructure(structure: string): this {
			this.structure = structure;
			return this;
		}

		setRoof(roof: string): this {
			this.roof = roof;
			return this;
		}

		addSolarPanels(): this {
			this.solarPanels = true;
			return this;
		}

		addRainwaterHarvesting(): this {
			this.rainwaterHarvesting = true;
			return this;
		}

		addEnergyEfficientInsulation(): this {
			this.energyEfficientInsulation = true;
			return this;
		}

		build(): EcoFriendlyHouse {
			return new EcoFriendlyHouse(
				this.foundation,
				this.structure,
				this.roof,
				this.solarPanels,
				this.rainwaterHarvesting,
				this.energyEfficientInsulation,
			);
		}
	}

	// Director class
	export class HouseDirector {
		constructFullFeaturedModernHouse(builder: ModernHouseBuilder): ModernHouse {
			return builder
				.setFoundation('Concrete Slab')
				.setStructure('Steel Frame')
				.setRoof('Flat Roof')
				.addSmartHomeTechnology()
				.addOpenFloorPlan()
				.addMinimalDesign()
				.build();
		}

		constructFullFeaturedTraditionalHouse(
			builder: TraditionalHouseBuilder,
		): TraditionalHouse {
			return builder
				.setFoundation('Stone')
				.setStructure('Wooden Frame')
				.setRoof('Gabled Shingle')
				.addWoodenDetails()
				.addFireplace()
				.addFormalDiningRoom()
				.build();
		}

		constructFullFeaturedEcoFriendlyHouse(
			builder: EcoFriendlyHouseBuilder,
		): EcoFriendlyHouse {
			return builder
				.setFoundation('Recycled Concrete')
				.setStructure('Sustainable Timber')
				.setRoof('Green Roof')
				.addSolarPanels()
				.addRainwaterHarvesting()
				.addEnergyEfficientInsulation()
				.build();
		}
	}

	// Example runner function
	export function runExample(): void {
		// Usage examples
		console.log('Building different house types:');

		// Create a modern house
		const modernBuilder = new ModernHouseBuilder();
		const modernHouse = modernBuilder
			.setFoundation('Reinforced Concrete')
			.setStructure('Steel and Glass')
			.setRoof('Flat Roof with Skylight')
			.addOpenFloorPlan()
			.addSmartHomeTechnology()
			.build();
		console.log('\nCustom Modern House:');
		modernHouse.describe();

		// Create a traditional house
		const traditionalBuilder = new TraditionalHouseBuilder();
		const traditionalHouse = traditionalBuilder
			.setFoundation('Stone')
			.setStructure('Brick')
			.setRoof('Clay Tiles')
			.addWoodenDetails()
			.addFireplace()
			.build();
		console.log('\nCustom Traditional House:');
		traditionalHouse.describe();

		// Create an eco-friendly house
		const ecoBuilder = new EcoFriendlyHouseBuilder();
		const ecoHouse = ecoBuilder
			.setFoundation('Recycled Materials')
			.setStructure('Bamboo and Reclaimed Wood')
			.setRoof('Living Roof')
			.addSolarPanels()
			.addEnergyEfficientInsulation()
			.build();
		console.log('\nCustom Eco-Friendly House:');
		ecoHouse.describe();

		// Using the director
		const director = new HouseDirector();
		console.log('\nUsing the Director:');

		const fullModernHouse = director.constructFullFeaturedModernHouse(
			new ModernHouseBuilder(),
		);
		console.log('\nFull-Featured Modern House:');
		fullModernHouse.describe();

		const fullTraditionalHouse = director.constructFullFeaturedTraditionalHouse(
			new TraditionalHouseBuilder(),
		);
		console.log('\nFull-Featured Traditional House:');
		fullTraditionalHouse.describe();

		const fullEcoHouse = director.constructFullFeaturedEcoFriendlyHouse(
			new EcoFriendlyHouseBuilder(),
		);
		console.log('\nFull-Featured Eco-Friendly House:');
		fullEcoHouse.describe();
	}
}

// Execute the example
BuilderPattern.runExample();
