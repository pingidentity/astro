import * as go from 'gojs';
/*
*  Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved.
*/

// A custom DragSelectingTool for selecting and deselecting Parts during a drag.

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production,
you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

/**
* @constructor
* @extends DragSelectingTool
* @class
* The RealtimeDragSelectingTool selects and deselects Parts within the {@link DragSelectingTool#box}
* during a drag, not just at the end of the drag.
*/
export function RealtimeDragSelectingTool() {
    go.DragSelectingTool.call(this);
    this._originalSelection = null;
    this._temporarySelection = null;
}

go.Diagram.inherit(RealtimeDragSelectingTool, go.DragSelectingTool);

/**
* Remember the original collection of selected Parts.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doActivate = () => {
    go.DragSelectingTool.prototype.doActivate.call(this);
    // keep a copy of the original Set of selected Parts
    this._originalSelection = this.diagram.selection.copy();
    // these Part.isSelected may have been temporarily modified
    this._temporarySelection = new go.Set(/* go.Part */);
    this.diagram.raiseDiagramEvent('ChangingSelection');
};

/**
* Release any references to selected Parts.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doDeactivate = () => {
    this.diagram.raiseDiagramEvent('ChangedSelection');
    this._originalSelection = null;
    this._temporarySelection = null;
    go.DragSelectingTool.prototype.doDeactivate.call(this);
};

/**
* Restore the selection which may have been modified during a drag.
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doCancel = () => {
    const orig = this._originalSelection;
    if (orig !== null) {
        // eslint-disable-next-line
        orig.each((p) => { p.isSelected = true; });
        // eslint-disable-next-line
        this._temporarySelection.each((p) => { if (!orig.contains(p)) p.isSelected = false; });
    }
    go.DragSelectingTool.prototype.doCancel.call(this);
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doMouseMove = () => {
    if (this.isActive) {
        go.DragSelectingTool.prototype.doMouseMove.call(this);
        this.selectInRect(this.computeBoxBounds());
    }
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doKeyDown = () => {
    if (this.isActive) {
        go.DragSelectingTool.prototype.doKeyDown.call(this);
        this.selectInRect(this.computeBoxBounds());
    }
};

/**
* @this {RealtimeDragSelectingTool}
*/
RealtimeDragSelectingTool.prototype.doKeyUp = () => {
    if (this.isActive) {
        go.DragSelectingTool.prototype.doKeyUp.call(this);
        this.selectInRect(this.computeBoxBounds());
    }
};

/**
* @expose
* @this {RealtimeDragSelectingTool}
* @param {Rect} r a rectangular bounds in document coordinates.
*/
RealtimeDragSelectingTool.prototype.selectInRect = (r) => {
    const diagram = this.diagram;
    const orig = this._originalSelection;
    const temp = this._temporarySelection;
    if (diagram === null || orig === null) return;
    const e = diagram.lastInput;
    const found = diagram.findPartsIn(r, this.isPartialInclusion, true, new go.Set(/* go.Part */));
    if (e.control || e.meta) { // toggle or deselect
        if (e.shift) { // deselect only
            // eslint-disable-next-line
            temp.each((p) => { if (!found.contains(p)) p.isSelected = orig.contains(p); });
            // eslint-disable-next-line
            found.each((p) => { p.isSelected = false; temp.add(p); });
        } else { // toggle selectedness of parts based on _originalSelection
            // eslint-disable-next-line
            temp.each((p) => { if (!found.contains(p)) p.isSelected = orig.contains(p); });
            // eslint-disable-next-line
            found.each((p) => { p.isSelected = !orig.contains(p); temp.add(p); });
        }
    } else if (e.shift) { // extend selection only
        // eslint-disable-next-line
        temp.each((p) => { if (!found.contains(p)) p.isSelected = orig.contains(p); });
        // eslint-disable-next-line
        found.each((p) => { p.isSelected = true; temp.add(p); });
    } else { // select found parts, and unselect all other previously selected parts
        // eslint-disable-next-line
        temp.each((p) => { if (!found.contains(p)) p.isSelected = false; });
        // eslint-disable-next-line
        orig.each((p) => { if (!found.contains(p)) p.isSelected = false; });
        // eslint-disable-next-line
        found.each((p) => { p.isSelected = true; temp.add(p); });
    }
};
