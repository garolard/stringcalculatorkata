class Calculator implements IStringCalculator {

    public add(numbers: string): number {
        let pieces = this.getNumbers(numbers);

        this.checkAreValid(pieces);

        return this.sumPieces(pieces);
    }

    private checkAreValid(pieces: Array<number>) {
        let invalidValues = pieces.filter((p) => p < 0);

        if (invalidValues.length > 0) {
            throw "error: " + invalidValues.join(", ");
        }
    }

    private sumPieces(pieces: Array<number>): number {
        let validValues = pieces.filter((p) => p < 1000).reduce((v1, v2) => v1 + v2);
        return validValues || 0;
    }

    private getNumbers(numbers: string): Array<number> {
        let pieces = this.getPieces(numbers);
        return pieces.map((p) => parseInt(p, null) || 0);
    }

    private getPieces(numbers: string): Array<string> {
        let separators = [",", "\n"];

        if (this.hasCustomSeparator(numbers)) {
            separators.push(this.getCustomSeparator(numbers));
            numbers = this.clearFirstLine(numbers);
        }
        let subPieces = this.getSubPieces([numbers], separators);
        return subPieces;
    }

    private hasCustomSeparator(expression: string): boolean {
        return /^\/\//.test(expression);
    }

    private getCustomSeparator(expression: string): string {
        let customSeparator = expression.charAt(2);
        return customSeparator === "["
            ? this.getCustomLongSeparator(expression)
            : customSeparator;
    }

    private getCustomLongSeparator(expression: string): string {
        return expression.substring(expression.indexOf("[") + 1, expression.indexOf("]"));
    }

    private clearFirstLine(expression: string): string {
        return expression.substring(expression.indexOf("\n") + 1);
    }

    private getSubPieces(piecesSoFar: Array<string>, separators: Array<string>): Array<string> {
        if (separators.length === 0) {
            return piecesSoFar;
        }

        let subPieces = [];
        let separator = separators.pop();

        piecesSoFar.forEach((p) => subPieces = subPieces.concat(p.split(separator)));

        return this.getSubPieces(subPieces, separators);
    }
}

export default Calculator;
