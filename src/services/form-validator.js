export class ValidatorService {
    static setMinchar(value, min) {
        return (value.length < min ?
            `Veuillez entrer au moins ${min} charatctères.`
            : undefined);

    }
    static setMaxchar(value, max) {
        return (value.length > max ?
            `Veuillez entrer maximum ${max} charactères !`
            : undefined);
    }
}