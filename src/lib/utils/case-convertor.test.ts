import { describe, expect, it } from 'vitest';
import { convertToTitleCase } from './case-convertor';

describe('convert to title case', () => {
	describe('when does not provided separator and does not provide joiner', () => {
		it('should convert lower snake case string to be the title case string, separating with space', () => {
			const snakeCaseString = 'foo_bar_baz';
			const result = convertToTitleCase(snakeCaseString);
			expect(result).to.equal('Foo Bar Baz');
		});
		it('should convert upper snake case string to be the title case string, separating with space', () => {
			const snakeCaseString = 'FOO_BAR_BAZ';
			const result = convertToTitleCase(snakeCaseString);
			expect(result).to.equal('Foo Bar Baz');
		});
		it('should convert kebab case string by converting like an one word instead of many', () => {
			const snakeCaseString = 'foo-bar-baz';
			const result = convertToTitleCase(snakeCaseString);
			expect(result).to.equal('Foo-bar-baz');
		});
	});
	describe('when provide separator and does not provide joiner', () => {
		it('should convert lower kebab case string to be the title case string, separating with space', () => {
			const snakeCaseString = 'foo-bar-baz';
			const result = convertToTitleCase(snakeCaseString, '-');
			expect(result).to.equal('Foo Bar Baz');
		});
		it('should convert upper kebab case string to be the title case string, separating with space', () => {
			const snakeCaseString = 'foo-bar-baz';
			const result = convertToTitleCase(snakeCaseString, '-');
			expect(result).to.equal('Foo Bar Baz');
		});
		it('should convert a custom case string, which is separated word with non standard symbol, to be the title case string, separating with space', () => {
			const snakeCaseString = 'foo&bar&baz';
			const result = convertToTitleCase(snakeCaseString, '&');
			expect(result).to.equal('Foo Bar Baz');
		});
		it('should return the same when separator is an empty string', () => {
			const snakeCaseString = 'FooBarBaz';
			const result = convertToTitleCase(snakeCaseString, '');
			expect(result).to.equal('FooBarBaz');
		});
		it('should convert lower snake case string to be the title case string, separating with space, when provide separator with undefined', () => {
			const snakeCaseString = 'foo_bar_baz';
			const result = convertToTitleCase(snakeCaseString, undefined);
			expect(result).to.equal('Foo Bar Baz');
		});
	});
	describe('when provide joiner', () => {
		it('should convert lower snake case string to be the title case string, separating with _', () => {
			const snakeCaseString = 'foo_bar_baz';
			const result = convertToTitleCase(snakeCaseString, '_', '_');
			expect(result).to.equal('Foo_Bar_Baz');
		});
		it('should convert lower snake case string to be the title case string with no separating', () => {
			const snakeCaseString = 'foo_bar_baz';
			const result = convertToTitleCase(snakeCaseString, '_', '');
			expect(result).to.equal('FooBarBaz');
		});
		it('should convert lower snake case string to be the title case string, separating with space, when provide joiner with undefined', () => {
			const snakeCaseString = 'foo_bar_baz';
			const result = convertToTitleCase(snakeCaseString, '_', undefined);
			expect(result).to.equal('Foo Bar Baz');
		});
	});
});
