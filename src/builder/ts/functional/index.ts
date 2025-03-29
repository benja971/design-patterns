// Functional approach to Builder Pattern
// Wrap in a namespace/module to isolate from other files

export namespace FunctionalBuilderPattern {
	// House type definition
	type FunctionalHouse = {
		foundation: string;
		structure: string;
		roof: string;
		describe: () => void;
	};

	// Modern House specific properties
	type ModernHouseProps = {
		smartHome?: boolean;
		openFloorPlan?: boolean;
		minimalDesign?: boolean;
	};

	// Modern House type
	type FunctionalModernHouse = FunctionalHouse & ModernHouseProps;

	// Create a functional builder for modern houses
	export function createModernHouseBuilder() {
		const state = {
			foundation: '',
			structure: '',
			roof: '',
			smartHome: false,
			openFloorPlan: false,
			minimalDesign: false,
		};

		const builder = {
			setFoundation: (foundation: string) => {
				state.foundation = foundation;
				return builder;
			},
			setStructure: (structure: string) => {
				state.structure = structure;
				return builder;
			},
			setRoof: (roof: string) => {
				state.roof = roof;
				return builder;
			},
			addSmartHomeTechnology: () => {
				state.smartHome = true;
				return builder;
			},
			addOpenFloorPlan: () => {
				state.openFloorPlan = true;
				return builder;
			},
			addMinimalDesign: () => {
				state.minimalDesign = true;
				return builder;
			},
			build: (): FunctionalModernHouse => ({
				...state,
				describe: () => {
					console.log('Modern House Specifications (Functional Variant):');
					console.log(`- Foundation: ${state.foundation}`);
					console.log(`- Structure: ${state.structure}`);
					console.log(`- Roof: ${state.roof}`);
					console.log(`- Smart Home: ${state.smartHome ? 'Yes' : 'No'}`);
					console.log(
						`- Open Floor Plan: ${state.openFloorPlan ? 'Yes' : 'No'}`,
					);
					console.log(
						`- Minimal Design: ${state.minimalDesign ? 'Yes' : 'No'}`,
					);
				},
			}),
		};

		return builder;
	}

	// Example usage
	export function runExample() {
		// Use the functional builder
		const modernHouseBuilder = createModernHouseBuilder();
		const modernHouse = modernHouseBuilder
			.setFoundation('Concrete')
			.setStructure('Steel Frame')
			.setRoof('Flat')
			.addSmartHomeTechnology()
			.addOpenFloorPlan()
			.addMinimalDesign()
			.build();

		modernHouse.describe();
	}
}

// Execute the example
FunctionalBuilderPattern.runExample();
