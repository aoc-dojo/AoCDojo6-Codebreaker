import { CodeColours } from '../Constants/Constants'

function GenerateCode(): string[] {
    var colourKeys = Object.keys(CodeColours).map(key => key.toLocaleLowerCase());
    var numberOfColours = colourKeys.length - 1;

    return [
        colourKeys[getRandomInt(numberOfColours)],
        colourKeys[getRandomInt(numberOfColours)],
        colourKeys[getRandomInt(numberOfColours)],
        colourKeys[getRandomInt(numberOfColours)]
    ];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default {
    GenerateCode
};