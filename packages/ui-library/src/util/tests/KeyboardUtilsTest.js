window.__DEV__ = true;

jest.dontMock("../KeyboardUtils.js");

describe("KeyboardUtils", function () {
    var KeyboardUtils = require("../KeyboardUtils.js");

    describe("KeyCodes", function () {
        it("has correct key codes for keys", function () {
            expect(KeyboardUtils.KeyCodes.TAB).toBe(9); //TAB
            expect(KeyboardUtils.KeyCodes.ESC).toBe(27); //ESC
            expect(KeyboardUtils.KeyCodes.ENTER).toBe(13); //ENTER
            expect(KeyboardUtils.KeyCodes.LEFT_SHIFT).toBe(16); //LEFT_SHIFT
            expect(KeyboardUtils.KeyCodes.LEFT_CTRL).toBe(17); //LEFT_CTRL
            expect(KeyboardUtils.KeyCodes.LEFT_ALT).toBe(18); //LEFT_ALT
            expect(KeyboardUtils.KeyCodes.ARROW_LEFT).toBe(37); //ARROW_LEFT
            expect(KeyboardUtils.KeyCodes.ARROW_UP).toBe(38); //ARROW_UP
            expect(KeyboardUtils.KeyCodes.ARROW_RIGHT).toBe(39); //ARROW_RIGHT
            expect(KeyboardUtils.KeyCodes.ARROW_DOWN).toBe(40); //ARROW_DOWN
            expect(KeyboardUtils.KeyCodes.LEFT_CMD).toBe(91); //LEFT_CMD
            expect(KeyboardUtils.KeyCodes.RIGHT_CMD).toBe(92); //RIGHT_CMD
            expect(KeyboardUtils.KeyCodes.RIGHT_ALT).toBe(93); //RIGHT_ALT
        });
    });

    describe("ModifierCodes", function () {
        it("has correct modifier codes", function () {
            expect(KeyboardUtils.ModifierCodes.indexOf(16) === -1).toBe(false); //LEFT_SHIFT
            expect(KeyboardUtils.ModifierCodes.indexOf(17) === -1).toBe(false); //LEFT_CTRL
            expect(KeyboardUtils.ModifierCodes.indexOf(18) === -1).toBe(false); //LEFT_ALT
            expect(KeyboardUtils.ModifierCodes.indexOf(91) === -1).toBe(false); //LEFT_CMD
            expect(KeyboardUtils.ModifierCodes.indexOf(92) === -1).toBe(false); //RIGHT_CMD
            expect(KeyboardUtils.ModifierCodes.indexOf(93) === -1).toBe(false); //RIGHT_ALT
        });

        it("does not have none-modifier codes", function () {
            expect(KeyboardUtils.ModifierCodes.indexOf(9) === -1).toBe(true); //TAB
            expect(KeyboardUtils.ModifierCodes.indexOf(27) === -1).toBe(true); //ESC
            expect(KeyboardUtils.ModifierCodes.indexOf(37) === -1).toBe(true); //ARROW_LEFT
            expect(KeyboardUtils.ModifierCodes.indexOf(38) === -1).toBe(true); //ARROW_UP
            expect(KeyboardUtils.ModifierCodes.indexOf(39) === -1).toBe(true); //ARRORW_RIGHT
            expect(KeyboardUtils.ModifierCodes.indexOf(40) === -1).toBe(true); //ARROW_DOWN
        });
    });

    describe("isTab", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.TAB)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isTab(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isEsc", function () {
        it("returns true for esc key code", function () {
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ESC)).toBe(true);
        });

        it("returns false for non-esc key codes", function () {
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isEsc(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isEnter", function () {
        it("returns true for enter key code", function () {
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ENTER)).toBe(true);
        });

        it("returns false for non-enter key codes", function () {
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isEnter(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isLeftShift", function () {
        it("returns true for left-shift key code", function () {
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(true);
        });

        it("returns false for non-left-shift key codes", function () {
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftShift(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isLeftCtrl", function () {
        it("returns true for left-ctrl key code", function () {
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(true);
        });

        it("returns false for non-left-ctrl key codes", function () {
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftCtrl(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isLeftAlt", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftAlt(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isArrowLeft", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowLeft(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isArrowUp", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowUp(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isArrowRight", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowRight(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isArrowDown", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isArrowDown(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isLeftCmd", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
            expect(KeyboardUtils.isLeftCmd(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isRightCmd", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isRightCmd(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(false);
        });
    });

    describe("isRightAlt", function () {
        it("returns true for tab key code", function () {
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(true);
        });

        it("returns false for non-tab key codes", function () {
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ENTER)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(false);
            expect(KeyboardUtils.isRightAlt(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(false);
        });
    });

    describe("isModifier", function () {
        it("returns true for modifiers", function () {
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.LEFT_SHIFT)).toBe(true);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.LEFT_CTRL)).toBe(true);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.LEFT_ALT)).toBe(true);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.LEFT_CMD)).toBe(true);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.RIGHT_CMD)).toBe(true);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.RIGHT_ALT)).toBe(true);
        });

        it("returns false for non-modifiers", function () {
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.TAB)).toBe(false);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.ESC)).toBe(false);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.ARROW_LEFT)).toBe(false);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.ARROW_UP)).toBe(false);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.ARROW_RIGHT)).toBe(false);
            expect(KeyboardUtils.isModifier(KeyboardUtils.KeyCodes.ARROW_DOWN)).toBe(false);
        });
    });
});