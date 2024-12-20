declare class NumberFlip {
    private rootElement;
    private durationSlide;
    private durationFade;
    private decimalSeparator;
    private wrapperClassname;
    private digitClassname;
    constructor({ rootElement, durationSlide, durationFade, initialNumber, animateInitialNumber, decimalSeparator, wrapperClassname, digitClassname, }: {
        rootElement: HTMLElement;
        durationSlide?: number;
        durationFade?: number;
        initialNumber?: number;
        animateInitialNumber?: boolean;
        decimalSeparator?: string;
        wrapperClassname?: string;
        digitClassname?: string;
    });
    setNumber(num: number, animate?: boolean): void;
    private adjustAmountOfDigitContainers;
    private setDigitInContainers;
    private getDigitsOfNumber;
    private calculateTranslateY;
}
export { NumberFlip };
