// file system is like patternname/languagename/index.ext
// or patternname/languagename/variantname/index.ext for variants
// make a command to run a specific pattern in a specific language thanks to parseArgs
// example: pnpm run start --pattern=singleton --language=ts
// example with variant: pnpm run start --pattern=singleton --language=ts --variant=v2

import { exec } from 'child_process';
import { program } from 'commander';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const executables = new Map<string, string>([
	['ts', 'ts-node'],
	['js', 'node'],
	['py', 'python3'],
	['java', 'java'],
	['go', 'go'],
	['rb', 'ruby'],
	['php', 'php'],
	['csharp', 'dotnet'],
	['cpp', 'g++'],
	['swift', 'swift'],
	['kotlin', 'kotlin'],
	['rust', 'cargo run --release'],
	['dart', 'dart'],
	['html', 'open'], // or use a specific browser command
	['css', 'open'], // or use a specific browser command
]);

const extensions = new Map<string, string>([
	['ts', 'ts'],
	['js', 'js'],
	['py', 'py'],
	['java', 'java'],
	['go', 'go'],
	['rb', 'rb'],
	['php', 'php'],
	['csharp', 'cs'],
	['cpp', 'cpp'],
	['swift', 'swift'],
	['kotlin', 'kt'],
	['rust', 'rs'],
	['dart', 'dart'],
	['html', 'html'],
	['css', 'css'],
]);

// Get list of available patterns by checking directories
function getAvailablePatterns(): string[] {
	try {
		const patternsDir = join(__dirname);
		return readdirSync(patternsDir, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory())
			.filter((dirent) => !dirent.name.startsWith('.')) // Skip hidden directories
			.filter((dirent) => !['node_modules'].includes(dirent.name)) // Skip special directories
			.map((dirent) => dirent.name);
	} catch (error) {
		console.error('Error reading patterns directory:', error);
		return [];
	}
}

// Get supported languages
function getAvailableLanguages(): string[] {
	// exemple path src/builder/ts/index.ts
	// exemple path src/builder/js/index.js
	const patterns = getAvailablePatterns();
	const languages = new Set<string>();

	patterns.forEach((pattern) => {
		try {
			const patternPath = join(__dirname, pattern);
			if (!existsSync(patternPath)) {
				return;
			}

			const folders = readdirSync(patternPath, { withFileTypes: true });
			folders.forEach((folder) => {
				if (folder.isDirectory()) {
					// Only process directories
					const lang = folder.name;
					if (extensions.has(lang)) {
						languages.add(lang);
					}
				}
			});
		} catch (error) {
			// Silently handle errors
		}
	});

	return Array.from(languages);
}

function getCommand(
	pattern: string,
	language: string,
	variant?: string,
): string {
	const executable = executables.get(language);
	if (!executable) {
		throw new Error(`No executable found for language: ${language}`);
	}

	let patternPath: string;
	if (variant) {
		patternPath = join(__dirname, pattern, language, variant);
		// Check if variant exists
		if (!existsSync(patternPath)) {
			throw new Error(
				`Variant '${variant}' not found for pattern '${pattern}' in language '${language}'`,
			);
		}
	} else {
		patternPath = join(__dirname, pattern, language);
	}

	return `${executable} ${patternPath}`;
}

// Function to get available variants for a pattern-language pair
function getAvailableVariants(pattern: string, language: string): string[] {
	try {
		const basePath = join(__dirname, pattern, language);
		if (!existsSync(basePath)) {
			return [];
		}

		const items = readdirSync(basePath, { withFileTypes: true });
		const variants = items
			.filter((item) => item.isDirectory())
			.map((item) => item.name);

		return variants;
	} catch (error) {
		console.error(`Error reading variants for ${pattern}/${language}:`, error);
		return [];
	}
}

// Function to display available patterns and languages
function displayAvailableOptions() {
	const patterns = getAvailablePatterns();
	const allLanguages = Array.from(executables.keys());

	// Filter to only show languages with implementations
	const implementedLanguages = allLanguages.filter((lang) => {
		return patterns.some((pattern) => {
			try {
				const langPath = join(__dirname, pattern, lang);
				if (!existsSync(langPath)) {
					return false;
				}

				const contents = readdirSync(langPath, { withFileTypes: true });
				// Check for index file or subdirectories (variants)
				return contents.some(
					(item) =>
						(item.isFile() && item.name === 'index.' + lang) ||
						item.isDirectory(),
				);
			} catch (error) {
				// Silently handle directory access errors
				return false;
			}
		});
	});

	console.log('Implemented languages:');
	if (implementedLanguages.length > 0) {
		implementedLanguages.forEach((lang) => {
			console.log(`  - ${lang}`);

			// Get patterns implemented for this language
			const implementedPatterns = patterns.filter((pattern) => {
				try {
					const langPath = join(__dirname, pattern, lang);
					return existsSync(langPath);
				} catch (error) {
					return false;
				}
			});

			console.log('  Available design patterns:');
			implementedPatterns.forEach((pattern) => {
				console.log(`  - ${pattern}`);
				console.log(
					`    Example: pnpm run start --pattern=${pattern} --language=${lang}`,
				);

				// Show variants if any
				const variants = getAvailableVariants(pattern, lang);
				if (variants.length > 0) {
					console.log(`    Variants: ${variants.join(', ')}`);
					console.log(
						`    Example with variant: pnpm run start --pattern=${pattern} --language=${lang} --variant=${variants[0]}`,
					);
				}
			});

			console.log(''); // Empty line between languages
		});
	} else {
		console.log('  No implemented languages found');
	}
}

program
	.option('--pattern <type>', 'specify the design pattern')
	.option('--language <type>', 'specify the programming language')
	.option('--variant <type>', 'specify the pattern variant (optional)')
	.option('--list', 'list all available patterns and languages');

program.parse(process.argv);

const options = program.opts();

// Show list if --list is specified or if no options are provided
if (options.list || Object.keys(options).length === 0) {
	displayAvailableOptions();
} else if (options.pattern && options.language) {
	const { pattern, language, variant } = options;

	// Validate pattern exists
	const patterns = getAvailablePatterns();
	if (!patterns.includes(pattern)) {
		console.error(
			`Error: Pattern '${pattern}' not found. Use --list to see available patterns.`,
		);
		process.exit(1);
	}

	// Validate language is supported for this pattern
	const patternPath = join(__dirname, pattern, language);
	if (!existsSync(patternPath)) {
		console.error(
			`Error: Language '${language}' not implemented for pattern '${pattern}'. Use --list to see available options.`,
		);
		process.exit(1);
	}

	// Validate variant if provided
	if (variant) {
		const variants = getAvailableVariants(pattern, language);
		if (!variants.includes(variant)) {
			console.error(
				`Error: Variant '${variant}' not found for pattern '${pattern}' in language '${language}'. Available variants: ${
					variants.join(', ') || 'none'
				}`,
			);
			process.exit(1);
		}
	}

	try {
		const command = getCommand(pattern, language, variant);
		console.log(`Running: ${command}`);
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(
					`Error: ${error instanceof Error ? error.message : String(error)}`,
				);
				return;
			}
			if (stderr) {
				console.error(`stderr: ${stderr}`);
			}
			console.log(stdout);
		});
	} catch (error) {
		console.error(
			`Error: ${error instanceof Error ? error.message : String(error)}`,
		);
		process.exit(1);
	}
} else {
	console.error('Both pattern and language must be specified.');
	console.log('Use --list to see available patterns and languages.');
}
