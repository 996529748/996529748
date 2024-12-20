
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

var NumberFlip = /** @class */ (function () {
    function NumberFlip(_a) {
        var rootElement = _a.rootElement, _b = _a.durationSlide, durationSlide = _b === void 0 ? 1000 : _b, _c = _a.durationFade, durationFade = _c === void 0 ? 200 : _c, initialNumber = _a.initialNumber, _d = _a.animateInitialNumber, animateInitialNumber = _d === void 0 ? true : _d, _e = _a.decimalSeparator, decimalSeparator = _e === void 0 ? '.' : _e, _f = _a.wrapperClassname, wrapperClassname = _f === void 0 ? 'numberflip-digit-container' : _f, _g = _a.digitClassname, digitClassname = _g === void 0 ? 'numberflip-digit-container-value' : _g;
        this.rootElement = rootElement;
        this.durationSlide = durationSlide;
        this.durationFade = durationFade;
        this.decimalSeparator = decimalSeparator;
        this.wrapperClassname = wrapperClassname;
        this.digitClassname = digitClassname;
        this.rootElement.className = 'flip-flex';
        if (initialNumber) {
            this.setNumber(initialNumber, animateInitialNumber);
        }
    }
    NumberFlip.prototype.setNumber = function (num, animate) {
        if (animate === void 0) { animate = true; }
        this.adjustAmountOfDigitContainers(num);
        this.setDigitInContainers(num, animate);
    };
    NumberFlip.prototype.adjustAmountOfDigitContainers = function (num) {
        var numberOfDigits = this.getDigitsOfNumber(num).length;
        var countOfDigitContainers = this.rootElement.getElementsByClassName(this.wrapperClassname).length;
        // Create digit containers
        while (countOfDigitContainers < numberOfDigits) {
            this.rootElement.insertAdjacentHTML('beforeend', "<div class=\"".concat(this.wrapperClassname, "\">") +
                /*
                  The span with visibility hidden is needed in order to make the parent element occupy enough space to display the digit.
                  Otherwise the parent would have a width and height of 0 due to the absolute position of the .numberflip-digit-container-value element
                */
                "<span style=\"visibility: hidden;\">0</span>\n            <div class=\"".concat(this.digitClassname, "\" style=\"top:0\">\n                <span>9</span>\n                <span>8</span>\n                <span>7</span>\n                <span>6</span>\n                <span>5</span>\n                <span>4</span>\n                <span>3</span>\n                <span>2</span>\n                <span>1</span>\n                <span>0</span>\n                <span>").concat(this.decimalSeparator, "</span>\n            </div>\n        </div>"));
            countOfDigitContainers++;
        }
        // Remove unnecessary digit containers
        if (countOfDigitContainers > numberOfDigits) {
            var digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);
            var _loop_1 = function (i) {
                var digitContainer = digitContainers[i].parentElement;
                digitContainer.style.animationDuration = this_1.durationFade + 'ms';
                digitContainer.style.animationName = 'numberflip-animation-fade-out';
                var digitContainerParent = digitContainer.parentNode;
                // Wait for fade out animation to finish before removing the element
                setTimeout(function () { return digitContainerParent === null || digitContainerParent === void 0 ? void 0 : digitContainerParent.removeChild(digitContainer); }, this_1.durationFade);
            };
            var this_1 = this;
            for (var i = numberOfDigits; i < digitContainers.length; i++) {
                _loop_1(i);
            }
        }
    };
    NumberFlip.prototype.setDigitInContainers = function (num, animate) {
        var _this = this;
        var digits = this.getDigitsOfNumber(num);
        var digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);
        var _loop_2 = function (i) {
            var digitContainer = digitContainers[i];
            var digit = typeof digits[i] === 'number' ? digits[i] : -1;
            // typeof check needed for typescripts typechecker
            if (typeof digit === 'number') {
                var translate_1 = this_2.calculateTranslateY(digit);
                setTimeout(function () {
                    var durationSlide = animate ? _this.durationSlide : 0;
                    digitContainer.style.transitionDuration = durationSlide + 'ms';
                    digitContainer.style.transform = "translateY(".concat(translate_1, "%)");
                }, 0);
            }
        };
        var this_2 = this;
        for (var i = 0; i < digitContainers.length; i++) {
            _loop_2(i);
        }
    };
    NumberFlip.prototype.getDigitsOfNumber = function (num) {
        var digits = num.toString().split('');
        return digits.map(function (char) { return (char === '.' ? '.' : parseInt(char, 10)); });
    };
    NumberFlip.prototype.calculateTranslateY = function (digit) {
        // 11 is the number of span elements defined above in the adjustAmountOfDigitContainers method
        var heightOfSpan = 100 / 11;
        return (-10 * heightOfSpan + (digit + 1) * heightOfSpan).toString();
    };
    return NumberFlip;
}());
//# sourceMappingURL=index.js.map

var numberFlip1 = new NumberFlip({
  rootElement: document.getElementById('number-flip-1')
});
console.log('numberFlip1', numberFlip1);
function setRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 1000000);
  numberFlip1.setNumber(randomNumber);
}

// Set initial random number and update every second
setRandomNumber();
setInterval(setRandomNumber, 5000);

// Example 2: Manually set number (existing code)
var numberFlip2 = new NumberFlip({
  rootElement: document.getElementById('number-flip-2'),
  initialNumber: 238
});
var numberInput = document.getElementById('number-input');
var button = document.getElementById('button');
button.addEventListener('click', changeNumber);
function changeNumber() {
  var newNumber = numberInput.value;
  numberFlip2.setNumber(newNumber);
}
